const extractGSheet = require("../src/server");

extractGSheet(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEBe3cgMNU7SnZGl5NEfLt3bD3__Ly_irTVFWcd3T6_ZC-9qhc-t2AIlAcNqDOZowdje3E2jZ1Z8dQ/pubhtml"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
