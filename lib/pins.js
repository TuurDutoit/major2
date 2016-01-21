var basePoints = require("./particles/base");
var points = require("./particles/points");
var particles = require("./particles");
var pins = [];
console.log("base points:", basePoints.length);
console.log("points:", points.length);
console.log("particles:", particles.length);
console.log("Bridson iterations:", points.iterations);
console.log("");


for(var i = 0, len = basePoints.length; i < len; i++) {
  var point = basePoints[i];
  var index = points.indexOf(point);
  console.log(i + "," + index);
  var particle = particles[index];
  pins.push(new PinConstraint(particle, particle.pos));
}

module.exports = pins;