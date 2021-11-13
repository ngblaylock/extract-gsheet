var fs = require('fs')
fs.readFile('./11ty-site/pages/documentation.md', 'utf8', function (err,data) {
  if (err) {
    return console.error(err);
  }
  var result = data.replace(/^---((.|\n)*)---(\n*)/g, '');
  var result = result.replace(/# Documentation/g, '# Extract GSheet Documentation')
  var result = result.replace(/^<div class="container documentation">\n*/g, '')
  var result = result.replace(/\n*<\/div>\n*$/g, '')

  fs.writeFile("./README.md", result, 'utf8', function (err) {
     if (err) return console.error(err);
     else{
       return console.log("README.md transformed and copied")
     }
  });
});