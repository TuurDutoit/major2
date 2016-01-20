require("./styles");
var world = require("./world");
var raf = require("raf-component");
var timer = require("delta-timer")();





var frame = function() {
  raf(frame);
  world.frame(timer());
  world.draw();
}

frame();