import { reactive, VNode, Slots, App, inject } from 'vue';
import EASIIndexDB, { Options } from './IndexDB';

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
