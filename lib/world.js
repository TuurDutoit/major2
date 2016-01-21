var v = require("./values");
var canvas = require("./canvas");
var particles = require("./particles");
var constraints = require("./constraints");
var pins = require("./pins");

var world = new VerletJS(v.width, v.height, canvas);
var composite = new world.Composite();
composite.particles = particles;
composite.constraints = constraints.concat(pins);
world.composites.push(composite);


module.exports = world;