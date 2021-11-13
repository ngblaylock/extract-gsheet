# Extract GSheet Documentation

## Features

- Simply add the publicHTML url provided
- No API Keys required
- Will extract all tabs in the sheet
- Transforms column headers into usable keys
- Each table includes the title, name of the tab (if publishing multiple tabs), keys, and data values
- Clears out columns without a column header
- Clears out empty rows
- Transforms 'TRUE' and 'FALSE' to true and false (Boolean)
- Preserves text formatting from the sheet ('$1.00' does not transform to '1')

<div class="alert alert-warning">
  <p class="text-uppercase pt-2"><strong>Warning</strong></p>

- This is not thoroughly tested, so I would not recommend this for production, unless maybe your user base is super small and they can let you know when things change.
- This heavily depends on the output HTML that Google provides. If Googles page changes a little bit, this script will break as well.
- Checkboxes are not preserved (possible future enhancement)
- Images, charts, comments, etc are not included (possible future enhancement)
- Some changes may take up to 5 minuts to reflect in the browser

</div>

## Setup Google Sheet

The first row in your document will be the keys to your values. All characters will be made lowercase. Spaces and special characters will be replaced with an `_`. Multiple spaces and/or special characters will be replaced with a single `_`. Any key that begins with a number will be prefixed with an `_`.

```js
            HeLlO => hello
         Movie ID => movie_id
         Is True? => is_true_
           8 Eggs => _8_eggs
# of Participants => _of_participants
```

![screenshot](https://via.placeholder.com/600x300)

Make sure that your Google Sheet has a title, and the tabs have names.

![screenshot](https://via.placeholder.com/600x300)

## Publish the Google Sheet

In Google Sheets, go to "File", "Share", "Publish to the web". Inside the dialog, you can choose to publish one tab, specific tabs, or the entire document. If you have multiple tabs published, you will get the title of the tab separate from the document title. If you publish only one tab, the tab title will be returned included in the document title (probably separated by a `:`).

Once your tabs or document is selected, click "Publish" and you will be given a URL. Copy the entire URL. You will use the entire URL in your script.

![screenshot](https://via.placeholder.com/600x300)

## Load the Script

-- NPM
-- CDN

Download the JS from this git repo: `extract-gsheet/dist/extract-sgheet.min.js`.

## Use the Script

This script will return a promise, so you will need either Async/Await, or you can use the `.then().catch()` syntax.

```html
<script>
  extractGSheet("https://docs.google.com/spreadsheets/d/1...")
    .then((res) => {
      // res is the data object
      console.log(res);
    })
    .catch((err) => {
      // handle the error if there is one
      console.err(err);
    });
</script>
```

That's it. Options will be coming soon. How you consume the data is up to you.

## Issue Reporting

If you find a bug with this project, please report them on [GitHub](https://github.com/ngblaylock/extract-gsheet/issues). Pull requests are welcome.
