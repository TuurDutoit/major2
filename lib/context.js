var v = require("./values");
var ctx = require("./canvas").getContext("2d");

ctx.strokeStyle = v.lineColor;
ctx.lineWidth = v.lineWidth;
ctx.fillStyle = v.pointColor;

module.exports = ctx;