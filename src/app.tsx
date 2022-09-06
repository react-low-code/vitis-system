import { runApp, IAppConfig, config } from 'ice';
import { message } from 'antd';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'hash',
  },
  request: {
    baseURL: config.baseURL,
    interceptors: {
      response: {
        onConfig: (response) => {
          if (response.data.code !== '0') {
            message.error(response.data.msg);
          }
          return response.data;
        },
      },
    },
  },
};

runApp(appConfig);
