const package = require('../../../package')

module.exports = function(){
  return {
    env: process.env.ELEVENTY_ENV,
    baseURL: "https://ngblaylock.github.io",
    copyrightYear: new Date().getFullYear(),
    gitHubRepoURL: package.repository.url,
    version: package.version,
  }
}