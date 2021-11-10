# Extract GSheet

This is a prototype for testing out extracting data from a Google Sheet without going through the API. **No keys necessary!** This script will only read data from a Google Sheet provided that you publish and format your document correctly. Writing data to the Google Sheet through this script is not an option.

This project was inspired by [Tabletop](https://github.com/jsoma/tabletop#readme), which no longer works due to Google changing their API. It was a fantastic tool while it lasted. There are other options out there as well, but they seem to have a little more setup than this option.

## Features

- Simply add the publicHTML url provided
- No API Keys required
- Will extract all tabs in the sheet
- Transforms column headers into usable keys
- Each table includes the name of the tab, keys, and data values
- Clears out columns without a column header
- Clears out empty rows
- Transforms 'TRUE' and 'FALSE' to true and false (Boolean)
- Preserves formatting from document ('$1' does not translate to '1')
- Extracts page if it is a single tab, or multiple tabs

## Warnings

- This is not thoroughly tested, so I would not recommend this for production, unless maybe your user base is super small and they can let you know when things change.
- This heavily depends on the output HTML that Google provides. If it changes a little bit, this script will break as well.
- Checkboxes are not preserved (but you can bind the value to another cell for true/false)
- Images, charts, comments, etc are not included
- Some changes may take up to 5 minuts to reflect in the browser
- Node Module (/src/main.js) and available as a browser script (/dist/extract-gsheet)

## To Do

- Make Favicon
- Minify the Build
- Documentation Page

## Resources

- [Good article on Rollup](https://risanb.com/code/bundling-your-javascript-library-with-rollup/)