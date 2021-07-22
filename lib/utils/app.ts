export interface IToAppWebOption {
  scheme: string;
  title?: string;
  url?: string;
  show?: boolean;
}

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

  /**
   *
   * @param {*} title app右侧链接名字
   * @param {*} url app跳转的h5链接
   * @param {*} show 是否显示 0 不显示，1显示
   */
  export function toAppWeb({scheme = 'au.com.easi.courier', title, url, show}: IToAppWebOption) {
    window.location.href = `${scheme}://web/help?text=${title}&url=${encodeURIComponent(
      url as string,
    )}&show=${show}`;
  }

  // 跳App原生页面
export function toAppPage(path: string, scheme = 'au.com.easi.customer') {
  window.location.href = `${scheme}://${path}`;
}

  // 判断App版本号,目前只支持用户端App
export function compareVersion(targetVersion: string, ua: string = navigator.userAgent.toLowerCase()) {
  try {
    let system = ((ua.match(/^(easicustomer|easimalaysia)(.+?)(\s|\()/) as string[])[2] as unknown as string).replace(/\s|\//g, '').split('.');
    let target = targetVersion.split('.');

    let length = system.length > target.length ? system.length : target.length;
    for (let i = 0; i < length; i++) {
      if (Number(target[i] || 0) < Number(system[i] || 0)) {
        return true;
      }
      if (Number(target[i] || 0) > Number(system[i] || 0)) {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // 判断AppUserAgent是否合法
export function compareUserAgent(clientTypeArray: IClientType[] = [], ua = navigator.userAgent.toLowerCase()) {
  return clientTypeArray.some(uaStr => ua.indexOf(uaStr) > -1);
}
