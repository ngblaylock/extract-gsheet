const extractGSheet = async function (url) {
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

const hasCheckbox = function (content) {
  if (content.innerHTML.match(/<use href="#(un)?checked/g)) {
    return true;
  }
  return false;
};

const checkboxStatus = function (content) {
  let c = content.innerHTML;
  if (c.includes(`<use href="#checked`)) {
    return "true";
  } else if (c.includes(`<use href="#unchecked`)) {
    return "false";
  } else {
    return "";
  }
};

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
    let tab = doc.querySelectorAll("#sheet-menu li")[tableIndex];
    data.push({
      tab: tab ? tab.textContent : "",
      keys: [],
      data: [],
    });

    // Add All Rows
    table.querySelectorAll("tr").forEach((tr) => {
      if (tr.textContent || hasCheckbox(tr)) {
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
            // Only do this if there is a column header
            if (key) {
              // set initial content
              let content = td.textContent.trim();

              // make checkbox a true/false value
              if (!content) {
                content = checkboxStatus(td);
              }

              // make "TRUE", "FAlse" a Boolean
              if (content && content.toLowerCase() === "true") {
                content = true;
              } else if (content && content.toLowerCase() === "false") {
                content = false;
              }

              // make "123" a Number
              if (content && typeof content == "string" && !isNaN(content)) {
                content = parseFloat(content);
              }

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

  // Add ID if no id present
  data.forEach((d) => {
    let missingID = false;
    d.data.forEach((obj, index) => {
      if (!obj.id) {
        missingID = true;
        d.data[index] = {id: index + 1, ...obj};
      }
    });
    if (missingID) {
      d.keys.unshift({ name: "ID", key: "id" });
    }
  });

  return data;
};

export { extractGSheet as default };
