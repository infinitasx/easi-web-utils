// 判断App版本号,目前只支持用户端App
export function compareVersion(targetVersion: string, ua: string = navigator.userAgent.toLowerCase()) {
  try {
    let system = ((ua.match(/^(easicustomer|easimalaysia)(.+?)(\s|\()/) as string[])[2] as unknown as string).replace(/\s|\//g, '').split('.');
    let target = targetVersion.split('.');

    let length = system.length > target.length ? system.length : target.length;
    for (let i = 0; i < length; i++) {
      if (Number(target[i] || 0) < Number(system[i] || 0)) {
        return true;
      }
      if (Number(target[i] || 0) > Number(system[i] || 0)) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}
