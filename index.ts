// indexDB
export {default as EASIIndexDB} from './lib/IndexDB'
// indexDB的vue插件
export {default as indexDBPlugin, useDB} from './lib/indexdbPlugin'

// Cookie, localStorage, sessionStorage
export {setLocal, getLocal, clearLocal, removeLocal} from './lib/localstorage';
export {setSession, getSession, clearSession, removeSession} from './lib/sessionstorage';
export {setCookie, getCookie, removeCookie} from './lib/cookie'

// 创建web worker
export {createWorker} from './lib/createWorker';

// 动态读取文件
export {loadScript} from './lib/loadScript';

// 防抖函数
export {debounced} from './lib/debounced';

// 是否为移动端
export {isMobile} from './lib/ismobile';

// 一键复制
export {copy} from './lib/copy';

// 常用于App内嵌H5的工具函数
export {openAppWeb} from './lib/openAppWeb';

export {compareUserAgent} from './lib/compareUserAgent';

export {compareVersion} from './lib/compareVersion';

export {openAppView} from './lib/openAppView';
