import { transformValueToGet, transformValueToSet } from './utils/storage';

export function setSession(key: string, value: any, expires = 0){
  transformValueToSet.call(sessionStorage, key, value, expires);
}

export function getSession(key: string){
  return transformValueToGet.call(sessionStorage, key);
}

export function removeSession(key: string){
  sessionStorage.removeItem(key);
}

export function clearSession(){
  sessionStorage.clear();
}
