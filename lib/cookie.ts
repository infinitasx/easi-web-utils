import * as Cookies from 'js-cookie';

export function setCookie(key: string, value: string, expires?: number) {
  if(expires){
    expires = expires / 86400000
  }
  expires ? Cookies.set(key, value, { expires }) : Cookies.set(key, value);
}

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function removeCookie(key: string) {
  return Cookies.remove(key);
}
