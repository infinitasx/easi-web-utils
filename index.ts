// indexDB
export { default as EASIIndexDB } from './lib/indexdb/IndexDB'

// Cookie, localStorage, sessionStorage
export { EASILocal, EASISession, EASICookie } from './lib/storage/Storage'

// 其他工具函数
export { createWorker, debounced, isMobile, copy, loadScript } from './lib/utils/utils'

// 常用于App内嵌H5的工具函数
export { openAppWeb, compareUserAgent, compareVersion, openAppView } from './lib/utils/app'

// 常用的use函数
// export { default as EASIIndexDBPlugin, useDB, usePagination, useModalVisible } from './utils/use'
