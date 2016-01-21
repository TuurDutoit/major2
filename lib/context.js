var v = require("./values");
var ctx = require("./canvas").getContext("2d");

ctx.strokeStyle = v.lineColor;
ctx.lineWidth = v.lineWidth;
ctx.fillStyle = v.pointColor;
ctx.scale(5, 5);


module.exports = ctx;