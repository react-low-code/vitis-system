import { runApp, IAppConfig, config } from 'ice';
import { message } from 'antd';
import { getToken, saveToken } from '@/utils';
import type { AxiosRequestConfig } from 'axios';

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
      request: {
        onConfig: (cfg: AxiosRequestConfig) => {
          const token: string = getToken();
          if (token) {
            cfg.headers = {
              authorization: token,
            };
          }
          return cfg;
        },
      },
      response: {
        onConfig: (response) => {
          if (response.data.code === '0004') {
            location.hash = '#/login';
          }

          if (response.data.data?.token) {
            saveToken(response.data.data.token);
          }

          if (response.data.code !== '0') {
            message.error(response.data.msg);
            return Promise.reject(response.data.msg);
          }
          return response.data;
        },
      },
    },
  },
};

runApp(appConfig);
