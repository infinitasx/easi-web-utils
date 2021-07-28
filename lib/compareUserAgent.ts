
// 判断AppUserAgent是否合法

/*
 * 需要判断的客户端打开环境
 * 'easi': 所有EasiApp
 * 'easicustomer': Easi用户App内打开
 * 'easimalaysia': Easi Malaysia用户App内打开（仅针对马来西亚用户App）
 * 'easicourier': Easi配送员App内打开(含马来西亚)
 * 'easimerchant'：Easi 商家端App内打开
 * 'easimerchantmalaysia'：Easi Malaysia商家端App内打开（仅针对马来西亚商家App）
 *  */
export type IClientType = 'easi' | 'easicustomer' | 'easimalaysia' | 'easicourier' | 'easimerchant' | 'easimerchantmalaysia'

export function compareUserAgent(clientTypeArray: IClientType[] = [], ua = navigator.userAgent.toLowerCase()) {
  return clientTypeArray.some(uaStr => ua.indexOf(uaStr) > -1);
}
