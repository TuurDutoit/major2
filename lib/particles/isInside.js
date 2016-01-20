var ctx = require("./scrapbook");

module.exports = function(x, y) {
  return ctx.isPointInPath(x, y);
}