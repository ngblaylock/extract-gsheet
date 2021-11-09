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

  // Find and Add Tables
  doc.querySelectorAll("#sheets-viewport table").forEach((table) => {
    if (table.textContent) {
      tables.push(table);
    }
  });

  // Setup Table
  tables.forEach((table, tableIndex) => {
    let rows = [];
    let tab = doc.querySelectorAll("#sheet-menu li")[tableIndex]
    data.push({
      tab: tab ? tab.textContent : '',
      keys: [],
      data: [],
    });

    // Add All Rows
    table.querySelectorAll("tr").forEach((tr) => {
      if (tr.textContent) {
        rows.push(tr);
      }
    });

    // Get Keys
    rows[0].querySelectorAll("td").forEach((key) => {
      if (key.textContent) {
        data[tableIndex].keys.push({
          name: key.textContent,
          key: key.textContent
            .replace(/\W+/gi, "_")
            .replace(/^\d/, "_$&")
            .toLowerCase(),
        });
      }
    });

    // Extract Data
    for (let x = 0; x < rows.length; x++) {
      if (x != 0) {
        data[tableIndex].data.push({});
        rows[x].querySelectorAll("td").forEach((td, tdIndex) => {
          if (data[tableIndex].keys[tdIndex]) {
            let key = data[tableIndex].keys[tdIndex].key;
            let content = td.textContent;
            if (content && content.toLowerCase() === "true") content = true;
            else if (content && content.toLowerCase() === "false")
              content = false;
            if (key) {
              data[tableIndex].data[x - 1][key] = content;
            }
          }
        });
      }
    }
  });

  // Remove Empty Rows
  data.forEach((d) => {
    d.data = d.data.filter((row) => {
      return !Object.values(row).every((v) => v === "");
    });
  });

  return data;
};
