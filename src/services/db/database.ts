import {AceBase, DataReference, DataSnapshot} from "acebase";
import {DateTime} from "luxon";
import {from, map, Observable} from "rxjs";

export type Modeled<T extends object> = T & {
    createdTime?: string;
    updatedTime?: string;
};

export class OADocument<T extends object> {
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

    public static fromSnapshot<T extends object>(snap: DataSnapshot): OADocument<T> {
        const data: Modeled<T> = snap.val();
        const createdTime = data.createdTime ? DateTime.fromISO(data.createdTime) : DateTime.now();
        const updatedTime = data.updatedTime ? DateTime.fromISO(data.updatedTime) : DateTime.now();
        return new OADocument<T>(snap.ref, data, createdTime, updatedTime);
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

    public async get(id: string): Promise<OADocument<T> | null> {
        await this.waitReady();
        const snap = await this.ref(id).get();
        if (!snap) {
            return null;
        }
        return OADocument.fromSnapshot<T>(snap);
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

    public async list(): Promise<OADocument<T>[]> {
        await this.waitReady();

        const docs: OADocument<T>[] = [];
        await this.db.ref(this.path).forEach(
            snap => {
                docs.push(OADocument.fromSnapshot<T>(snap));
            }
        );
        return docs;
    }

    public subcollection<U extends object>(id: string, key: CollectionKey<U>): Collection<U> {
        return new Collection<U>(`${this.path}/${id}/${key.name}`, this.db);
    }

    watchById(id: string): Observable<OADocument<T> | null> {
        return new Observable<OADocument<T> | null>(subscriber => {
            const ref = this.ref(id);
            const handler = (snap: DataSnapshot) => {
                if (!snap) {
                    subscriber.next(null);
                    return;
                }
                subscriber.next(OADocument.fromSnapshot<T>(snap));
            };
            ref.on("value", handler);
            return () => ref.off("value", handler);
        });
    }

    watchQuery(): Observable<OADocument<T>[]> {
        return new Observable<OADocument<T>[]>(subscriber => {
            const ref = this.db.ref(this.path);
            const handler = (snap: DataSnapshot) => {
                const docs: OADocument<T>[] = [];
                snap.forEach(snap => {
                    docs.push(OADocument.fromSnapshot<T>(snap));
                    return true;
                });
                subscriber.next(docs);
            };
            ref.on("value", handler);
            return () => ref.off("value", handler);
        });
    }

    query(): Observable<OADocument<T>[]> {
        return from(
            this.db.ref(this.path).query().get()
        ).pipe(
            map(snaps => {
                const docs: OADocument<T>[] = [];
                snaps.forEach(snap => {
                    docs.push(OADocument.fromSnapshot<T>(snap));
                    return true;
                });
                return docs;
            })
        );
    }
}

export class Database {
    private constructor(
        private readonly db: AceBase,
    ) {}

    public static readonly instance: Promise<Database> = new Promise<Database>((resolve, reject) => {
        Database.initDatabase().then(db => {
            resolve(new Database(db));
        }).catch(err => {
            reject(err);
        });
    });

    private static initDatabase(): Promise<AceBase> {
        const db = AceBase.WithIndexedDB("classroom-tube", {
            logLevel: "log",
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
