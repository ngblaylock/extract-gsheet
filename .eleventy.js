const env = process.env.ELEVENTY_ENV;
const inspect = require("util").inspect;
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Passthrough Copy
  eleventyConfig.addPassthroughCopy({"./11ty-site/assets": "/"});
  eleventyConfig.addPassthroughCopy({"./node_modules/@ngblaylock/bootstrap-extensions/dist/js/bootstrap-extensions.min.js": "js/bootstrap-extensions.min.js"});
  eleventyConfig.addPassthroughCopy({ dist: "js" });

  // Filter
  eleventyConfig.addFilter("pageLog", (content) => {
    return `${inspect(content)}`;
  });

  // ServerOptions
  eleventyConfig.setServerOptions({
    watch: ['dev/**/*.css']
  })

  // Output
  return {
    pathPrefix: env === "dev" ? "/" : "/extract-gsheet/",
    dir: {
      input: "./11ty-site/pages",
      output: "docs",
      layouts: "_layouts",
    },
  };
};
