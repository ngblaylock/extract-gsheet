const dayjs = require('dayjs');

module.exports = function(){
  return {
    env: process.env.ELEVENTY_ENV,
    copyrightYear: new Date().getFullYear(),
    today: dayjs().format('MMMM D, YYYY')
  }
}