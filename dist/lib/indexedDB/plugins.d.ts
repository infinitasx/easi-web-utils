import { App } from 'vue';
import EASIIndexDB, { Options } from './index';
export declare function useDB(): EASIIndexDB;
declare const _default: {
    install: (app: App, props: {
        databaseName: string;
        options: Options;
    }) => void;
};
export default _default;
