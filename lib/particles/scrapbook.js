var v = require("../values");
var canvas = document.createElement("canvas");
var canvas = require("../canvas");
var ctx = canvas.getContext("2d");
canvas.width = v.width;
canvas.height = v.height;
ctx.translate(0, 20);

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(104,  30,  141,  85,  200,  85);
ctx.bezierCurveTo(261,  85,  438,  -20, 710,  -20);
ctx.bezierCurveTo(905,  -20, 1138, 111, 1138, 116);
ctx.bezierCurveTo(1138, 122, 904,  253, 710,  253);
ctx.bezierCurveTo(438,  253, 260,  148, 200,  148);
ctx.bezierCurveTo(141,  148, 115,  198, 0,    232);
ctx.bezierCurveTo(75,   120, 75,   112, 0,    0);


module.exports = ctx;