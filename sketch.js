var w = 20;
var grid = [];
var cols, rows;
var current;
var stack = [];

function setup(){
  createCanvas(400,400);
  cols = width/w;
  rows = height/w;
  for(var j = 0; j < cols; j++){
    for(var i = 0; i < rows; i++){
      grid.push(new Cell(i,j));
    }
  }
  current = grid[0];
}

function draw(){
  background(51);
  for(var i = 0; i < grid.length; i++){
    grid[i].show();
  }
  
   // Algorithm under here
  current.searched = true;
  current.highlighted();
  var next = current.checkNeighbors();
  if(next){
    next.searched = true;
    stack.push(current);
    removeWalls(current,next);
    current = next;
  }else if(stack.length > 0){
    current = stack.pop();
  }
}

function removeWalls(a,b){
  var r = b.r - a.r;
  var c = b.c - a.c;
  
  if(r == 1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if(r == -1){
    a.walls[3] = false;
    b.walls[1] = false;
  }
  if(c == 1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
  if(c == -1){
    a.walls[0] = false;
    b.walls[2] = false;
  }
}