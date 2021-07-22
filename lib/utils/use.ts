import { reactive, VNode, Slots, App, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import EASIIndexDB, { Options } from '../indexdb/IndexDB';

export interface ModalVisible {
  [props: string]: boolean;
}

export interface PageRender {
  page: number;
  type: 'page' | 'prev' | 'next';
  originalElement: HTMLElement;
}

export interface Pagination {
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


export function useModalVisible(initValue: ModalVisible, preAction?: (...arg: any[]) => void) {
  const modalVisible = reactive(initValue);

  const setModalVisible = (key: string, value: boolean, ...arg: any[]) => {
    preAction?.(...arg);
    modalVisible[key] = value;
  };

  return [modalVisible, setModalVisible];
}

// 公共的table 页码初始化函数，2.2.0 rc.1版本showSizeChanger开启后antd要报错，原因不明，待官方修复
export function usePagination(initValue: Pagination) {
  const { t } = useI18n();
  return reactive({
    // pageSizeOptions: ['15', '20', '25', '30', '35', '40'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total: number) => t('common.pageTotal', { total }),
    showSizeChange: () => null,
    onShowSizeChange: () => null,
    ...initValue,
  });
}

const IndexDBSymbol = Symbol();
export function useDB(): EASIIndexDB {
  const db = inject(IndexDBSymbol) as EASIIndexDB;
  if (!db) {
    throw new Error('未发现indexdb实例');
  }
  return db;
}

export default {
  install: (app: App, props: { databaseName: string; options: Options }) => {
    if (!props) {
      throw new Error('请设置indexDB参数');
    }
    const { databaseName, options } = props;
    const indexdb = new EASIIndexDB(databaseName, options);
    app.config.globalProperties.$db = indexdb;
    app.provide(IndexDBSymbol, indexdb);
  },
};
