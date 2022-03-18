# Development Documentation

## Develop the website only

Files are found in `/11ty-site` and uses Nunjucks for the templating language. To run it in development mode, run `npm run dev`. The files are hosted from the `/dev` directory.

## Build and deploy the website publicly

When the site is ready to launch publicly, make sure the changes are merged into the master branch. Run `npm run build` which will build the 11ty files to the `/docs` directory. Push the changes up to GitHub. The website is hosted with GitHub pages and it is configured to look in the master branch under the docs directory.

## Build Rollup files

Run `npm run rollup` to build the files one time, or run `npm run rollup:watch` to watch for file changes. You can easily check your changes using `/test/index.html`. It is best to use the live server extension which will hot-reload this page. Running this rollup script will build the script to the `/dist` directory in various formats.

## Deploy changes to NPM

Run `npm publish`. Make sure that you increment the version in `package.json`. If you don't it, won't let you publish it.

**TIP:** You should update the version before building the website so the correct version appears in the footer of the site.