// indexDB
export { default as EASIIndexDB } from './indexdb/IndexDB'

// Cookie, localStorage, sessionStorage
export { EASILocal, EASISession, EASICookie } from './storage/Storage'

// 其他工具函数
export { createWorker, debounced, isMobile, copy, loadScript } from './utils/utils'

// 常用于App内嵌H5的工具函数
export { openAppWeb, compareUserAgent, compareVersion, openAppView } from './utils/app'

// 常用的use函数
// export { default as EASIIndexDBPlugin, useDB, usePagination, useModalVisible } from './utils/use'
