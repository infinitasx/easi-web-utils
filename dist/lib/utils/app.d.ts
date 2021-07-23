export interface IToAppWebOption {
    scheme: string;
    title?: string;
    url?: string;
    show?: boolean;
}
export declare type IClientType = 'easi' | 'easicustomer' | 'easimalaysia' | 'easicourier' | 'easimerchant' | 'easimerchantmalaysia';
/**
 *
 * @param {*} title app右侧链接名字
 * @param {*} url app跳转的h5链接
 * @param {*} show 是否显示 0 不显示，1显示
 */
export declare function openAppWeb({ scheme, title, url, show }: IToAppWebOption): void;
export declare function openAppView(path: string, scheme?: string): void;
export declare function compareVersion(targetVersion: string, ua?: string): boolean;
export declare function compareUserAgent(clientTypeArray?: IClientType[], ua?: string): boolean;
