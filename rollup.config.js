import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/extract-gsheet.js",
      format: "umd",
      name: "extractGSheet",
    },
    {
      file: "dist/extract-gsheet.min.js",
      format: "umd",
      name: "extractGSheet",
      plugins: [terser()],
    },
  ],
};
