var basePoints = require("./particles/base");
var points = require("./particles/points");
var particles = require("./particles");
var pins = [];

for(var i = 0, len = basePoints.length; i < len; i++) {
  var point = basePoints[i];
  var index = points.indexOf(point);
  console.log(index);
  var particle = particles[index];
  pins.push(new PinConstraint(particle, particle.pos));
}

module.exports = pins;