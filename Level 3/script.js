var runSound = new Audio("run.mp3");
runSound.loop= true;

var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");
var wonS =new Audio("wons.mp3");

// idle

var dino = document.getElementById("dino");
var idleImgNum= 0;
var idleWorkId= 0;

function idle()
{

  idleImgNum++;
  if(idleImgNum==10)
  {
      idleImgNum=0;
  }

  dino.src="Idle__00" + idleImgNum + ".png";
}

function idleStart()
{
  idleWorkId= setInterval(idle,100);
}

//key event

function keyCheck(event)
{
  if(event.which== 13)
  {
      if(runWorkId==0)
      {

          clearInterval(idleWorkId);
      runWorkId=setInterval(run,90);
      runSound.play();
      moveBackWorkId=setInterval(moveBackGround,70);
      createBlockWorkId= setInterval(createBlock,80);
      createBlock_2WorkId=setInterval(createBlock_2,80);
      moveBlockWorkerId= setInterval(moveBlock,80);
      moveBlock_2WorkerId=setInterval(moveBlock_2,80);
      scoreWorkerId= setInterval(updateScore,100);

      }
  }

  if(event.which==32)
  {
      if(jumpWorkId==0)
      {
          clearInterval(runWorkId);
          runWorkId= -1;
          runSound.pause();

          clearInterval(idleWorkId);

          jumpWorkId=setInterval(jump,80);
          jumpSound.play();

      }
  }

  if(event.which==40)
  {
    slideWorkId=setInterval(slide,90);
    clearInterval(runWorkId);
    runWorkId=-1;
    runSound.pause();
    
    clearInterval(jumpWorkId);
    jumpWorkId= -1;
    jumpSound.pause();
  }
}

// run

var runImgNum = 0;
var runWorkId =0;


function run()
{
  runImgNum++;


  if(runImgNum==10)
  {
      runImgNum=0;
  }

  dino.src="Run__00" + runImgNum + ".png";
}

// slide

var slideImgNum = 0;
var slideWorkId =0;


function slide()
{
  slideImgNum++;


  if(slideImgNum==10)
  {
      slideImgNum=0;

      clearInterval(slideWorkId);
      runWorkId= setInterval(run,90);
      runSound.play();
  }

  dino.src="Slide__00" + slideImgNum + ".png";
}

// jump

var jumpImgNum= 0;
var jumpWorkId = 0;
var dinoMarginTop= 335;

function jump()
{
  jumpImgNum++;

  if(jumpImgNum<=5)
  {
    dinoMarginTop= dinoMarginTop-45;
    dino.style.marginTop=dinoMarginTop+"px";
  }
  
  else if(jumpImgNum>5)
  {
      dinoMarginTop= dinoMarginTop+45;
      dino.style.marginTop= dinoMarginTop+"px";
  }


  if (jumpImgNum==10)
  {
      jumpImgNum=0;

      clearInterval(jumpWorkId);
      runWorkId= setInterval(run,90);
      runSound.play();
      jumpWorkId= 0;

      if(moveBackWorkId== 0)
      {
          moveBackWorkId= setInterval(moveBackGround,75);
      }

      if(createBlockWorkId== 0)
      {
          createBlockWorkId= setInterval(createBlock,100);
      }

      if(moveBlockWorkerId== 0)
      {
          moveBlockWorkerId= setInterval(moveBlock,100);
      }
      if(scoreWorkerId==0)
      {
          scoreWorkerId= setInterval(updateScore,100);
      }
      if(createBlock_2WorkId==0)
      {
        createBlock_2WorkId= setInterval(createBlock_2,100);
      }
      if(moveBlock_2WorkerId==0)
      {
        moveBlock_2WorkerId= setInterval(moveBlock_2,100);
      }

  }

  dino.src="Jump__00" + jumpImgNum + ".png";
}

// background move

var background= document.getElementById("background");
var backgroundX= 0;
var moveBackWorkId= 0;

function moveBackGround()
{

  backgroundX= backgroundX-20;
  background.style.backgroundPositionX= backgroundX+"px";

}

// create blocks

var blockMarginLeft = 500;
var createBlockWorkId= 0;
var blockId= 1;

function createBlock(){

  var block= document.createElement("div");

  block.className= "block";
  block.id="block"+ blockId;

  blockId++;

  blockMarginLeft=block_2MarginLeft+500;
  block.style.marginLeft= block_2MarginLeft+"px";
  block.style.marginLeft= blockMarginLeft+"px";

  document.getElementById("background").appendChild(block);

}

// create second blocks

var block_2MarginLeft = 1000;
var createBlock_2WorkId= 0;
var block_2Id= 1;

function createBlock_2(){

  var block_2= document.createElement("div");

  block_2.className= "block_2";
  block_2.id="block_2"+ block_2Id;

  block_2Id++;

  block_2MarginLeft=block_2MarginLeft+1000;
  block_2.style.marginLeft= block_2MarginLeft+"px";

  document.getElementById("background").appendChild(block_2);

}

// move block
var moveBlockWorkerId=0;
function moveBlock()
{
  for(var i=1;i<=blockId;i++)
  {
     var currntBlock=  document.getElementById("block"+i);
     var currntBlockMarginLeft= currntBlock.style.marginLeft;
     var newBlock=  parseInt(currntBlockMarginLeft)-40;

     currntBlock.style.marginLeft= newBlock+ "px";

     //alert(newBlock)
     //52-(-108)
     if(newBlock< 52 & newBlock> -108)
     {

     // alert(dinoMarginTop);
     //320
     if(dinoMarginTop>320)
     {
      deadWorkerId=setInterval(dead,100);
      deadSound.play();

      clearInterval(runWorkId);
      runSound.pause();

      clearInterval(jumpWorkId);
      jumpWorkId=-1;

      clearInterval(moveBackWorkId);
      clearInterval(scoreWorkerId);
      clearInterval(createBlockWorkId);
      clearInterval(moveBlockWorkerId);

     }
      
     }

  }
}


// movec second block
var moveBlock_2WorkerId=0;
function moveBlock_2()
{
  for(var i=1;i<=block_2Id;i++)
  {
     var currntBlock=  document.getElementById("block_2"+i);
     var currntBlockMarginLeft= currntBlock.style.marginLeft;
     var newBlock=  parseInt(currntBlockMarginLeft)-40;

     currntBlock.style.marginLeft= newBlock+ "px";

     //alert(newBlock)
     //52-(-108)
     if(newBlock< 52 & newBlock> -108)
     {

     // alert(dinoMarginTop);
     //320
     if(dinoMarginTop>320)
     {
      deadWorkerId=setInterval(dead,100);
      deadSound.play();

      clearInterval(runWorkId);
      runSound.pause();

      clearInterval(jumpWorkId);
      jumpWorkId=-1;

      clearInterval(moveBackWorkId);
      clearInterval(scoreWorkerId);
      clearInterval(createBlockWorkId);
      clearInterval(moveBlockWorkerId);
      clearInterval(createBlock_2WorkId);
      clearInterval(moveBlock_2WorkerId);
      clearInterval(slideWorkId);
      slideWorkId=-1;
     }
      
     }

  }
}

//score

var scoreId = document.getElementById("score");
var newScore = 0;
var scoreWorkerId= 0;

function updateScore()
{
newScore++;

scoreId.innerHTML= newScore;

   if(newScore==100)
   {
    document.getElementById("win").style.visibility= "visible";

    wonS.play();
    clearInterval(runWorkId);
    runSound.pause();

    clearInterval(jumpWorkId);
    jumpWorkId=-1;

    clearInterval(moveBackWorkId);
    clearInterval(scoreWorkerId);
    clearInterval(createBlockWorkId);
    clearInterval(moveBlockWorkerId);
    clearInterval(createBlock_2WorkId);
      clearInterval(moveBlock_2WorkerId);
      clearInterval(slideWorkId);
      slideWorkId=-1;

   
   }
   
}

//dead


var deadImageNumber=0;
var deadWorkerId= 0;

function dead()
{
deadImageNumber++;
if(deadImageNumber==10)
{
  deadImageNumber= 9;
  dino.style.marginTop= "335px";

  document.getElementById("endScreen").style.visibility= "visible";
  document.getElementById("endScore").innerHTML = newScore;
}

dino.src= "Dead__00"+ deadImageNumber + ".png";
}

//reload

function reload()
{
  location.reload();
}

