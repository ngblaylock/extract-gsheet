---
title: Documentation
description: Learn about Extract GSheet features and how to quickly extract JSON data from a public Google Sheet.
---

<div class=" container documentation">

<style>
  .documentation {
    .alert-warning ul{
      margin: 0;
    }
    img {
      display: block;
      margin: 2rem auto;
      max-width: 100%;
    }
    pre{
      margin-bottom: 24px;
    }
  }
</style>

# Documentation

## Features

- Include the script and call `extractGSheet(<published sheet url>)`
- No API Keys required
- Extracts all or single tabs in the published sheet
- Transforms column headers into usable keys
- Each table includes the title, name of the tab, keys, and data
- Clears out columns without a column header (key)
- Clears out empty rows
  - Note: if the row only contains checkboxes, this is considered empty whether it is checked or not
- 'TRUE' and 'FALSE' values are transformed to true and false (Boolean)
- Checkboxes are transformed to true and false (Boolean)
- Numbers are transformed to a numeric value ("2.5" is transformed to 2.5)
- Preserves text formatting from the sheet ('$1.00' does not transform to '1')
- If there is no "ID" column, a unique ID for the row will be provided.

<div class="alert alert-warning">
  
### Warning

- Extract GSheet will never reach v1.x.x. This is intended for small or personal projects.
- Extract GSheet heavily depends on the output HTML that Google provides. If Google's page changes a little bit, this script may break. Submit a new issue on GitHub if you find something was working but no longer is.
- Most non-text features will not be included (images, charts, comments, etc.).
- Some changes to a published sheet may take up to 5 minutes to reflect in the browser.
- This will not natively work on Internet Explorer.
- This version does not support server-side parsing as it relies on `fetch` and `DOMParser`. An enhancement for this is being considered.

</div>

## Setup Google Sheet

The first row in your Google Sheet will be the keys to your values (column headers). Some character transformations will occur in the JSON output:

1. All characters will be made lowercase
2. Spaces and special characters will be replaced with an `_`
3. Multiple spaces and/or special characters will be replaced with a single `_`
4. Any key that begins with a number will be prefixed with an `_`


```txt
| Column Header     | JSON Output      |
| ----------------- | ---------------- |
| HeLlO             | hello            |
| Movie ID          | movie_id         |
| Is True?          | is_true_         |
| 8 Keys            | _8_keys          |
| # of Participants | _of_participants |
```

![Google Sheet Screenshot](/img/documentation/spreadsheet.png)

Make sure that your Google Sheet has a title, and the tabs have names.

## Publish the Google Sheet

In Google Sheets, go to **File ➔ Share ➔ Publish to the web**. Inside the dialog, you can choose to publish one tab, specific tabs, or the entire document.

**NOTE:** If only one tab is published, the title will be the sheet title and the tab name separated by a `:`.

Once your tabs or document is selected, click "Publish" and you will be given a URL. Copy the entire URL. You will use the entire URL in your script.

![Publish Sheet Dialog Screenshot](/img/documentation/publish-window.png)

## Load the Script

**NPM:** (This has not been thoroughly tested, but should work)

```bash
npm install @ngblaylock/extract-gsheet
# const extractGSheet = require('@ngblaylock/extract-gsheet'); // CJS
# import extractGSheet from '@ngblaylock/extract-gsheet'; // ESM
```

**CDN:**

```html
<script src="https://cdn.jsdelivr.net/npm/@ngblaylock/extract-gsheet@{{global.version}}/dist/extract-gsheet.min.js"></script>
```

## Use the Script

Call the `extractGSheet()` function and pass in the entire URL from the published sheet. This script will return a promise, so you will probably want to use Async/Await or the `.then().catch()` syntax.

```html
<script>
  extractGSheet(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTRI47Ifj6D_US-HpggfPwSGU1nBSz81IaQ3FL3eqqjr2m8ZIdr6ia9L_FqsJqYVeUI_A2SDjm25FjG/pubhtml"
  )
    .then((res) => {
      // res is the data object
      console.info(res);
    })
    .catch((err) => {
      // handle the error if there is one
      console.error(err);
    });
</script>
```

That's it. Your data should be extracted from your published Google Sheet, and you can incorporate it into your website.

## Issue Reporting

If you find a bug with this project, please report them on [GitHub]({{global.gitHubRepoURL}}/issues). Pull requests are welcome.

## Special Thanks

This project was heavily inspired by [Tabletop.js by jsoma](https://github.com/jsoma/tabletop). I used it in a lot of projects, but now that its time has passed, I decided to make my own script. I hope you find this project beneficial.

</div>
