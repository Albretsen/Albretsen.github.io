function Cell(r, c){
  this.r = r;
  this.c = c;
  this.searched = false;
  this.walls = [true,true,true,true];
}

Cell.prototype.show = function(){
  var x = this.r * w;
  var y = this.c * w;
  
  noFill();
  stroke(255);
  
  if(this.walls[0]){
    line(x,y,x+w,y);
  }
  if(this.walls[1]){
    line(x+w,y,x+w,y+w);
  }
  if(this.walls[2]){
    line(x+w,y+w,x,y+w);
  }
  if(this.walls[3]){
    line(x,y+2,x,y);
  }
  
  if(this.searched){
    fill(0,255,0,100);
    noStroke();
    rect(x,y,w,w);
  }
}

Cell.prototype.highlighted = function(){
  var x = this.r * w;
  var y = this.c * w;
  
  fill(0,0,255,100);
    noStroke();
    rect(x,y,w,w);
}

function index(i,j){
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1;
  }
  
  return i + j*cols;
}

Cell.prototype.checkNeighbors = function(){
  var neighbors = [];
  
  var top = grid[index(this.r,this.c-1)];
  var right = grid[index(this.r+1,this.c)];
  var bottom = grid[index(this.r,this.c+1)];
  var left = grid[index(this.r-1,this.c)];
  
  if(top && !top.searched){
    neighbors.push(top);
  }
  if(right && !right.searched){
    neighbors.push(right);
  }
  if(bottom && !bottom.searched){
    neighbors.push(bottom);
  }
  if(left && !left.searched){
    neighbors.push(left);
  }
  
  if(neighbors.length > 0){
    return neighbors[floor(random(0,neighbors.length))];
  }else{
    return undefined;
  }
}