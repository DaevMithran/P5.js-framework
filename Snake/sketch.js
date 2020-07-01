var s;
var big=20;
var food;

function setup() {
  createCanvas(500, 500);
  s=new Snake();
  frameRate(10);
  foodloc();
}

function foodloc(){

  var column= floor(width/big) ;
  var row=floor(height/big);
  
  food=createVector(random(column),random(row));
  food.mult(big);
}

function draw() {
  background(51);
  s.update();
  s.show();
  s.over();
  
  if(s.eat(food))
   foodloc();
    
  fill(150,50,200);
  rect(food.x,food.y,20,20);
}

function keyPressed(){
  if(keyCode== UP_ARROW)
    s.dir(0,-1),s.str="u";
  else if(keyCode== DOWN_ARROW)
    s.dir(0,1),s.str="d";
  else if(keyCode== RIGHT_ARROW)
    s.dir(1,0),s.str="r";
  else if(keyCode== LEFT_ARROW)
    s.dir(-1,0),s.str="l";
  else if(keyCode== 32)
    loop();
  
}


function Snake(){
  
  this.x=0;
  this.y=0;
  this.xspeed=1;
  this.yspeed=0;
  this.len=0;
  this.tail=[];
  this.str;
  
  this.update=function(){
    for(var i=0;i<this.tail.length-1;i++)
    {this.tail[i]=this.tail[i+1];}
    this.tail[this.len-1]=createVector(this.x,this.y);
    
    this.x+=this.xspeed*big;
    this.y+=this.yspeed*big;
    
    if(this.x==width&&this.str=="r")
      this.x=0;
    else if(this.x<0 && this.str=="l")
      this.x=width;
    if(this.y==height&&this.str=="d")
      this.y=0;
    else if(this.y<0 && this.str=="u")
      this.y=height;
  }
  
  this.over=function(){
  for(var i=0;i<this.len;i++)
  {if(this.x==this.tail[i].x && this.y==this.tail[i].y)
  {this.len=0;
     this.tail=[];
    noLoop();}
  }
}
  
  this.show=function(){
   fill(05,150,205);
    for(var i=0;i<this.tail.length;i++)
    {
      rect(this.tail[i].x,this.tail[i].y,big,big);
  }
    fill(205,150,205);
    rect(this.x,this.y,big,big);
  }
  
  this.dir=function(x,y){
    this.xspeed=x;
    this.yspeed=y;
  }
  
  this.eat=function(res){
  var d=dist(this.x,this.y,res.x,res.y);
  if(d<20)
  {this.len++;
    return true;}
  else
    return false;
  }
  
}