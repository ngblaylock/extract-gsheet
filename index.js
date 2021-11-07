async function extractGSheet(pubHTML) {
  let page = await FetchHtml(pubHTML).then((text) => {
    return text;
  });
  var doc = new DOMParser().parseFromString(page, "text/html");
  return {
    title: doc.querySelector("#doc-title .name").textContent,
    tables: getTables(doc),
  };
}

async function FetchHtml(pubHTML) {
  let response = await fetch(pubHTML);
  return await response.text(); // Returns it as Promise
}

const getTables = function (doc) {
  let tables = [];
  let data = [];
  doc.querySelectorAll("#sheets-viewport table").forEach((table) => {
    if (table.textContent) {
      tables.push(table);
    }
  });
  tables.forEach((table, tableIndex) => {
    let rows = [];
    data.push({
      tab: doc.querySelectorAll("#sheet-menu li")[tableIndex].textContent,
      data: [],
    });
    table.querySelectorAll("tr").forEach((tr) => {
      if (tr.textContent) {
        rows.push(tr);
      }
    });
    let keys = [];
    rows[0].querySelectorAll("td").forEach((key) => {
      keys.push(
        key.textContent
          .replace(/\W+/gi, "_")
          .replace(/^\d/, "_$&")
          .toLowerCase()
      );
    });
    for (let x = 0; x < rows.length; x++) {
      if (x != 0) {
        data[tableIndex].data.push({});
        rows[x].querySelectorAll("td").forEach((td, tdIndex) => {
          let key = keys[tdIndex];
          let content = td.textContent;
          if (content && content.toLowerCase() === "true") content = true;
          else if (content && content.toLowerCase() === "false")
            content = false;
          if (key) {
            data[tableIndex].data[x - 1][key] = td.textContent;
          }
        });
      }
    }
  });
  return data;
};
