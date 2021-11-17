# Extract GSheet Documentation

[Examples & Documentation](https://ngblaylock.github.io/extract-gsheet/)

## Features

- Include the script and call `extractGSheet(<published sheet url>)`
- No API Keys required
- Will extract all tabs in the published sheet
- Transforms column headers into usable keys
- Each table includes the title, name of the tab (if publishing multiple tabs), keys, and data values
- Clears out columns without a column header (key)
- Clears out empty rows
- 'TRUE' and 'FALSE' values are transformed to true and false (Boolean)
- Checkboxes are transformed to true and false (Boolean)
- Numbers are transformed to a numeric value ("2.5" is transformed to 2.5)
- Preserves text formatting from the sheet ('$1.00' does not transform to '1')
- If there is no key for "ID", a unique ID for the row will be provided. **However**, this id can change on each page load. Since Extract GSheet is a read-only tool, this should not be a problem.

<div class="alert alert-warning">
  
### Warning

- This is not thoroughly tested, so I would not recommend this for production.
- This heavily depends on the output HTML that Google provides. If Google's page changes a little bit, this script may break.
- Most non-text features will not be included (images, charts, comments, etc.).
- Some changes to a published sheet may take up to 5 minutes to reflect in the browser.
- This will not natively work on Internet Explorer.
- This version does not support server-side parsing as it relies on `window.fetch` and `window.DOMParser`. An enhancement for this is being considered.

</div>

## Setup Google Sheet

The first row in your tab will be the keys to your values. All characters will be made lowercase. Spaces and special characters will be replaced with an `_`. Multiple spaces and/or special characters will be replaced with a single `_`. Any key that begins with a number will be prefixed with an `_`.

```js
            HeLlO => hello
         Movie ID => movie_id
         Is True? => is_true_
           8 Keys => _8_keys
# of Participants => _of_participants
```

![Google Sheet Screenshot](https://ngblaylock.github.io/extract-gsheet/img/documentation/spreadsheet.png)

Make sure that your Google Sheet has a title, and the tabs have names.

## Publish the Google Sheet

In Google Sheets, go to "File", "Share", "Publish to the web". Inside the dialog, you can choose to publish one tab, specific tabs, or the entire document. If you have multiple tabs published, you will get the title of the tab separate from the document title. If you publish only one tab, the tab title will be returned included in the document title (probably separated by a `:`).

Once your tabs or document is selected, click "Publish" and you will be given a URL. Copy the entire URL. You will use the entire URL in your script.

![Publish Sheet Dialog Screenshot](https://ngblaylock.github.io/extract-gsheet/img/documentation/publish-window.png)

## Load the Script

**NPM:** (This has not been thoroughly tested)

``` bash
npm install extract-gsheet
# Then in your file:
# import extractGSheet from 'extract-gsheet'; 
```

**CDN:**

``` html
<script src="https://unpkg.com/extract-gsheet/dist/extract-gsheet.min.js"></script>
<!-- OR -->
<script src="https://cdn.jsdelivr.net/npm/extract-gsheet/dist/extract-gsheet.min.js"></script>
```

Or download the JS from this <a href="https://github.com/ngblaylock/extract-gsheet/tree/master/dist" target="_blank">GitHub repo</a>.

## Use the Script

Call the `extractGSheet()` function and pass in the entire URL from the published sheet. This script will return a promise, so you will probably want to use Async/Await or the `.then().catch()` syntax.

```html
<script>
  extractGSheet("https://docs.google.com/spreadsheets/d/e/2PACX-1vQEBe3cgMNU7SnZGl5NEfLt3bD3__Ly_irTVFWcd3T6_ZC-9qhc-t2AIlAcNqDOZowdje3E2jZ1Z8dQ/pubhtml")
    .then((res) => {
      // res is the data object
      console.log(res);
    })
    .catch((err) => {
      // handle the error if there is one
      console.error(err);
    });
</script>
```

That's it. Your data should be extracted from your published Google Sheet, and you can incorporate it into your website.

## Issue Reporting

If you find a bug with this project, please report them on [GitHub](https://github.com/ngblaylock/extract-gsheet/issues). Pull requests are welcome.