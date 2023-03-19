import {Database, OADocument} from "./db/database";
import {COLLECTIONS} from "./db/collections";
import type {Course, CourseItem} from "../models/courses";
import type {YoutubePlaylist} from "./youtube";
import {from, lastValueFrom, map, Observable, switchMap} from "rxjs";


export class CourseState {
    constructor(
        public readonly playlist: YoutubePlaylist,
    ) {
    }

    private readonly waitDb = Database.instance;

    public get id(): string {
        return this.playlist.id;
    }

    public async enroll(): Promise<boolean> {
        const playlist = await this.playlist.getPlaylist();
        if (!playlist) {
            return false;
        }
        const course: Course = {
            playlistId: this.id,
            title: playlist.title,
            description: playlist.description,
            thumbnailUrl: playlist.thumbnails.default.url,
            snippet: playlist,
        };

        const videos = await this.playlist.getVideos();

        const db = await this.waitDb;
        const courses = db.collection(COLLECTIONS.COURSES);
        await courses.set(this.id, course);

        let order = 0;
        for (const video of videos) {
            await courses.subcollection(this.id, COLLECTIONS.COURSE_ITEMS).set(video.id, {
                description: video.snippet.description,
                durationSeconds: 0,
                thumbnailUrl: video.snippet.thumbnails.default.url,
                title: video.snippet.title,
                videoId: video.id,
                snippet: video.snippet,
                order: ++order,
            });
        }
        return true;
    }

    public watch(): Observable<OADocument<Course> | null> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db.collection(COLLECTIONS.COURSES).watchById(this.id)),
        );
    }

    public watchItem(id: string): Observable<OADocument<CourseItem> | null> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).watchById(id)),
        );
    }

    public watchItems(): Observable<OADocument<CourseItem>[]> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db
                .collection(COLLECTIONS.COURSES)
                .subcollection(this.id, COLLECTIONS.COURSE_ITEMS)
                .watchQuery()
            ),
            map(items => items.sort((a, b) => a.data.order - b.data.order)),
        );
    }

    async getAllItems(): Promise<OADocument<CourseItem>[]> {
        const db = await this.waitDb;
        return lastValueFrom(
            db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).query().pipe(
                map(items => items.sort((a, b) => a.data.order - b.data.order)),
            )
        );
    }
}
