var bridson = require("bridson");
var v = require("../values");
var isInside = require("./isInside");
var strokePoints = require("./full-stroke");




module.exports = bridson({
  r: 1.5 * v.distance,
  isInside: isInside,
  start: strokePoints,
  iterations: true
});