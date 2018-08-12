---
layout: post
title:  "My first JavaScript"
date:   2017-12-04 21:15:05 +0000
image: /assets/images/startup.jpg

---
After watching [The Coding Train](https://www.youtube.com/user/shiffman) on YouTube for a few weeks, I was completely fascinated with P5JS capabilities and simplicity! Here is my first attempt.

As this was my first time using the P5JS editor and JavaScript, I had to start small. To learn I made a little programming excersice I had to complete. Create a grid of squares, and have 1 special square that can move around the grid.

I solved this by making a 2D array. I didn't use the official P5JS 2D array, but rather made an array, of arrays. I then keep track of where the "player" is by setting the value of a single point in the array (e.g array[3][4] == 1) equal to 1.

Here is the code:

{% highlight ruby %}
var cols = 10;
var rows = 10;

var y = 0;
var x = 0;
var y1 = 0;
var x1 = 0;

var grid;

var currPos;

function setup() {
  createCanvas(600, 300);

  grid = create2DArray();
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }
  grid[0][3] = 1;
}

function create2DArray() {
  var arr = new Array(cols);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function drawEachSquare(){
  fill(255);
  stroke(0);
  
  x = 0;
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      if(grid[i][j] != 0){
        fill(0);
      } else{
        fill(255);
      }
      rect(x,y,10,10);
      y += 10;
    }
    y = 0;
    x += 10;
  }
}

function findCurrPos(){
  
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      if(grid[i][j] == 1){
        return[i,j];
      }
    }
  }
  return[0,0];
  
}

function move(x1,y1){
  currPos = findCurrPos();
  
  grid[currPos[0]][currPos[1]] = 0;
  
  if(currPos[0] + x1 <= -1 || currPos[0] + x1 >= cols || currPos[1] + y1 <= -1 || currPos[1] + y1 >= rows){
    print("wall");
  }
  else{
    currPos[0] = currPos[0] + x1;
    currPos[1] = currPos[1] + y1;
  }
  
  grid[currPos[0]][currPos[1]] = 1;
 
  
}

function keyPressed(){
  if(keyCode == LEFT_ARROW){
    move(-1,0);
  } else if(keyCode == RIGHT_ARROW){
    move(1,0);
  } else if(keyCode == DOWN_ARROW){
    move(0,1);;
  } else if(keyCode == UP_ARROW){
    move(0,-1);
  }
}

function draw() {
  background(0);
  
  drawEachSquare();
}
{% endhighlight %}