const env = process.env.ELEVENTY_ENV;
const inspect = require("util").inspect;

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./11ty-site/sass/");
  // Passthrough Copy
  eleventyConfig.addPassthroughCopy({"./11ty-site/assets": "/"});
  eleventyConfig.addPassthroughCopy({ dist: "js" });

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
