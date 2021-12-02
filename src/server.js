const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getTables = require("./get-tables");

module.exports = async function (url) {
  const dom = await JSDOM.fromURL(url);
  const document = dom.window.document;
  return getTables(document);
};
