var points = require("./points");
var particles = [];

for(var i = 0, len = points.length; i < len; i++) {
  var vec = new Vec2(points[i][0], points[i][1]);
  particles.push(new Particle(vec));
}


module.exports = particles;