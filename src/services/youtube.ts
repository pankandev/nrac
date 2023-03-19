import PlayerFactory from "youtube-player";
import type {YouTubePlayer} from "youtube-player/dist/types";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import {distinctUntilChanged, map, type Observable, of, startWith, Subject, switchMap, timer} from "rxjs";
import type {PlaylistItemSnippet, PlaylistSnippet} from "../models/courses";
import type {CourseItem} from "../models/courses";
import type {CourseState} from "./courses";


export interface PlaylistItem {
    id: string;
    snippet: PlaylistItemSnippet;
}

/**
 * A URL that points to a YouTube playlist.
 */
export class YoutubePlaylist {
    private static readonly API_KEY = 'AIzaSyBzkc2df0YZfIvSQzB_-DvCvLhu35gKdEU';

    public readonly videos: Promise<PlaylistItem[] | null>;

    /**
     * Constructor.
     *
     * @param id The playlist ID.
     * @param startVideoId The video ID from where to start the playlist.
     */
    constructor(
        public readonly id: string,
        public readonly startVideoId: string | null = null,
    ) {
        this.videos = this.getVideos();
    }

    /**
     * Parses a URL from a string.
     *
     * Compatible format(s):
     * - https://www.youtube.com/watch?v=kGK4oAn2rHk&list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
     * - https://youtube.com/playlist?list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
     * - https://www.youtube.com/embed/videoseries?list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
     * @param url - The playlist URL as a string
     *
     * @returns - The parsed URL
     */
    public static fromUrl(url: string): YoutubePlaylist | null {
        const parsed = new URL(url);

        switch (parsed.host) {
            case 'www.youtube.com': {
                const id = parsed.searchParams.get('list');
                if (!id) {
                    return null;
                }
                const startVideoId = parsed.searchParams.get('v');
                return new YoutubePlaylist(id, startVideoId);
            }
            case 'youtube.com': {
                const id = parsed.searchParams.get('list');
                if (!id) {
                    return null;
                }
                return new YoutubePlaylist(id);
            }
            default:
                return null;
        }
    }

    /**
     * Transforms to string
     */
    public toString(): string {
        const url = new URL('https://www.youtube.com');
        url.searchParams.set('list', this.id);
        if (this.startVideoId) {
            url.searchParams.set('v', this.startVideoId);
        }
        return url.toString();
    }

    /**
     * Creates a player in the given element
     */
    public embedInto(element: HTMLElement): YouTubePlayer {
        return PlayerFactory(element, {
            height: '100%',
            width: '100%',
            playerVars: {
                playsinline: 1,
                controls: 1,
                autoplay: 0,
                rel: 0,
            },
        });
    }

    private async fetch<T>(url: URL): Promise<T> {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Failed to fetch playlist: ${response.statusText}`);
        }
        return response.json();
    }

    /**
     * Gets the playlist title and other metadata
     *
     * @returns - The playlist data
     */
    public async getPlaylist(): Promise<PlaylistSnippet | null> {
        const url = new URL('https://content-youtube.googleapis.com/youtube/v3/playlists');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('id', this.id);
        url.searchParams.set('key', YoutubePlaylist.API_KEY);

        const json = await this.fetch<{
            items: {
                kind: 'youtube#playlist',
                etag: string,
                id: string,
                snippet: PlaylistSnippet,
            }[];
        }>(url);
        return json.items[0]?.snippet ?? null;
    }

    /**
     * Gets the videos IDs in the playlist
     *
     * @returns - The video IDs
     */
    public async getVideos(): Promise<PlaylistItem[]> {
        const url = new URL('https://content-youtube.googleapis.com/youtube/v3/playlistItems');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('maxResults', '50');
        url.searchParams.set('playlistId', this.id);
        url.searchParams.set('key', YoutubePlaylist.API_KEY);

        const json = await this.fetch<{
            items: PlaylistItem[];
        }>(url);
        return json.items ?? [];
    }
}

export class CoursePlayer {
    private readonly player: YouTubePlayer;

    private constructor(
        private readonly element: HTMLElement,
        public readonly course: CourseState,
        private readonly items: CourseItem[],
    ) {
        this.player = course.playlist.embedInto(element);
        if (course.playlist.startVideoId) {
            this.currentVideoIndex = items.findIndex(video => video.snippet.resourceId.videoId === course.playlist.startVideoId);
        }
    }

    public static async create(element: HTMLElement, course: CourseState): Promise<CoursePlayer | null> {
        const videos = await course.playlist.videos;
        if (!videos || videos.length === 0) {
            return null;
        }
        const items = await course.getAllItems();
        const player = new CoursePlayer(element, course, items.map(item => item.data));
        await player.playNext();
        return player;
    }

    public isPlaying$() {
        return this.status$().pipe(
            map(status => status === PlayerStates.PLAYING),
            distinctUntilChanged(),
        );
    }

    public items$(): Observable<CourseItem[]> {
        return this.status$().pipe(
            map(() => this.items),
        );
    }

    private statusUpdateSignal = new Subject<void>();

    private currentVideoIndex = -1;

    public async playNext(): Promise<void> {
        const videosIds = this.items.map(v => v.snippet.resourceId.videoId);
        this.currentVideoIndex = (this.currentVideoIndex + 1) % videosIds.length;
        await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
        this.statusUpdateSignal.next();
    }

    public async playPrevious(): Promise<void> {
        const videosIds = this.items.map(v => v.snippet.resourceId.videoId);
        this.currentVideoIndex--;
        if (this.currentVideoIndex < 0) {
            this.currentVideoIndex = videosIds.length - 1;
        }
        await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
        this.statusUpdateSignal.next();
    }

    public async playVideo(videoId: string): Promise<void> {
        this.currentVideoIndex = this.items.findIndex(item => item.videoId === videoId);
        if (this.currentVideoIndex < 0) {
            this.currentVideoIndex = 0;
        }
        const videosIds = this.items.map(v => v.snippet.resourceId.videoId);
        await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
        this.statusUpdateSignal.next();
    }

    public get currentItem(): CourseItem | null {
        return this.items[this.currentVideoIndex] ?? null;
    }

    public async resume(): Promise<void> {
        await this.player.playVideo();
        this.statusUpdateSignal.next();
    }

    public async pause(): Promise<void> {
        await this.player.pauseVideo();
        this.statusUpdateSignal.next();
    }

    public currentItem$(): Observable<CourseItem | null> {
        return this.statusUpdateSignal.pipe(
            startWith(null),
            switchMap(() => {
                const id = this.currentItem?.videoId;
                return id ? this.course.watchItem(id) : of(null);
            }),
            map(item => item?.data ?? null),
        );
    }

    public status$(): Observable<PlayerStates> {
        return this.statusUpdateSignal.pipe(
            startWith(null),
            switchMap(() => timer(10, 100)),
            switchMap(() => this.player.getPlayerState()),
            distinctUntilChanged(),
        );
    }

    public hasPrevious$(): Observable<boolean> {
        return this.statusUpdateSignal.pipe(
            startWith(null),
            map(() => this.currentVideoIndex > 0),
            distinctUntilChanged(),
        );
    }

    public hasNext$(): Observable<boolean> {
        return this.statusUpdateSignal.pipe(
            startWith(null),
            map(() => this.currentVideoIndex < this.items.length - 1),
            distinctUntilChanged(),
        );
    }
}
