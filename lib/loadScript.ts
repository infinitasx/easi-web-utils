
// 动态引入script
export function loadScript(link: string, id: string) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`#${id}`)) {
      return resolve('');
    }

    // 创建script标签，引入外部文件
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = link;
    if (id) {
      script.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    // 引入成功
    script.onload = function () {
      resolve('');
    };
    // 引入失败
    script.onerror = function () {
      reject('引入失败');
    };
  });
}
