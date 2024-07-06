var runSound = new Audio("run.mp3");
runSound.loop= true;

var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");
var wonS =new Audio("wons.mp3");


// idle

var dino = document.getElementById("dino");
var idleImgNum= 1;
var idleWorkId= 0;

function idle()
{

  idleImgNum++;
  if(idleImgNum==11)
  {
      idleImgNum=1;
  }

  dino.src="Idle (" + idleImgNum +").png";
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
      moveBlockWorkerId= setInterval(moveBlock,80);
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

}

// run

var runImgNum = 1;
var runWorkId =0;


function run()
{
  runImgNum++;


  if(runImgNum==9)
  {
      runImgNum=1;
  }

  dino.src="Run (" + runImgNum + ").png";
}

// jump

var jumpImgNum= 1;
var jumpWorkId = 0;
var dinoMarginTop= 420;

function jump()
{
  jumpImgNum++;

  if(jumpImgNum<=6)
  {
    dinoMarginTop= dinoMarginTop-50;
    dino.style.marginTop=dinoMarginTop+"px";
  }
  
  else if(jumpImgNum>6)
  {
      dinoMarginTop= dinoMarginTop+50;
      dino.style.marginTop= dinoMarginTop+"px";
  }


  if (jumpImgNum==11)
  {
      jumpImgNum=1;

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

  }

  dino.src="Jump (" + jumpImgNum + ").png";
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

var blockMarginLeft = 300;
var createBlockWorkId= 0;
var blockId= 1;

function createBlock(){

  var block= document.createElement("div");

  block.className= "block";
  block.id="block"+ blockId;

  blockId++;

 var gap = Math.random()*(1000-400)+400;

  blockMarginLeft=blockMarginLeft+ gap;
  block.style.marginLeft= blockMarginLeft+"px";

  document.getElementById("background").appendChild(block);

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
     if(newBlock< 52 & newBlock> 130)
     {

     // alert(dinoMarginTop);
     //300
     if(dinoMarginTop>310)
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
   }
   
   
}

//dead


var deadImageNumber=1;
var deadWorkerId= 0;

function dead()
{
deadImageNumber++;
if(deadImageNumber==9)
{
  deadImageNumber= 8;
  dino.style.marginTop= "420px";

  document.getElementById("endScreen").style.visibility= "visible";
  document.getElementById("endScore").innerHTML = newScore;
}

dino.src= "Dead (" + deadImageNumber +").png";
}

//reload

function reload()
{
  location.reload();
}

