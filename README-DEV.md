# Development Process

## Development Mode

Run `npm run dev` to watch and build the `src` directory to `dist` (Extract GSheet script) and will build the `11ty-site` directory to `dev`. This will hot reload the 11ty documentation site.

If you need to test out the output script in `dist` go to `/test` in the development server.

## Deploy Steps

1. Create a new branch.
2. Test in development mode.
3. Update the version in `package.json`.
4. Run `npm run build` to build the Extract GSheet script (`dist`) and the documentation site (`docs`).
5. Stage, commit, and push changes up to GitHub.
6. Merge branch into Master.
7. Create a new release on GitHub.
   - Make sure you do this on the Master branch
   - Create a tag: v0.x.x
   - Release title: v0.x.x
   - List any enhancements, bug fixes, documentation updates, etc.
8. Run `npm publish` to publish it on NPM.

## External References to This Project

Here are a list of places that I have referenced this project. Changing the Google Sheet reference in the documentation should also be changed here:

- https://dev.to/ngblaylock/extract-data-from-google-sheets-13jn
- https://codepen.io/ngblaylock/pen/KKvGqvw