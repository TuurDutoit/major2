var points = require("../particles/points");
var delaunay = require("delaunay-fast");
var convert = require("./convert");

var triangles = delaunay.triangulate(points);
var segments = convert(triangles);

module.exports = segments;