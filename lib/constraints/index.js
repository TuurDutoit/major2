var v = require("../values");
var segments = require("./segments");
var particles = require("../particles");
var constraints = [];

for(var i = 0, len = segments.length; i < len; i++) {
  var segment = segments[i];
  var indexA = segment[0];
  var indexB = segment[1];
  constraints.push(new DistanceConstraint(particles[indexA], particles[indexB], v.stiffness));
}

module.exports = constraints;