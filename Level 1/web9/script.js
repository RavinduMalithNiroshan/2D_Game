  var runSound = new Audio("run.mp3");
runSound.loop= true;

  var jumpSound = new Audio("jump.mp3");
  var deadSound = new Audio("dead.mp3");
  
  
  
  
  
  //key event

  function keyCheck(event){

    //enter key

  if(event.which== 13)
  {
    if(runWorkerId==0)
    {

    runWorkerId= setInterval(run,90);
    runSound.play();
    moveBackGroundWorkerId= setInterval(moveBackGround,100);
    createBlockWorkerId= setInterval(createBlock,100);
    moveBlockWorkerId= setInterval(moveBlock,100);
    scoreWorkerId= setInterval(updateScore,100);

    }
    
  }

  //space key

  if(event.which== 32)
  {
    if(jumpWorkerId==0)
    {
        clearInterval(runWorkerId);
        runWorkerId= -1;
        runSound.pause();

    jumpWorkerId= setInterval(jump,90);
    jumpSound.play();
    

    }

  }
}

var player = document.getElementById("player");
var runWorkerId=0;
var runImageNumber = 1;

function run()
{
    runImageNumber++;
    if(runImageNumber==9)
    {
        runImageNumber=1;
    }

    player.src="Run ("+ runImageNumber +").png";

    
}

var jumpWorkerId=0;
var jumpImageNumber=1;
var boyMarginTop=390;

function jump(){
    jumpImageNumber++;

   if(jumpImageNumber<=7)
   {
      boyMarginTop= boyMarginTop-25;
      player.style.marginTop=boyMarginTop+"px";
   }
   else if( jumpImageNumber>7)
   {
      boyMarginTop= boyMarginTop+25;
      player.style.marginTop=boyMarginTop+"px";
   }


    if(jumpImageNumber==13)
    {
        jumpImageNumber=1;

        clearInterval(jumpWorkerId);
        runWorkerId= setInterval(run,90);
        runSound.play();

        jumpWorkerId =0;

        if(moveBackGroundWorkerId== 0)
        {
            moveBackGroundWorkerId= setInterval(moveBackGround,100);

        }
        if(createBlockWorkerId==0)
        {
            createBlockWorkerId= setInterval(createBlock,100);

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

    player.src="Jump (" +jumpImageNumber +").png";
}

//background move

var backGroundId= document.getElementById("background");
var backGroundX= 0;
var moveBackGroundWorkerId=0;

function moveBackGround(){

    backGroundX=backGroundX-20;
    backGroundId.style.backgroundPositionX= backGroundX+"px";
}

//create block
var blockMarginLeft= 300;
var createBlockWorkerId= 0;
var blockId = 1;

function createBlock()
{
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
       var newBlock=  parseInt(currntBlockMarginLeft)-30;

       currntBlock.style.marginLeft= newBlock+ "px";

      // alert(newBlock);
       //143-43

       if(newBlock < 143 & newBlock> 43)
       {
       
        // alert(boyMarginTop);
         //310

         if(boyMarginTop> 310)
         {
          deadWorkerId=setInterval(dead,100);
          deadSound.play();

          clearInterval(runWorkerId);
          runSound.pause();

          clearInterval(jumpWorkerId);
           jumpWorkerId=-1;

          clearInterval(moveBackGroundWorkerId);
          clearInterval(scoreWorkerId);
          clearInterval(createBlockWorkerId);
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

}

//dead

var deadImageNumber=1;
var deadWorkerId= 0;

function dead()
{
  deadImageNumber++;
  if(deadImageNumber==11)
  {
    deadImageNumber= 10;
    player.style.marginTop= "390px";

    document.getElementById("endScreen").style.visibility= "visible";
    document.getElementById("endScore").innerHTML = newScore;
  }

  player.src= "Dead (" + deadImageNumber +").png";
}

//reload

function reload()
{
  location.reload();
}