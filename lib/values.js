var canvas = require("./canvas");
var ctx = canvas.getContext("2d");

var standardWidth = 960;
var standardHeight = 227;
var ratio = standardHeight / standardWidth;
var fullWidth = canvas.clientWidth;
var fullHeight = fullWidth * ratio;
canvas.style.height = height + "px";
canvas.width = fullWidth;
canvas.height = fullHeight;

var paddingXRatio = 0.1;
var paddingYRatio = 0.1;
var paddingX = fullWidth * paddingXRatio;
var paddingY = fullHeight * paddingYRatio;
var width = fullWidth - (2 * paddingX);
var height = fullHeight - (2 * paddingY);
var scale = width / standardWidth;
//ctx.translate(paddingX, paddingY);

var distance = 30;
var radius = 2;
var stiffness = 1;
var lineColor = "#000000";
var lineWidth = 2;
var pointColor = "#000000";



module.exports = {
  standardWidth: standardWidth,
  standardHeight: standardHeight,
  ratio: ratio,
  fullWidth: fullWidth,
  fullHeight: fullHeight,
  paddingXRatio: paddingXRatio,
  paddingYRatio: paddingYRatio,
  width: width,
  height: height,
  scale: scale,
  distance: distance,
  radius: 7,
  stiffness: 1,
  lineColor: lineColor,
  lineWidth: lineWidth,
  pointColor: pointColor
}