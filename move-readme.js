const fs = require('fs');
var pjson = require('./package.json');
fs.readFile('./11ty-site/pages/documentation.md', 'utf8', function (err,data) {
  if (err) {
    return console.error(err);
  }
  var result = data;
  result = result.replace(/^---((.|\n)*)---(\n*)/g, '');
  result = result.replace(/# Documentation/g, '# Extract GSheet Documentation\n\n[Examples & Documentation](https://ngblaylock.github.io/extract-gsheet/)')
  result = result.replace(/^<div class="container documentation">\n*/g, '')
  result = result.replace(/\n*<\/div>\n*$/g, '')
  result = result.replace(/{{root}}/g, pjson.homepage)
  result = result.replace(/{{global.gitHubRepoURL}}/g, pjson.repository.url)
  result = result.replace(/{{global.version}}/g, pjson.version)

  fs.writeFile("./README.md", result, 'utf8', function (err) {
     if (err) return console.error(err);
     else{
       return console.log("README.md transformed and copied")
     }
  });
});