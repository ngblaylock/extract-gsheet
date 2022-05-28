const dayjs = require('dayjs');
const package = require('../../../package')

module.exports = function(){
  return {
    env: process.env.ELEVENTY_ENV,
    baseURL: "https://ngblaylock.github.io",
    copyrightYear: new Date().getFullYear(),
    today: dayjs().format('MMMM D, YYYY'),
    gitHubRepoURL: package.repository.url,
    version: package.version,
  }
}