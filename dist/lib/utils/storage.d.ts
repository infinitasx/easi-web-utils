interface StorageValue {
    value: any;
}
export declare function transformValueToSet(this: Storage, key: string, value: StorageValue, expires?: number): void;
export declare function transformValueToGet(this: Storage, key: string): any;
export {};
