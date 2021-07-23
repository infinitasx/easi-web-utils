export declare class EASICookie {
    static set(key: string, value: string, expires?: number): void;
    static get(key: string): string | undefined;
    static remove(key: string): void;
}
export declare class EASILocal {
    static set(key: string, value: any, expires?: number): void;
    static get(key: string): any;
    static remove(key: string): void;
    static clear(): void;
}
export declare class EASISession {
    static set(key: string, value: any, expires?: number): void;
    static get(key: string): any;
    static remove(key: string): void;
    static clear(): void;
}
