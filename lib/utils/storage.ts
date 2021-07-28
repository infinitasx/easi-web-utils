interface StorageValue {
  value: any;
}

// 存入storage，expires是过期时间，单位毫秒，如果不传则默认为不过期
export function transformValueToSet(this: Storage, key: string, value: StorageValue, expires = 0) {
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
export function transformValueToGet(this: Storage, key: string) {
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
