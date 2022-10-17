import { makeAutoObservable } from 'mobx';
import { RootStoreSpec } from './types';

export default class App {
  appName?: string;
  BUName?: string;
  appId?: string;
  rootStore: RootStoreSpec;

  constructor(rootStore: RootStoreSpec) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  changeAppName(appName?: string) {
    this.appName = appName;
  }

  changeBUName(BUName?: string) {
    this.BUName = BUName;
  }

  changeAppId(appId?: string) {
    this.appId = appId
  }
}
