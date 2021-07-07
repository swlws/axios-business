import { name } from "./package.json";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";

export default {
  input: "main.ts",
  output: [
    {
      name: `${name}`,
      file: `dist/${name}.umd.js`,
      format: "umd",
      sourcemap: true,
      exports: "named",
    },
    {
      file: `dist/${name}.cjs.js`,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".ts"],
    }),
  ],
};
