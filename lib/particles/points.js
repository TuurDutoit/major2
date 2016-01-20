var bridson = require("bridson");
var strokePoints = require("./stroke");
var isInside = require("./isInside");
var v = require("../values");

module.exports = bridson({
  r: 1.5 * v.distance,
  isInside: isInside,
  start: strokePoints
});