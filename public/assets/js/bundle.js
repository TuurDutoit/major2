(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = document.getElementById("interactive-fish");
},{}],2:[function(require,module,exports){
var map;
var segments;



var done = function(a, b) {
  map[a + "," + b] = true;
  map[b + "," + a] = true;
}


var isDone = function(a, b) {
  return map[a + "," + b];
}


var add = function(a, b) {
  segments.push([points[a], points[b]]);
}


var handleSegment = function(a, b) {
  if(!isDone(a, b)) {
    add(a, b);
    done(a, b);
  }
}



module.exports = function(triangles) {
  map = {};
  segments = [];
  
  for(var i = 0, len = triangles.length; i < len; i += 3) {
    var a = triangles[i];
    var b = triangles[i+1];
    var c = triangles[i+2];
    
    handleSegment(a, b);
    handleSegment(b, c);
    handleSegment(a, c);
  }
  
  return segments;
}
},{}],3:[function(require,module,exports){
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
},{"../particles":8,"../values":15,"./segments":4}],4:[function(require,module,exports){
var points = require("../particles/points");
var delaunay = require("delaunay-fast");
var convert = require("./convert");

var triangles = delaunay.triangulate(points);
var segments = convert(triangles);

module.exports = segments;
},{"../particles/points":10,"./convert":2,"delaunay-fast":18}],5:[function(require,module,exports){
module.exports = function(x1, y1, x2, y2) {
  var a = x2 - x1;
  var b = y2 - y1;
  return Math.sqrt(a*a + b*b);
}
},{}],6:[function(require,module,exports){
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
},{"./styles":14,"./world":16,"delta-timer":19,"raf-component":20}],7:[function(require,module,exports){
var r = require("../values").scale;
var basePoints = [
  [0, 0],
  [1038 * r, 115 * r],
  [0, 230 * r]
]


module.exports = basePoints;
},{"../values":15}],8:[function(require,module,exports){
var points = require("./points");
var particles = [];

for(var i = 0, len = points.length; i < len; i++) {
  var vec = new Vec2(points[i][0], points[i][1]);
  particles.push(new Particle(vec));
}


module.exports = particles;
},{"./points":10}],9:[function(require,module,exports){
var ctx = require("./scrapbook");

module.exports = function(x, y) {
  return ctx.isPointInPath(x, y);
}
},{"./scrapbook":11}],10:[function(require,module,exports){
var bridson = require("bridson");
var strokePoints = require("./stroke");
var isInside = require("./isInside");
var v = require("../values");

module.exports = bridson({
  r: 1.5 * v.distance,
  isInside: isInside,
  start: strokePoints
});
},{"../values":15,"./isInside":9,"./stroke":12,"bridson":17}],11:[function(require,module,exports){
var v = require("../values");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = v.width;
canvas.height = v.height;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.setLineDash([1, v.distance]);

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(104, 30, 141, 85, 200, 85);
ctx.bezierCurveTo(200, 85, 261, 85, 438, -20, 710, -20);
ctx.bezierCurveTo(710, -20, 905, -20, 1138, 111, 1138, 116);
ctx.bezierCurveTo(1138, 116, 1138, 122, 904, 253, 710, 253);
ctx.bezierCurveTo(710, 253, 438, 253, 260, 148, 200, 148);
ctx.bezierCurveTo(200, 148, 141, 148, 115, 198, 0, 232);
ctx.bezierCurveTo(0, 232, 75, 120, 75, 112, 0, 0);
ctx.stroke();


module.exports = ctx;
},{"../values":15}],12:[function(require,module,exports){
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
},{"../distance":5,"../values":15,"./base":7,"./scrapbook":11}],13:[function(require,module,exports){
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
},{"./particles":8,"./particles/base":7,"./particles/points":10}],14:[function(require,module,exports){
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
},{"./canvas":1,"./values":15}],15:[function(require,module,exports){
var canvas = require("./canvas");
var ctx = canvas.getContext("2d");

var standardWidth = 1050;
var standardHeight = 280;
var ratio = standardHeight / standardWidth;
var fullWidth = canvas.clientWidth;
var fullHeight = fullWidth * ratio;
canvas.style.height = height + "px";
canvas.width = fullWidth;
canvas.height = fullHeight;

var paddingXRatio = 0.1;
var paddingYRatio = 0.1;
var paddingX = fullWidth * paddingXRatio;
var paddingY = fullHeight * paddingYRatio;
var width = fullWidth - (2 * paddingX);
var height = fullHeight - (2 * paddingY);
var scale = width / standardWidth;
ctx.translate(paddingX, paddingY);

var distance = 30;
var radius = 7;
var stiffness = 1;
var lineColor = "#000000";
var lineWidth = 2;
var pointColor = "#000000";



module.exports = {
  standardWidth: standardWidth,
  standardHeight: standardHeight,
  ratio: ratio,
  fullWidth: fullWidth,
  fullHeight: fullHeight,
  paddingXRatio: paddingXRatio,
  paddingYRatio: paddingYRatio,
  width: width,
  height: height,
  scale: scale,
  distance: distance,
  radius: 7,
  stiffness: 1,
  lineColor: lineColor,
  lineWidth: lineWidth,
  pointColor: pointColor
}
},{"./canvas":1}],16:[function(require,module,exports){
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
},{"./canvas":1,"./constraints":3,"./particles":8,"./pins":13}],17:[function(require,module,exports){
var random = require("randf");
var randInt = require("random-int");

// Some vars we'll need
var minX;
var minY;
var maxX;
var maxY;
var r;
var r2;
var size;
var grid;
var active;
var inactive;
var isInside;

// Generate an array of surrounding cells to check in check
// Check all cells in a 5x5 square, with the point in the middle
// If point is in cell (0,0), indices go from -2 to 2 for both x and y
// Corner cells ((-2,-2), (2,-2), ...) are omitted (they are too far away)
// i.e.: [[-1,-2], [0,-2], [1,-2], ...]

var cellsToCheck = [];
for(var i = -2; i <= 2; i++) {
  for(var j = -2; j <= 2; j++) {
    if(Math.abs(i) !== 2 || Math.abs(j) !== 2) {
      cellsToCheck.push([i, j]);
    }
  }
}



var standardIsInside = function(x, y) {
  return (x > minX && x < maxX && y > minY && y < maxY);
}



// Make an isInside function isInside function that
// checks if point is inside bounding box

var updateBoundingBox = function(options) {
  // Origin of the bounding box
  minX = (options.origin && options.origin[0]) || 0;
  minY = (options.origin && options.origin[1]) || 0;
  
  // Width / height of bounding box
  // Either directly via width/height, or opposite corner of rectangle
  if(options.max) {
    width = options.max[0] - minX;
    height = options.max[1] - minY;
  }
  else {
    width = options.width || (options.dimensions && options.dimensions[0]) || 100;
    height = options.height || (options.dimensions && options.dimensions[1]) || 100;
  }
  
  // Opposite corner
  maxX = minX + width;
  maxY = minY + height;
  
  // Padding
  if(options.padding === true) {
    // true: padding = r
    minX += r;
    minY += r;
    maxX -= r;
    maxY -= r;
  }
  else if(typeof options.padding === "number") {
    // number: padding = this number
    minX += options.padding;
    minY += options.padding;
    maxX -= options.padding;
    maxY -= options.padding;
  }
  else if(options.padding) {
    // Array: padding = individual values
    minX += options.padding[0];
    minY += options.padding[1];
    maxX -= options.padding[2];
    maxY -= options.padding[3];
  }
}


// Basic distance function

var dist = function(x1, y1, x2, y2) {
  var a = x2 - x1;
  var b = y2 - y1;
  return Math.sqrt(a*a + b*b);
}


// Get the name of the cell for a point at (x, y)

var getCell = function(x, y) {
  return Math.floor(x / size) + "," + Math.floor(y / size);
}



// Generate a candidate
// distance to point at (x, y) between 'r' and r*2
// or: r < d < r * 2

var genCandidate = function(x, y) {
  var angle = random(0, 2 * Math.PI);
  var d = random(r, r2);
  return [x + (Math.cos(angle) * d), y + (Math.sin(angle) * d)];
}


// Check if a candidate is valid

var check = function(candidate) {
  // Indices in the grid for this candidate
  var x = Math.floor(candidate[0] / size);
  var y = Math.floor(candidate[1] / size);
  
  // Check surrounding cells for points that are too close (d < r)
  for(var i = 0, len = cellsToCheck.length; i < len; i++) {
    var str = (x + cellsToCheck[i][0]) + "," + (y + cellsToCheck[i][1]);
    var other = grid[str];
    
    if(other) {
      var d = dist(candidate[0], candidate[1], other[0], other[1]);
      
      if(d < r) {
        return false;
      }
    }
  }
  
  return true;
}


// Add a point to the active stack and the grid

var add = function(point) {
  active.push(point);
  var str = getCell(point[0], point[1]);
  grid[str] = point;
}








var bridson = function(candidates) {
  var iterations = 0;
  
  while(active.length) {
    iterations++;
    
    // Get a random active point
    var currentIndex = randInt(0, active.length - 1);
    var current = active[currentIndex];
    var generatedPoint = false;
    
    // Check 15 random candidates
    for(var i = 0; i < candidates; i++) {
      // Generate a candidate
      var candidate = genCandidate(current[0], current[1]);
      
      // Check if candidate is valid:
      // - inside bounding box
      // - not inside a radius of 'r' of any other point
      if(isInside(candidate[0], candidate[1]) && check(candidate)) {
        add(candidate);
        generatedPoint = true;
        
        // Results in slightly more iterations, but slightly faster results
        break;
      }
    }
    
    // If this point didn't generate a new point, make it inactive
    if(!generatedPoint) {
      inactive.push(current);
      active.splice(currentIndex, 1);
    }
  }
  
  return iterations;
}


module.exports = function(options) {
  var options = options || {};
  
  // Some vars
  r = options.r || 10;
  r2 = r * 2;
  size = r / Math.sqrt(2);
  grid = {};
  active = [];
  inactive = [];
  
  
  // Populate the isInside function
  if(options.isInside) {
    isInside = options.isInside;
  }
  else {
    updateBoundingBox(options);
    isInside = standardIsInside;
  }
  
  
  // Starting point
  if(options.start && typeof options.start[0] === "object") {
    // Start with an array of active points
    for(var i = 0, len = options.start; i < len; i++) {
      add(options.start[i]);
    }
  }
  else if(options.start) {
    // Use a given starting point
    add(options.start);
  }
  else {
    // Make a random starting point
    var start = [random(minX, maxX), random(minY, maxY)];
    add(start);
  }
  
  
  
  // MAGIC!
  var iterations = bridson(options.candidates || 15);
  
  
  
  // Add the amount of iterations, if needed
  if(options.iterations === true) {
    // true: add as 'iterations'
    inactive.iterations = iterations;
  }
  else if(options.iterations) {
    // string: the name for the property is provided
    inactive[options.iterations] = iterations;
  }
  
  return inactive;
}
},{"randf":21,"random-int":22}],18:[function(require,module,exports){
var Delaunay;

(function() {
  "use strict";

  var EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for(i = vertices.length; i--; ) {
      if(vertices[i][0] < xmin) xmin = vertices[i][0];
      if(vertices[i][0] > xmax) xmax = vertices[i][0];
      if(vertices[i][1] < ymin) ymin = vertices[i][1];
      if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid -      dmax],
      [xmid            , ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid -      dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
      throw new Error("Eek! Coincident points!");

    if(fabsy1y2 < EPSILON) {
      m2  = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (x2 + x1) / 2.0;
      yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
      m1  = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc  = (x3 + x2) / 2.0;
      yc  = m1 * (xc - mx1) + my1;
    }

    else {
      m1  = -((x2 - x1) / (y2 - y1));
      m2  = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc  = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
  }

  function dedup(edges) {
    var i, j, a, b, m, n;

    for(j = edges.length; j; ) {
      b = edges[--j];
      a = edges[--j];

      for(i = j; i; ) {
        n = edges[--i];
        m = edges[--i];

        if((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function(vertices, key) {
      var n = vertices.length,
          i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if(n < 3)
        return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if(key)
        for(i = n; i--; )
          vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. */
      indices = new Array(n);

      for(i = n; i--; )
        indices[i] = i;

      indices.sort(function(i, j) {
        return vertices[j][0] - vertices[i][0];
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);
      
      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges  = [];

      /* Incrementally add each vertex to the mesh. */
      for(i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for(j = open.length; j--; ) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if(dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if(dx * dx + dy * dy - open[j].r > EPSILON)
            continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i, open[j].j,
            open[j].j, open[j].k,
            open[j].k, open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for(j = edges.length; j; ) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for(i = open.length; i--; )
        closed.push(open[i]);
      open.length = 0;

      for(i = closed.length; i--; )
        if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function(tri, p) {
      /* Bounding box test first, for quick rejections. */
      if((p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
         (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
         (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
         (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1]))
        return null;

      var a = tri[1][0] - tri[0][0],
          b = tri[2][0] - tri[0][0],
          c = tri[1][1] - tri[0][1],
          d = tri[2][1] - tri[0][1],
          i = a * d - b * c;

      /* Degenerate tri. */
      if(i === 0.0)
        return null;

      var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
          v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

      /* If we're outside the tri, fail. */
      if(u < 0.0 || v < 0.0 || (u + v) > 1.0)
        return null;

      return [u, v];
    }
  };

  if(typeof module !== "undefined")
    module.exports = Delaunay;
})();

},{}],19:[function(require,module,exports){

module.exports = createTimer

var defaultNow = typeof window !== 'undefined' && window.performance.now
  ? function() { return performance.now() }
  : Date.now
  ? function() { return Date.now() }
  : function() { return +new Date }

function createTimer(now) {
  var last = null
    , paused = false

  function tick() {
    if (paused) return 0

    var date = tick.now()
      , dt = last ? date - last : 0

    last = date
    return dt
  }

  tick.tick = tick
  tick.now = now || defaultNow

  tick.pause = function() {
    if (paused) return tick
    paused = true
    return tick
  }

  tick.resume = function() {
    if (!paused) return tick
    paused = false
    tick.reset()
    return tick
  }

  tick.reset = function() {
    last = null
    return tick
  }

  return tick
}

},{}],20:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],21:[function(require,module,exports){
function random(start, end) {
    var n0 = typeof start === 'number',
        n1 = typeof end === 'number'

    if (n0 && !n1) {
        end = start
        start = 0
    } else if (!n0 && !n1) {
        start = 0
        end = 1
    }
    return start + Math.random() * (end - start)
}

module.exports = random
},{}],22:[function(require,module,exports){
'use strict';
module.exports = function (min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(Math.random() * (max - min + 1) + min);
};

},{}]},{},[6]);
