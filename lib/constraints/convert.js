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