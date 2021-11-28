const getTables = require('./get-tables');

module.exports = async function (url) {
  try {
    if (!url.startsWith("https://docs.google.com/spreadsheets")) {
      throw "Invalid Public Google Sheet";
    } else {
      let page = await FetchHtml(url).then((text) => {
        return text;
      });
      var doc = new DOMParser().parseFromString(page, "text/html");
      return {
        title: doc.querySelector("#doc-title .name").textContent,
        tables: getTables(doc),
      };
    }
  } catch (err) {
    throw new Error(err);
  }
};

async function FetchHtml(url) {
  let response = await fetch(url);
  return await response.text();
}