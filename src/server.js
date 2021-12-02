const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getTables = require("./get-tables");

module.exports = async function (url) {
  try {
    if (!url.startsWith("https://docs.google.com/spreadsheets")) {
      throw "Invalid Public Google Sheet";
    } else {
      const dom = await JSDOM.fromURL(url);
      const document = dom.window.document;
      return getTables(document);
    }
  } catch (err) {
    throw new Error(err);
  }
};
