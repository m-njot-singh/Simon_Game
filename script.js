var randomColorArr=["red","green","yellow","blue"];
var gamePattern=[];
var userClickedColor=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        newsequence();
        started=true;
    }
})

function newsequence(){
    userClickedColor=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNum=Math.floor(Math.random()*4);
    var randomChosencolor=randomColorArr[randomNum];
    gamePattern.push(randomChosencolor);
    $("#"+randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor);

}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedColor.push(userChosenColor);
    playSound(userChosenColor);
    AnimatePress(userChosenColor);

    checkAnswer(userClickedColor.length-1 );
})

function AnimatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },200);
}

function checkAnswer(currentLength){
    if(gamePattern[currentLength]===userClickedColor[currentLength]){
        if(gamePattern.length===userClickedColor.length){
            setTimeout(function(){
                newsequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game-Over!!! Press Any Key To Restart!");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}