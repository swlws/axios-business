# axios-ext

基础 axios 封装业务 HTTP 库，将接口转化为可调用的函数

# 使用

浏览器中使用，用 script 标签引用`axios-ext.umd.js`

```js
const modules = {
  app: {
    login: {
      url: "/api/login",
      method: "post",
    },
  },
};

const axiosExt = window["axios-ext"];
const apis = axiosExt.createApis({ modules });
```

node 环境中

```js
import { createApis } from "axios-ext";
const modules = {
  app: {
    login: {
      url: "/api/login",
      method: "post",
    },
  },
};

const apis = createApis({ modules });
```

# API

createApis

> function createApis(config: AxiosExtConfig): ApiFunc;

```ts
export interface AxiosExtConfig {
  modules: Record<string, ApiModule>;
  timeout?: number;
  interceptor?: {
    request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    response?: (response: AxiosResponse) => AxiosResponse;
  };
}

export type ApiFunc = {
  [k: string]: {
    [k: string]: (
      data?: FreeObject,
      config?: AxiosRequestConfig
    ) => Promise<any>;
  };
};
```
