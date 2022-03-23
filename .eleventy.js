const pluginSass = require("eleventy-plugin-sass");
const env = process.env.ELEVENTY_ENV;

module.exports = (eleventyConfig) => {
  console.log(env);
  // Copy our static assets to the output folder
  eleventyConfig.addPassthroughCopy({"./11ty-site/assets": "/"});
  eleventyConfig.addPassthroughCopy({ dist: "js" });
  eleventyConfig.addPlugin(pluginSass, {
    outputDir: env == "dev" ? "dev/styles" : "docs/styles",
    remap: true,
  });

  return {
    dir: {
      input: "./11ty-site/pages",
      output: env == "dev" ? "dev" : "docs",
      layouts: "_layouts",
    },
    pathPrefix: "/extract-gsheet/",
  };
};
