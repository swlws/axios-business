import { isObj } from "@src/util";
import {
  ApiFunc,
  ApiModule,
  AxiosExtConfig,
  AxiosExtInstance,
} from "@type/index";
import axiosext from "./src/axiosext";

let axiosExtInstance: null | AxiosExtInstance = null;

function parseModule(apiModules: Record<string, ApiModule>) {
  if (!isObj(apiModules)) return {};

  const apis: ApiFunc = {};
  Object.keys(apiModules).forEach((moduleName) => {
    console.log(moduleName);
    apis[moduleName] = {};

    const module: ApiModule = apiModules[moduleName];
    Object.keys(module).forEach((funcName) => {
      const { url } = module[funcName];
      let { method } = module[funcName];

      let me = method.toLowerCase();

      const httpMethod = (axiosExtInstance as any)[me];

      if (httpMethod) {
        apis[moduleName][funcName] = httpMethod.bind(null, url);
      }
    });
  });

  return apis;
}

let apis: null | ApiFunc = null;
export function createApis(config: AxiosExtConfig) {
  if (apis !== null) {
    return apis;
  }

  axiosExtInstance = axiosext(config);

  apis = parseModule(config.modules);
  return apis;
}
