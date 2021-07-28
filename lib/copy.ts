// 复制
export function copy(
  content: string,
  container: HTMLElement = document.querySelector('body') as HTMLElement,
): boolean {
  if (!document.queryCommandSupported('copy')) {
    // 不支持
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = content;
  container.appendChild(textarea);
  textarea.select(); // 选择对象
  textarea.setSelectionRange(0, content.length); // 核心
  const result = document.execCommand('copy'); // 执行浏览器复制命令
  textarea.remove();
  return result;
}
