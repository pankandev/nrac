import {AceBase, DataReference, DataSnapshot} from "acebase";
import {DateTime} from "luxon";
import {from, map, Observable, of, startWith, switchMap} from "rxjs";

export type Modeled<T extends object> = T & {
    createdTime?: string;
    updatedTime?: string;
};

export class NRACDocument<T extends object> {
    public get id(): string {
        return this.ref.key;
    }

    constructor(
        public readonly ref: DataReference,
        public readonly data: T,
        public readonly createdTime: DateTime,
        public readonly updatedTime: DateTime,
    ) {
    }

    public static fromSnapshot<T extends object>(snap: DataSnapshot): NRACDocument<T> | null {
        const data: Modeled<T> = snap.val();
        if (!data) {
            return null;
        }
        const createdTime = data.createdTime ? DateTime.fromISO(data.createdTime) : DateTime.now();
        const updatedTime = data.updatedTime ? DateTime.fromISO(data.updatedTime) : DateTime.now();
        return new NRACDocument<T>(snap.ref, data, createdTime, updatedTime);
    }
}

export class CollectionKey<T extends object> {
    constructor(
        public readonly name: string,
    ) {
    }
}

export class Collection<T extends object> {
    constructor(
        public readonly path: string,
        private readonly db: AceBase,
    ) {
    }


    private waitReady(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.ready().then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    public ref(id: string): DataReference {
        return this.db.ref(`${this.path}/${id}`);
    }

    public async get(id: string): Promise<NRACDocument<T> | null> {
        await this.waitReady();
        const snap = await this.ref(id).get();
        if (!snap) {
            return null;
        }
        return NRACDocument.fromSnapshot<T>(snap);
    }

    public async update(id: string, data: Partial<T>): Promise<void> {
        await this.waitReady();
        await this.ref(id).update({
            ...data,
            updatedTime: DateTime.now().toISO(),
        });
    }

    public async set(id: string, data: T): Promise<void> {
        await this.waitReady();
        await this.ref(id).set({
            ...data,
            createdTime: DateTime.now().toISO(),
            updatedTime: DateTime.now().toISO(),
        });
    }

    public async delete(id: string): Promise<void> {
        await this.waitReady();
        await this.ref(id).remove();
    }

    public async list(): Promise<NRACDocument<T>[]> {
        await this.waitReady();

        const docs: NRACDocument<T>[] = [];
        await this.db.ref(this.path).forEach(
            snap => {
                const doc = NRACDocument.fromSnapshot<T>(snap);
                if (doc) {
                    docs.push(doc);
                }
            }
        );
        return docs;
    }

    public subcollection<U extends object>(id: string, key: CollectionKey<U>): Collection<U> {
        return new Collection<U>(`${this.path}/${id}/${key.name}`, this.db);
    }

    watchById(id: string): Observable<NRACDocument<T> | null> {
        return new Observable<NRACDocument<T> | null>(subscriber => {
            const ref = this.ref(id);
            const handler = (snap: DataSnapshot) => {
                if (!snap) {
                    subscriber.next(null);
                    return;
                }
                subscriber.next(NRACDocument.fromSnapshot<T>(snap));
            };
            ref.on("value", handler);
            return () => ref.off("value", handler);
        });
    }

    watchQuery(): Observable<NRACDocument<T>[]> {
        return new Observable<NRACDocument<T>[]>(subscriber => {
            const ref = this.db.ref(this.path);
            const handler = (snap: DataSnapshot) => {
                const docs: NRACDocument<T>[] = [];
                snap.forEach(snap => {
                    const doc = NRACDocument.fromSnapshot<T>(snap)
                    if (doc) {
                        docs.push(doc);
                    }
                    return true;
                });
                subscriber.next(docs);
            };
            ref.on("value", handler);
            return () => ref.off("value", handler);
        }).pipe(
            startWith(null),
            switchMap(data => !data ? this.query() : of(data)),
        );
    }

    query(limit = 100): Observable<NRACDocument<T>[]> {
        return from(
            this.db.ref(this.path).query().take(limit).get()
        ).pipe(
            map(snaps => {
                const docs: NRACDocument<T>[] = [];
                snaps.forEach(snap => {
                    const doc = NRACDocument.fromSnapshot<T>(snap)
                    if (doc) {
                        docs.push(doc);
                    }
                    return true;
                });
                return docs;
            })
        );
    }

    async add(data: T): Promise<string> {
        await this.waitReady();
        const ref = this.db.ref(this.path).push();
        await ref.set({
            ...data,
            createdTime: DateTime.now().toISO(),
            updatedTime: DateTime.now().toISO(),
        });
        return ref.key;
    }
}

export class Database {
    private constructor(
        private readonly db: AceBase,
    ) {
    }

    public static readonly instance: Promise<Database> = new Promise<Database>((resolve, reject) => {
        Database.initDatabase().then(db => {
            resolve(new Database(db));
        }).catch(err => {
            reject(err);
        });
    });

    private static initDatabase(): Promise<AceBase> {
        const db = AceBase.WithIndexedDB("classroom-tube", {
            logLevel: "warn",
        });
        return new Promise((resolve, reject) => {
            db.ready()
                .then(() => resolve(db))
                .catch(err => reject(err));
        });
    }

    public collection<T extends object>(key: CollectionKey<T>): Collection<T> {
        return new Collection<T>(key.name, this.db);
    }
}
