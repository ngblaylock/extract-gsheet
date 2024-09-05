# Development Process

## Development Mode

Run `npm run dev` to watch and build the `src` directory to `dist` (Extract GSheet script) and will build the `11ty-site` directory to `docs`. This will hot reload the 11ty documentation site.

If you need to test out the output script in `dist` go to `/test` in the development server.

## Deploy Steps

1. Update package.json version
2. Merge into `master` branch (do a PR if necessary). 
  - This will run an action to build the site and host it on GitHub Pages.
3. Create a release in GitHub.
  - This will run an action to publish it to NPM.

## External References to This Project

Here are a list of places that I have referenced this project. Changing the Google Sheet reference in the documentation should also be changed here:

- https://dev.to/ngblaylock/extract-data-from-google-sheets-13jn
- https://codepen.io/ngblaylock/pen/KKvGqvw