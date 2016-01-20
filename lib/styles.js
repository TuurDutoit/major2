var v = require("./values");
var ctx = require("./canvas").getContext("2d");


ctx.lineWidth = v.lineWidth;
ctx.strokeStyle = v.lineColor;
ctx.fillStyle = v.pointColor;


DistanceConstraint.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(this.a.pos.x, this.a.pos.y);
  ctx.lineTo(this.b.pos.x, this.b.pos.y);
  ctx.stroke();
}

PinConstraint.prototype.draw = function(ctx) {
  
}

Particle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, v.radius, 0, 2*Math.PI);
  ctx.fill();
}