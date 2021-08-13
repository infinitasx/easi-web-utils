import { transformValueToGet, transformValueToSet } from './utils/storage';

export function setLocal(key: string, value: any, expires = 0){
    transformValueToSet.call(localStorage, key, value, expires);
}

export function getLocal(key: string){
  return transformValueToGet.call(localStorage, key);
}

export function removeLocal(key: string){
  localStorage.removeItem(key);
}

export function clearLocal(){
  localStorage.clear();
}
