const pluginSass = require("eleventy-plugin-sass");
const env = process.env.ELEVENTY_ENV;
const inspect = require("util").inspect;

module.exports = (eleventyConfig) => {
  // Passthrough Copy
  eleventyConfig.addPassthroughCopy({"./11ty-site/assets": "/"});
  eleventyConfig.addPassthroughCopy({ dist: "js" });
  eleventyConfig.addPlugin(pluginSass, {
    outputDir: env == "dev" ? "dev/styles" : "docs/styles",
    remap: true,
  });

  // Filter
  eleventyConfig.addFilter("pageLog", (content) => {
    return `${inspect(content)}`;
  });

  // Output
  return {
    dir: {
      input: "./11ty-site/pages",
      output: env == "dev" ? "dev" : "docs",
      layouts: "_layouts",
    },
    pathPrefix: "/extract-gsheet/",
  };
};
