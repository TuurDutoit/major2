var v = require("../values");
var dist = require("../distance");
var basePoints = require("./base");
var ctx = require("./scrapbook");


var img = ctx.getImageData(0, -20, 1138, 253);
var data = img.data;
var width = data.width;
var height = img.height;
var points = [];

for(var i = 0, len = data.length; i < len; i += 4) {
  if(data[i] === 0) {
    points.push([i % width, Math.floor(i / height)]);
  }
}

for(var i = 0; i < points.length; i++) {
  for(var j = 0, len = basePoints.length; j < len; j++) {
    if(dist(points[i][0], points[i][1], basePoints[j][0], basePoints[j][1]) < v.distance) {
      points.splice(i, 1);
    }
  }
}

points.push.apply(points, basePoints);



module.exports = points;