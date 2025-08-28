async function extractGSheet(url) {
  try {
    if (!url.startsWith("https://docs.google.com/spreadsheets")) {
      throw "Invalid Public Google Sheet";
    } else {
      let pageResponse = await fetch(url);
      let pageText = await pageResponse.text();
      var doc = new DOMParser().parseFromString(pageText, "text/html");
      return {
        title: doc.querySelector("#doc-title .name").textContent,
        tables: await getTables(pageText),
      };
    }
  } catch (err) {
    throw new Error(err);
  }
}

function checkboxStatus(content) {
  let c = content.innerHTML;
  if (c.includes(`<use href="#checked`)) {
    return "true";
  } else if (c.includes(`<use href="#unchecked`)) {
    return "false";
  } else {
    return "";
  }
}

async function getTables(pageText) {
  let tables = [];

  const matches = pageText.matchAll(/items.push\({name: ([\s\S]*?), gid:\s/g);
  for (const match of matches) {
    if (match[1]) {
      const split = match[1].split(", pageUrl: ");
      if (split.length === 2) {
        split[0] = split[0].slice(1, -1).trim();
        split[1] = split[1].slice(1, -1).trim();
        const tableUrl = Function(
          'return "' + split[1].replace(/"/g, '\\"') + '";'
        )();
        tables.push({
          tab: split[0],
          tableUrl,
        });
      }
    }
  }

  // Assuming you already parsed the JSON into a JS object called `data`
  const urls = tables.map((t) => t.tableUrl);

  // Fetch all at once
  const tableResults = await Promise.all(
    urls.map(async (url, index) => {
      const res = await fetch(url);
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, "text/html");

      return {
        tab: tables[index].tab,
        url,
        text,
        doc,
      };
    })
  );

  tableResults.forEach((result) => {
    result.keys = [];
    result.data = [];
    const tbody = result.doc.querySelector("table tbody");
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row, rowIndex) => {
      const rowHasText = !![...row.querySelectorAll("td")]
        .map((td) => td.innerText)
        .join("");
      if (rowIndex === 0) {
        // header row
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
          result.keys.push({
            name: cell.textContent,
            key: cell.textContent
              .replace(/\W+/gi, "_")
              .replace(/^\d/, "_$&")
              .toLowerCase()
              .trim(),
          });
        });
      } else if (rowHasText) {
        // data row
        const rowData = {};
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, cellIndex) => {
          const key = result.keys[cellIndex].key;
          if (key) {
            // set initial content
            let content = cell.textContent.trim();

            // make checkbox a true/false value
            if (!content) {
              content = checkboxStatus(cell);
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

            rowData[key] = content;
          }
        });
        result.data.push(rowData);
      }
    });
    delete result.doc;
    delete result.text;
    delete result.url;
    result.keys = result.keys.filter((k) => k.name);
  });

  // Add ID if no id present
  tableResults.forEach((d) => {
    let missingID = false;
    d.data.forEach((obj, index) => {
      if (!obj.id) {
        missingID = true;
        
        d.data[index] = { id: index + 1, ...obj };
      }
    });
    if (missingID) {
      d.keys.unshift({ name: "ID", key: "id" });
    }
  });

  return tableResults;
}

export default extractGSheet;
