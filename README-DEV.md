# Development Documentation

## Development

Run `npm run dev` to watch and build the `src` directory to `dist` (Extract GSheet script) and will build the `11ty-site` directory to `dev`. This will hot reload the 11ty documentation site.

If you need to test out the output script in `dist` go to `/test` in the development server.

## Deploy Steps

1. Test in development mode.
2. Update the version in `package.json`.
3. Run `npm run build` to build the Extract GSheet script (`dist`) and the documentation site (`docs`).
4. Stage, Commit, and push changes up to GitHub

When the site is ready to launch publicly, make sure the changes are merged into the master branch. Run `npm run build` which will build the 11ty files to the `/docs` directory. Push the changes up to GitHub. The website is hosted with GitHub pages and it is configured to look in the master branch under the docs directory.


## Deploy changes to NPM

Run `npm publish`. Make sure that you increment the version in `package.json`. If you don't it, won't let you publish it.

**TIP:** You should update the version before building the website so the correct version appears in the footer of the site.

## External References to This Project

Here are a list of places that I have referenced this project. Changing the Google Sheet reference in the documentation should also be changed here:

- https://dev.to/ngblaylock/extract-data-from-google-sheets-13jn
- https://codepen.io/ngblaylock/pen/KKvGqvw