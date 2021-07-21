import * as Cookies from 'js-cookie';

interface StorageValue {
  value: any;
}

// 存入storage，expires是过期时间，单位毫秒，如果不传则默认为不过期
function transformValueToSet(this: Storage, key: string, value: StorageValue, expires = 0) {
  if(expires){
    expires = Date.now() + expires
  }
  const stringVal = JSON.stringify({
    value,
    expires,
  }) as string;
  this.setItem(key, stringVal);
}

// 根据数据类型处理后从storage内取出
function transformValueToGet(this: Storage, key: string) {
  const data = this.getItem(key);
  if (!data) {
    return null;
  }
  const { value, expires } = JSON.parse(data);
  if (expires && Date.now() >= expires) {
    this.removeItem(key);
    return null;
  }
  return value;
}

// cookie操作
export class EASICookie {
  // @params:Number expires 过期时间，单位（毫秒）
  static set(key: string, value: string, expires?: number) {
    if(expires){
      expires = expires / 86400000
    }
    expires ? Cookies.set(key, value, { expires }) : Cookies.set(key, value);
  }

  static get(key: string) {
    return Cookies.get(key);
  }

  static remove(key: string) {
    Cookies.remove(key);
  }
}

// localstorage操作
export class EASILocal {
  static set(key: string, value: any, expires = 0) {
    transformValueToSet.call(localStorage, key, value, expires);
  }

  static get(key: string) {
    return transformValueToGet.call(localStorage, key);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

// sessionstorage操作
export class EASISession {
  static set(key: string, value: any, expires = 0) {
    transformValueToSet.call(sessionStorage, key, value, expires);
  }

  static get(key: string) {
    return transformValueToGet.call(sessionStorage, key);
  }

  static remove(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}
