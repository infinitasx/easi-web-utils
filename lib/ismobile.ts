// 判断是否为移动端
// 移动端判断, true为移动端
export function isMobile(): boolean {
  return !!window.navigator.userAgent.match(
    /(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i,
  );
}
