import App from './app';
import { RootStoreSpec } from './types';

class RootStore implements RootStoreSpec {
  app: App;

  constructor() {
    this.app = new App(this);
  }
}

export default new RootStore();
