(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.axiosext = {}, global.axios));
}(this, (function (exports, axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /**
     * 判断对象
     * @param o
     * @returns
     */
    function isObj(o) {
      console.log(o);
      return Object.prototype.toString.call(o) === "[object Object]";
    }

    /**
     * 错误处理
     * @param error
     * @returns
     */

    function rejectedHandler(error) {
      return Promise.reject(error);
    }
    /**
     * 预处理AxiosRequestConfig
     * 处理rest API，将API中的参数替换为实际值
     *
     * @param config
     * @returns
     */


    function parseRestParam(config) {
      const {
        url = "",
        params = {},
        data = {},
        method
      } = config;

      if (FormData && data instanceof FormData) {
        return config;
      }

      const tmpParams = { ...params,
        ...data
      };
      config.url = url.replace(/:([^/\d]+)/g, (sub, $0) => {
        const v = tmpParams[$0];
        Reflect.deleteProperty(tmpParams, $0);
        return v;
      });

      if (method === "get") {
        config.params = { ...tmpParams
        };
        config.data = {};
      } else {
        config.params = {};
        config.data = { ...tmpParams
        };
      }

      return config;
    }
    /**
     * 预处理AxiosResponse
     *
     * @param response
     * @returns
     */


    function parseToJSON(response) {
      const {
        config: {
          responseType
        },
        data
      } = response;

      if (responseType === "json") {
        return data;
      }

      return response;
    }

    let ins = null;
    /**
     * 获取Axios实例
     * @param config
     * @returns
     */

    function getInstance(config) {
      if (ins !== null) {
        return ins;
      }

      const cfg = {
        baseURL: "",
        timeout: config.timeout || 10000,
        headers: {
          "Content-Type": "application/json"
        },
        responseType: "json"
      };
      ins = axios__default['default'].create(cfg);
      return ins;
    }
    /**
     * 导出一个实例
     *
     * @param config
     * @returns
     */


    function axiosext (config) {
      const instance = getInstance(config);
      const before = config.interceptor?.request;

      if (typeof before === "function") {
        instance.interceptors.request.use(before, rejectedHandler);
      }

      const after = config.interceptor?.response;

      if (typeof after === "function") {
        instance.interceptors.response.use(after, rejectedHandler);
      }

      instance.interceptors.request.use(parseRestParam, rejectedHandler);
      instance.interceptors.response.use(parseToJSON, rejectedHandler);
      return {
        instance: instance,
        post: (url, data, config) => {
          return instance.post(url, data, config);
        },
        delete: (url, data, config) => {
          return instance.delete(url, {
            data,
            ...config
          });
        },
        put: (url, data, config) => {
          return instance.put(url, data, config);
        },
        get: (url, params, config) => {
          return instance.get(url, {
            params,
            ...config
          });
        },
        patch: (url, data, config) => {
          return instance.put(url, data, config);
        },
        blob: (url, params, config) => {
          return instance.get(url, {
            params,
            ...config,
            responseType: "blob"
          });
        }
      };
    }

    let axiosExtInstance = null;

    function parseModule(apiModules) {
      if (!isObj(apiModules)) return {};
      const apis = {};
      Object.keys(apiModules).forEach(moduleName => {
        console.log(moduleName);
        apis[moduleName] = {};
        const module = apiModules[moduleName];
        Object.keys(module).forEach(funcName => {
          const {
            url
          } = module[funcName];
          let {
            method
          } = module[funcName];
          let me = method.toLowerCase();
          const httpMethod = axiosExtInstance[me];
          console.log(httpMethod);

          if (httpMethod) {
            apis[moduleName][funcName] = httpMethod.bind(null, url);
          }
        });
      });
      return apis;
    }

    let apis = null;
    function createApis(config) {
      if (apis !== null) {
        return apis;
      }

      axiosExtInstance = axiosext(config);
      apis = parseModule(config.modules);
      return apis;
    }

    exports.createApis = createApis;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=axiosext.umd.js.map
