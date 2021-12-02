import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "src/client.js",
  output: [
    {
      file: "dist/extract-gsheet.js",
      format: "iife",
      name: "extractGSheet",
    },
    {
      file: "dist/extract-gsheet.min.js",
      format: "iife",
      name: "extractGSheet",
      plugins: [terser()],
    },
    {
      file: "dist/extract-gsheet.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/extract-gsheet.umd.js",
      format: "umd",
      name: "extractGSheet",
    },
    {
      file: "dist/extract-gsheet.esm.js",
      format: "esm",
    },
  ],
  plugins: [nodeResolve(), commonjs()]
};
