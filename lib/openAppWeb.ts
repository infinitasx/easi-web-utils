export interface IToAppWebOption {
  scheme: string;
  title?: string;
  url?: string;
  show?: boolean;
}

/**
 *
 * @param {*} title app右侧链接名字
 * @param {*} url app跳转的h5链接
 * @param {*} show 是否显示 0 不显示，1显示
 */
export function openAppWeb({scheme = 'au.com.easi.courier', title, url, show}: IToAppWebOption) {
  window.location.href = `${scheme}://web/help?text=${title}&url=${encodeURIComponent(
    url as string,
  )}&show=${show}`;
}
