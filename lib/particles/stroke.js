var values = require("../values");
var r = values.scale;

var height = 294;
var bottomPoints = [];
var topPoints = [
  [46, 98],
  [36, 74],
  [23, 51],
  [9, 30],
  [26, 27],
  [51, 38],
  [73, 49],
  [96, 62],
  [119, 75],
  [143, 86],
  [168, 90],
  [194, 87],
  [219, 79],
  [244, 69],
  [269, 61],
  [294, 51],
  [318, 44],
  [343, 36],
  [369, 29],
  [393, 23],
  [419, 18],
  [446, 13],
  [471, 9],
  [497, 6],
  [523, 3],
  [549, 0],
  [575, 0],
  [602, 0],
  [628, 1],
  [653, 3],
  [679, 7],
  [705, 12],
  [731, 18],
  [756, 26],
  [781, 33],
  [805, 41],
  [830, 51],
  [854, 61],
  [878, 71],
  [903, 82],
  [926, 94],
  [948, 106]
]

for(var i = 0, len = topPoints.length; i < len; i++) {
  var p = topPoints[i];
  bottomPoints.push([p[0], height - p[1]]);
}

var points = topPoints.concat(bottomPoints);

for(var i = 0, len = points.length; i < len; i++) {
  var p = points[i];
  p[0] *= r;
  p[1] *= r;
}


module.exports = points;