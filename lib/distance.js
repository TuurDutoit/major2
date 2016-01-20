module.exports = function(x1, y1, x2, y2) {
  var a = x2 - x1;
  var b = y2 - y1;
  return Math.sqrt(a*a + b*b);
}