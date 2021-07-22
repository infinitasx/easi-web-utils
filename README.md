<p align="center">
  <br>
  <img width="400" src="./_assets/logo.webp">
  <br>
  <br>
</p>

<h2 align='center'>EASI Web Utils</h2>

<p align='center'>
一个web端工具函数和类的集合
<br><br>

### 说明导航

- <a href="#indexdb">IndexDB工具类</a>
- <a href="#storage">本地存储工具类</a>
  - <a href="#cookie">Cookie类</a>
  - <a href="#local">LocalStorage类</a>
  - <a href="#session">SessionStorage类</a>
- <a href="#use">结合Vue3项目的函数封装</a>
  - <a href="#useModalVisible">useModalVisible - 用来管理多个弹框的显示隐藏，可传入预处理函数</a>
- <a href="#app">App嵌套H5常用工具函数</a>
  - <a href="#toAppWeb">toAppWeb</a>
  - <a href="#toAppPage">toAppPage - 跳转App原生页面</a>
  - <a href="#compareVersion">compareVersion - 判断用户端App版本号</a>
  - <a href="#compareUserAgent">compareUserAgent - 判断是否在EASI App内部打开</a>
- <a href="#utils">通用工具函数</a>
  - <a href="#createWorker">createWorker - 创建web worker</a>
  - <a href="#loadScript">loadScript - 动态引入script资源</a>
  - <a href="#debounced">debounced - 防抖函数</a>
  - <a href="#isMobile">isMobile - 是否为移动端</a>
  - <a href="#copy">copy - 复制文本</a>
  
  
<br/>
<hr />
<p><strong id="indexdb" style="font-size: 22px">EASIIndexDB</strong></p>

### 属性
>##### Constructor传参

| props        | type        | default     | required      |    remark      |
| :------------: | :-----------: | :-----------: | :-----------: | :--------------: |
| databaseName  |  string   |     |  是  | 数据库名称 |
| options        |  object    |        |  否  | 详细参数见下表，不传则不会创建任何表，只会创建数据库 |

>##### options
| props        | type        | default     | required      |    remark      |
| :------------: | :-----------: | :-----------: | :-----------: | :--------------: |
| version  |  number   |  1   |  否  | 数据库版本，只能升不能降，不能是小数，不传默认为1 |
| store        |  storeOption[]    |   []     |  否  | 详细参数见下表，生成表的规则，数组每一项都是一个表配置 |
| upgradeCallBack        |  (this: EasiIndexDB实例, versionChangeEvent: 数据库变化对象，可拿到旧版本号和新版本号) => promise\<void>  |        |  否  | 处理数据库升级事件的钩子函数，会在类操作数据库之前执行 |
>##### storeOption
| props        | type        | default     | required      |    remark      |
| :------------: | :-----------: | :-----------: | :-----------: | :--------------: |
| storeName  |  string   |     |  是  | 表名 |
| options        |  {autoIncrement: boolean, keyPath?: string}    |   {autoIncrement: true}     |  否  | 表配置，autoIncrement：主键是否自增，keyPath：主键名称 |
| indexOptions   |  {name: string, key: string or string[], unique: boolean, multiEntry?: boolean}[]  |   []     |  否  | 给表添加额外的索引，name：索引名称，key：索引主键，unique：主键是否唯一，multiEntry：如果索引主键为数组，则会给数组内的主键都设置索引 |

### Methods
>#### 添加单条数据
传入key则视为更新对应数据
#### add: (storeName: string, data: any, key?: IDBValidKey)=> Promise<Event>
<hr/>

>#### 删除数据
#### delete: (storeName: string, keyRange: IDBKeyRange ｜ IDBValidKey)=> Promise<Event>
<hr/>

>#### 删除索引
name: 索引名称<br/>
#### deleteIndex: (storeName: string, name: string)=> Promise<string>
<hr/>

>#### 清空表数据
#### clear: (storeName: string)=> Promise<Event>
<hr/>

>#### 更新数据
data 新的数据<br>
key 要匹配的主键值，不传则视为新增<br>
#### put: (storeName: string, data: any, key?: IDBKeyRange ｜ IDBValidKey)=> Promise<any>
<hr/>

>#### 获取数据
key 要匹配的主键值<br>
name 索引的名称，如果不想匹配主键的值，而是匹配索引的值，此处传入索引的名称<br>
#### get: (storeName: string, key: IDBKeyRange ｜ IDBValidKey, name?: string)=> Promise<any>
<hr/>

>#### 获取匹配的所有数据
key 要匹配的主键名称<br>
keyRange 需要匹配主键的值<br>
count 需要匹配的数量<br>
#### getAll: (storeName: string, key?: string, keyRange?: IDBValidKey | IDBKeyRange | null, count?: number)=> Promise<any[]>
<hr/>

>#### 获取匹配的所有索引
keyRange 需要匹配主键的值<br>
count 需要匹配的数量<br>
#### getAllKeys: (storeName: string, keyRange?: IDBValidKey | IDBKeyRange | null, count?: number)=> Promise<any[]>
<hr/>

>#### 模糊查询
keyword 需要匹配的值，支持传入正则，字符串，数字和布尔值<br>
keysField 需要匹配的键，只在数据为对象时才需要传入，如果传入的为数组，则会匹配对象内对应键的值<br>
#### elasticSearch: (storeName: string, keyword: RegExp | string | number | boolean, keysField?: string | string[])=> Promise<any[]>
<hr/>

>#### 获取数据总条数
keyRange 需要匹配主键的值<br>
#### count: (storeName: string, keyRange: IDBKeyRange)=> Promise<number>
<hr/>

>#### 获取表索引对象
name 索引名称<br>
#### index: (storeName: string, name: string)=> Promise<IDBIndex>
<hr/>

###如何使用
```ts
import { EASIIndexDB } from './lib/index'

// 初始化数据库
const db = new EASIIndexDB('mydb', {
  version: 1,
  store: [
    {
      storeName: 'test', // 表名
      indexOptions: [
        {
          name: 'index', // 索引名称
          key: 'index', // 索引键
          unique: false, // 是否唯一
        }
      ]
    },
  ],
});

// 做一些操作
async function doSomething(primaryKey){
  // 直接通过表名添加数据
  await db.$mydb.add('这是存入的数据0')

  // 通过传入表名添加数据
  await db.add('mydb', '这是存入的数据1')

  // 直接通过表名获取数据
  const data0 = await db.$mydb.get(primaryKey)
  console.log(data0)

  // 通过传入表名获取数据
  const data1 = await db.get('mydb', primaryKey)
  console.log(data1)
}

doSomething()
```

<br/>
<hr id="use"/>

### 结合Vue3项目的函数封装

<p><strong id="useModalVisible" style="font-size: 22px">useModalVisible</strong></p>

> 控制多个弹框显示隐藏，可以传入预处理函数

### 函数类型
```ts
interface InitValue {
  [props: string]: boolean
}

function useModalVisible(
  initValue: InitValue, // 接受一个初始化对象，初始化各弹框的显示/隐藏状态
  prevAction: (...arg: any[]) => void // 执行set操作前的预处理函数，这里只能获取到setValue入参除key,value之外的参数
): [value: InitValue, setValue: (key: string, value: boolean, ...args: any[]) => void] {}
```


###如何使用
```vue
<easi-table 
        @handleShowCreateModal="setVisibleModal('showCreateModal', true, $event)"
        @handleShowUpdateModal="setVisibleModal('showUpdateModal', true, $event)"
/>

<create-modal v-model:visible="visibleModal.showCreateModal" :item="currentTableItem" />
<update-modal v-model:visible="visibleModal.showUpdateModal" :item="currentTableItem" />
```
```ts
import { useModalVisible } from './lib/index'

export default {
  setup(){
    // 模拟table内的某一个row-data，用于传递给弹框组件
    const currentTableItem = ref<any>({});
    
    const [ visibleModal, setVisibleModal ] = useModalVisible({
      showCreateModal: false, // 控制创建弹框的显示和隐藏
      showUpdateModal: false, // 控制更新弹框的显示和隐藏
    }, (item: any) => {
      currentTableItem.value = item || {}
    })
    
    return {
      visibleModal,
      setVisibleModal
    }
  }
}
```

<br/>
<hr/>
<p><strong id="usePagination" style="font-size: 22px">usePagination</strong></p>

> 通用的页码初始化函数，返回ant Pagination类型的页码数据，主要是为了统一样式，给部分属性默认值

### 函数类型
```ts
interface Pagination {
  current: number;
  pageSize: number;
  defaultPageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  itemRender?: (PageRender: PageRender) => VNode | Slots;
  pageSizeOptions?: string[];
  showLessItems?: boolean;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  simple?: boolean;
  size?: string;
  total: number;
  buildOptionText?: (props: { value: number }) => string;
}

function usePagination(
  initValue: Pagination, // 接受一个初始化对象，一般只需要传入current, total, pageSize
): Pagination {}
```

<br/>
<hr/>
<p><strong id="useDB" style="font-size: 22px">useDB</strong></p>

> 自组件内使用indexdb，使用此函数，必须确保已经在Vue内注册了indexDB实例

###如何使用
> 在main.ts内初始化indexdb，并挂载到Vue实例内
```ts
// main.ts
import { createApp } from 'vue'
import App from 'App.vue'
import { EASIIndexDBPlugin } from '.lib/index'

createApp(App).use(EASIIndexDBPlugin, {
  databaseName: 'myDB',
  // 具体参数见 IndexDB工具类
  options: {
    version: 1,
    store: [
      {
        storeName: 'test1'
      }
    ]
  }
})
```
> 在需要调用indexDB的组件内使用useDB，会返回Vue实例内挂载的indexDB实例

```ts
import { useDB } from "./lib/index";

export default {
  setup() {
    const db = useDB();
    
    const getData = async () => {
      return await db.$test1.get(1)
    }
  }
}
```



<br/>
<hr id="storage"/>
<p><strong style="font-size: 22px"><span id="cookie">EASICookie</span> / <span id="local">EASILocal</span> / <span id="session">EASISession</span></strong></p>

> 均可设置有效期，单位毫秒

###如何使用
```ts
import { EASILocal, EASICookie, EASISession } from './lib/index'

// 保存一个小时有效期的token，不传第三个参数则默认永久有效，sessionStorage除外
EASICookie.set('token', token, 60 * 60 * 1000)
EASILocal.set('token', token, 60 * 60 * 1000)
EASISession.set('token', token, 60 * 60 * 1000)

// 读取token, 如果超过有效期或无数据会返回空。数据类型与存入时一致，===有效
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

<br/>
<hr id="app" />

## App嵌套H5常用工具函数

<p><strong id="toAppWeb" style="font-size: 22px">toAppWeb</strong></p>

> 打开 App内 web/help地址

###如何使用
```ts
interface IToAppWebOption {
  scheme: string; // App schema
  title: string; // 标题
  url: string; // 链接地址
  show: unknown;
}
function toAppWeb({scheme = 'au.com.easi.courier', title, url, show}: IToAppWebOption): void{}
```

<br/>
<hr />
<p><strong id="toAppPage" style="font-size: 22px">toAppPage</strong></p>

> 打开 App原生页面

###如何使用
```ts
function toAppPage(path: string, scheme = 'au.com.easi.customer'): void{}
```

<br/>
<hr />
<p><strong id="compareVersion" style="font-size: 22px">compareVersion</strong></p>

> 判断App版本号,目前只支持用户端App

###如何使用
```ts
// targetVersion: 需要判断的最低版本号，如果高于此版本号则返回true
function compareVersion(targetVersion: string, ua: string = navigator.userAgent.toLowerCase()): boolean {}
```

<br/>
<hr />
<p><strong id="compareUserAgent" style="font-size: 22px">compareUserAgent</strong></p>

> 判断App userAgent是否合法，如果合法则返回true

###如何使用
```ts
/*
 * 需要判断的客户端打开环境
 * 'easi': 所有EasiApp
 * 'easicustomer': Easi用户App内打开
 * 'easimalaysia': Easi Malaysia用户App内打开（仅针对马来西亚用户App）
 * 'easicourier': Easi配送员App内打开(含马来西亚)
 * 'easimerchant'：Easi 商家端App内打开
 * 'easimerchantmalaysia'：Easi Malaysia商家端App内打开（仅针对马来西亚商家App）
 *  */
type IClientType = 'easi' | 'easicustomer' | 'easimalaysia' | 'easicourier' | 'easimerchant' | 'easimerchantmalaysia'

// targetVersion: 需要判断的最低版本号，如果高于此版本号则返回true
function compareUserAgent(clientTypeArray: IClientType[] = [], ua = navigator.userAgent.toLowerCase()): boolean {}
```

<br/>
<hr id="utils" />

## 通用工具函数

<p><strong id="createWorker" style="font-size: 22px">createWorker</strong></p>

> 创建一个web worker线程

###如何使用
```ts

// 函数返回子线程返回的数据
function createWorker(
        func: () => void, // 子线程执行的函数
        data: any, // 传递给子线程的数据，必须是可拷贝的对象，如果是vue代理的对象需要还原成原始对象
        backUpFunc?: (data: any) => any, // 如果浏览器不支持web worker，执行的函数，一般不传
): Promise<any> {}
```

<br/>
<hr />
<p><strong id="loadScript" style="font-size: 22px">loadScript</strong></p>

> 动态加载js资源

###如何使用
```ts
// link: js资源的链接地址
// id: 给这个js资源一个唯一的标示，避免重复加载
function loadScript(link: string, id: string): Promise<void>{}
```

<br/>
<hr />
<p><strong id="debounced" style="font-size: 22px">debounced</strong></p>

> 防抖函数

###如何使用
```ts
// func: 要执行的函数
// delay: 延迟执行时间
// immediate: 是否立即执行
function debounced(func: () => void, delay = 200, immediate = false): () => void {}
```

<br/>
<hr />
<p><strong id="isMobile" style="font-size: 22px">isMobile</strong></p>

> 判断当前是否是移动端环境，如果是则返回true

###如何使用
```ts
function isMobile(): boolean {}
```

<br/>
<hr />
<p><strong id="copy" style="font-size: 22px">copy</strong></p>

> 一键复制，复制成功则返回true

###如何使用
```ts
function copy(
        content: string, // 要复制的文案
        container: HTMLElement = document.querySelector('body') as HTMLElement, // 如果文案是在弹框中，请传入弹框的Dom对象
): boolean {}
```
