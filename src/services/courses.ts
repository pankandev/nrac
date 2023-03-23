import {Database, NRACDocument} from "./db/database";
import {COLLECTIONS} from "./db/collections";
import type {Course, CourseItem, Note} from "../models/courses";
import type {PlaylistItem, YoutubePlaylist} from "./youtube";
import {from, lastValueFrom, map, Observable, switchMap} from "rxjs";
import {DateTime, Duration} from "luxon";


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
            lastAccessed: DateTime.now().toISO(),
        };

        const videos = await this.playlist.getVideos();

        const db = await this.waitDb;
        const courses = db.collection(COLLECTIONS.COURSES);

        const item = await courses.get(this.id);
        if (item) {
            await courses.update(this.id, {
                lastAccessed: DateTime.now().toISO(),
            });
            return true;
        }

        await courses.set(this.id, course);

        for (const video of this.parsePlaylistItems(videos)) {
            await courses.subcollection(this.id, COLLECTIONS.COURSE_ITEMS).set(video.videoId, video);
        }

        return true;
    }

    private findCommonPrefix(names: string[]): string {
        return names.reduce((prefix: string | null, name): string | null => {
            if (prefix === null) {
                return name;
            }
            for (let i = 0; i < prefix.length; i++) {
                if (prefix[i].toLowerCase() !== name[i].toLowerCase()) {
                    return prefix.substring(0, i);
                }
            }
            return prefix;
        }, null) ?? '';
    }

    private parsePlaylistItems(items: PlaylistItem[]): CourseItem[] {
        const commonPrefix = this.findCommonPrefix(items.map(item => item.snippet.title));

        const courseItems: CourseItem[] = [];
        let order = 0;
        for (const item of items) {
            const videoId = item.snippet.resourceId.videoId;
            const prefix = commonPrefix === '' ? '' : commonPrefix + ' ';
            const title = prefix.length > 0 ? item.snippet.title.substring(prefix.length - 1) : item.snippet.title;
            courseItems.push({
                videoId,
                description: item.snippet.description,
                durationSeconds: 0,
                snippet: item.snippet,
                thumbnailUrl: item.snippet.thumbnails.default.url,
                title,
                order: order++,
                completed: false,
                leftAtSeconds: 0,
            });
        }
        return courseItems;
    }

    public watch(): Observable<NRACDocument<Course> | null> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db.collection(COLLECTIONS.COURSES).watchById(this.id)),
        );
    }

    public watchItem(id: string): Observable<NRACDocument<CourseItem> | null> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).watchById(id)),
        );
    }

    public watchItems(): Observable<NRACDocument<CourseItem>[]> {
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

    async getAllItems(): Promise<NRACDocument<CourseItem>[]> {
        const db = await this.waitDb;
        return lastValueFrom(
            db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).query().pipe(
                map(items => items.sort((a, b) => a.data.order - b.data.order)),
            )
        );
    }

    async markAsCompleted(id: string): Promise<void> {
        const db = await this.waitDb;
        await db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).update(id, {
            completed: true,
        });
    }

    async markAsNotCompleted(id: string): Promise<void> {
        const db = await this.waitDb;
        await db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).update(id, {
            completed: false,
        });
    }

    async addNote(content: string, item: CourseItem, timestampSeconds: number): Promise<string> {
        const db = await this.waitDb;
        const notes = db.collection(COLLECTIONS.NOTES);
        return notes.add(
            {
                author: "Me",
                playlistId: this.id,
                videoId: item.videoId,
                content,
                videoTimestampSeconds: timestampSeconds,
                postTime: DateTime.now().toISO(),
            },
        );
    }

    watchNotesOf(item: CourseItem): Observable<NRACDocument<Note>[]> {
        const db = Database.instance;
        return from(db).pipe(
            switchMap(db => db
                .collection(COLLECTIONS.NOTES)
                .watchQuery()
                .pipe(
                    map(notes => notes
                        .filter(note => note.data.videoId === item.videoId)
                        .sort((a, b) => {
                            return a.data.videoTimestampSeconds - b.data.videoTimestampSeconds;
                        }),
                    ),
                )
            ),
        );
    }

    deleteNoteById(noteId: string): Promise<void> {
        const db = Database.instance;
        return db.then(db => db.collection(COLLECTIONS.NOTES).delete(noteId));
    }
}
