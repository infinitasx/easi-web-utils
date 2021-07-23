export declare function createWorker(func: () => void, data: any, backUpFunc?: (data: any) => any): Promise<any>;
export declare function loadScript(link: string, id: string): Promise<unknown>;
export declare function debounced(func: () => void, delay?: number, immediate?: boolean): () => void;
export declare function isMobile(): boolean;
export declare function copy(content: string, container?: HTMLElement): boolean;
