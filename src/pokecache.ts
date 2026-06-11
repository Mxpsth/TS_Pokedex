export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(delay: number) {
        this.#interval = delay;

        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        const value: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };

        this.#cache.set(key, value);
    }

    get<T>(key: string): T | undefined {
        if(!this.#cache.has(key))
            return undefined;

        return this.#cache.get(key)?.val;
    }

    #reap(): void {
        for (const element of this.#cache) {
            if(element[1].createdAt < (Date.now() - this.#interval))
                this.#cache.delete(element[0]);
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);

        this.#reapIntervalId = undefined;
    }
}