const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getTables = require("./get-tables");

module.exports = function (url) {
  JSDOM.fromURL(url).then((dom) => {
    const document = dom.window.document;

    return JSON.stringify({
      title: document.querySelector("#doc-title .name").textContent,
      tables: getTables(document),
    });
  });
};
