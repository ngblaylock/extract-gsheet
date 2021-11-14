const dayjs = require('dayjs');

module.exports = function(){
  return {
    env: process.env.ELEVENTY_ENV,
    baseURL: "https://ngblaylock.github.io",
    copyrightYear: new Date().getFullYear(),
    today: dayjs().format('MMMM D, YYYY'),
    gitHubRepoURL: 'https://github.com/ngblaylock/extract-gsheet',
  }
}