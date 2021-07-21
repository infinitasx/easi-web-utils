export default class EASIUtils {

  // 创建web worker
  static createWorker(
    func: () => void,
    data: any,
    backUpFunc?: (data: any) => any,): Promise<any> {

    return new Promise((resolve, reject) => {
      if (window.Worker) {
        const blob = new Blob(['(' + func.toString() + ')()']);
        const url = window.URL.createObjectURL(blob);
        const worker = new Worker(url);
        worker.postMessage(data);
        worker.onmessage = ({data}) => {
          worker.terminate();
          resolve(data);
        };

        worker.onerror = e => {
          worker.terminate();
          reject(e.message);
        };

        worker.onmessageerror = e => {
          worker.terminate();
          reject(e);
        };
      } else {
        return backUpFunc && backUpFunc(data);
      }
    });
  }

  // 动态引入script
  static loadScript(link: string, id: string) {
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

  // 读取文件
  // @param path 要扫描文件夹的相对路径
  // @param returnType 返回的数据类型，默认返回对象，即key为文件名，value为扫描出来的文件内容
  // @param fileExt 要匹配的文件名后缀，默认ts
  // @param deep 是否要递归文件夹内所有的子文件夹，默认为true
  static scanFiles(path: string, returnType: 'object' | 'array' = 'object', fileExt = 'ts', deep = true) {
    const reg = new RegExp('\\.' + fileExt + '$', 'gim');
    const ctx = require.context(path, deep, reg)
    if (returnType === 'object') {
      const map: any = {};
      for (const key of ctx.keys()) {
        const keyArr = key.split('/');
        keyArr.shift(); // 移除.
        map[keyArr.join('.').replace(reg, '')] = ctx(key).default as never;
      }
      return map;
    } else if (returnType === 'array') {
      const map: any = [];
      for (const key of ctx.keys()) {
        map.push(...ctx(key).default);
      }
      return map;
    }
  }

  // 防抖，多用于搜索输入
  // @param func 传入的回调函数
  // @param delay 延时抖动时长，默认200毫秒
  // @param immediate 调用时是否立即触发回调函数，默认false
  static debounced(func: () => void, delay = 200, immediate = false): () => void{
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // 判断是否为移动端
  // 移动端判断, true为移动端
  static isMobile(): boolean {
    return !!window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
  }

  // 复制
  static copy(
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
}
