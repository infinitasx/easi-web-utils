// 创建web worker
export function createWorker(
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
