
// 跳App原生页面
export function openAppView(path: string, scheme = 'au.com.easi.customer') {
  window.location.href = `${scheme}://${path}`;
}
