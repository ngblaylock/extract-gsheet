const getTables = require('./get-tables');

module.exports = async function (url) {
  const fetchHtml = async function(url) {
    let response = await fetch(url);
    return await response.text();
  }

  try {
    if (!url.startsWith("https://docs.google.com/spreadsheets")) {
      throw "Invalid Public Google Sheet";
    } else {
      let page = await fetchHtml(url).then((text) => {
        return text;
      });
      var doc = new DOMParser().parseFromString(page, "text/html");
      return getTables(doc);
    }
  } catch (err) {
    throw new Error(err);
  }
};