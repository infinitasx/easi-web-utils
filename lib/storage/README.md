## 本地缓存工具
> 可操作Cookie，localStorage，sessionStorage，且均已实现设置有效期，如果超过有效期或无数据会返回null
> 有效期单位毫秒，例如：本地存储token的有效期只有一个小时，则传入的有效期应为：60 * 60 * 1000
### 使用方式
```vue
import { EASILocal, EASICookie, EASISession } from 'Storage'

// 保存一个小时有效期的token，不传第三个参数则默认永久有效，sessionStorage除外
EASICookie.set('token', token, 60 * 60 * 1000)
EASILocal.set('token', token, 60 * 60 * 1000)
EASISession.set('token', token, 60 * 60 * 1000)

// 读取token, 如果超过有效期或无数据会返回空。如果存入的是number类型，返回的一定是number类型，===有效
EASICookie.get('token')
EASILocal.get('token')
EASISession.get('token')

// 删除某一个key
EASICookie.remove('token')
EASILocal.remove('token')
EASISession.remove('token')

// 清空所有数据，Cookie暂未实现全部清除
EASILocal.clear()
EASISession.clear()
```
