import { runApp, IAppConfig, config } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'hash',
  },
  request: {
    baseURL: config.baseURL,
  },
};

runApp(appConfig);
