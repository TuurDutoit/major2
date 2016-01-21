var bridson = require("bridson");
var strokePoints = require("./stroke");
var isInside = require("./isInside");
var v = require("../values");

console.log("stroke points:", strokePoints.length);


module.exports = bridson({
  r: 1.5 * v.distance,
  isInside: isInside,
  //start: strokePoints,
  start: [500, 100],
  iterations: true
});