
var userTeam = document.getElementById('first-team'); // getting user team name
var  opponentTeam= document.getElementById('second-team'); // getting opponent team name 
var hideForm = document.getElementById('hide-form');
var hideTossDetails = document.getElementById('hide-toss-details')
var show = document.getElementById('show');
var tossArr = ['heads' , 'tails']; //toss array
var randmNumForToss; // creating random number for toss
var radio; // created a varaiable to save reference of radio buttons 
var tossResult = document.getElementById('toss-message'); // show the result of toss
var choose = document.getElementById('choose'); // shows choice of bat or field if the user team wins the toss 
var btn1 = document.getElementById('btn');
var choice = ['bat' , 'field']; // array for choosing bat or ball
var randmNumForChoice; // creating a random number to decide opponent decision randomly 
var decided; //  stores opponent decision created randomly
var compDecision = document.getElementById('comp-decision'); // shows the decision of computer  of bat or field
var userDecision = document.getElementById('user-decision'); // shows the decision of user of bat or field
var game = document.getElementById('game'); // score Board
var ballCount = 12;
var scoresArr = [0 , 1 , 2 ,3 , 4 ,6 , 'out'];
var randForScore; // generated random number stores in it
var generatedScore; // generated random score stores in it
var totalRuns= 0;
var wickets = 0;
var ballBtn = document.getElementById('ball-btn');
var runshow = document.getElementById('run-show');
var player;
var playersArr = ['player1' , 'player2' ,'player3' ,'player4' ,'player5'];
var target;
var totalBalls = 12;
var inningsBtn = document.getElementById('innings-btn');
// var targetEl = document.getElementById('target-el');
var teamName = document.getElementById('team-name');
var secondInnings = false;
var winner = document.getElementById('winner'); //shows the winning team name on dom
var firstInningTeam; //save the team name first on bat
var secondInningTeam;//save the team name second on bat
var playAgainBtn = document.getElementById("play-again"); // Btn For Play Again
var scoreEl = document.getElementById('score') //show score in scoreboard
var wicketEl = document.getElementById('wicket') //show wickets in scoreboard
var ballEl = document.getElementById('ball') //show remaning balls in scoreboard
var targetEl = document.getElementById('target') //show target in scoreboard

function toss(){
    hideForm.style.display = "none"
    // getting reference of radio buttons of heads and tails and checking which is mark and it's value 
    radio = document.querySelector('input[type="radio"]:checked').value;
    randmNumForToss = Math.floor(Math.random()*2);
    tossResult.style.display = "block"
    tossResult.innerHTML = ""
    compDecision.innerHTML = ""

    // if user won the toss
    if(tossArr[randmNumForToss] === radio){
        tossResult.innerHTML = userTeam.value +  " won The Toss"
        setTimeout(function (){
            choose.style.display = 'block'
            btn1.style.display = "block"
        },1000)
    }

    else{
        choose.style.display = 'none'
        randmNumForChoice = Math.floor(Math.random()*2)
        decided = choice[randmNumForChoice]
        tossResult.innerHTML = opponentTeam.value + " won The Toss"

        // shows the decison of computer after 1 sec
        setTimeout(function(){
            compDecision.innerHTML = opponentTeam.value + ' Decided to ' + decided + ' first';
        },1000)

        // shows the lets start button after 1.5 sec
        setTimeout(function(){
            btn1.style.display = "block"
        },1500)        
    }
return false
}

function gameStart(){
    hideTossDetails.style.display = "none"
    show.style.display = "block"
    playAgainBtn.style.display = "none" // play again button hide
    // if comp decides to bat
    if(decided === 'bat'){
        firstInningTeam = opponentTeam.value
        secondInningTeam = userTeam.value        
        teamName.innerHTML = firstInningTeam
        
    }

    // if comp decides to field
    else{
        firstInningTeam = userTeam.value;   
        secondInningTeam = opponentTeam.value     
        teamName.innerHTML = firstInningTeam
        
    }

    // if user won the toss
    if(tossArr[randmNumForToss] === radio){
        // getting reference of checked radio btn (bat or field)
    choosing = document.querySelectorAll('input[type="radio"]:checked')[1].value;
    userDecision.className = 'user-decision marg-top'

    // if user decides to bat
    if(choosing === "bat"){
        // userDecision.innerHTML = userTeam.value + " decided to bat first"
        firstInningTeam = userTeam.value;
        secondInningTeam = opponentTeam.value
        teamName.innerHTML = firstInningTeam        
    }

    // if user decides to field    
    else{
        // userDecision.innerHTML = userTeam.value + " decided to field first"
        firstInningTeam = opponentTeam.value
        secondInningTeam = userTeam.value
        teamName.innerHTML = firstInningTeam        
    }
}

    // getting player from array
    player = playersArr[0];

    // remove that player from array
    playersArr.splice(0,1);
}




function ball(){
    // when All Players Out
    if(playersArr.length === 0){
        ballBtn.style.display = "none"
    }
    // creating random number between 0 t0 7
    randForScore = Math.floor(Math.random()*7);

    // created runs by random number stores
    generatedScore = scoresArr[randForScore];        
    

    // 1 ball minus on every click
    totalBalls -= 1;

    // if any player out
    if(generatedScore === 'out'){
        wickets += 1
        runshow.innerHTML = player + ' is Out'
        player = playersArr[0];
        playersArr.splice(0,1) 
        
        
    }

    // if any player makes a dot ball
    else if(generatedScore === 0){
        runshow.innerHTML = player + ' makes a dot ball'
    }

    // if any player makes runs
    else{
        
        totalRuns += generatedScore;
        runshow.innerHTML = player + ' hits ' + generatedScore;
    }

    // updates scoreBoard
    scoreEl.innerHTML = "Runs = " + totalRuns;
    wicketEl.innerHTML = 'Wickets = ' + wickets;
    ballEl.innerHTML = 'Remaining balls = ' + totalBalls;

    // if target chased before balls becomes 0
    if(totalRuns > target){
        ballBtn.style.display = "none"
        runshow.innerHTML = ""
        // targetEl.style.display = "none"
        winner.innerHTML = secondInningTeam + " won by " + (playersArr.length + 1) + " wickets"
        playAgainBtn.style.display = "block" // play again button showed 
        playAgainBtn.className = "btn btn-success center-text"                
        
    }
    // end the game after balls becomes 0 or all players out
    if(totalBalls === 0){
        ballBtn.style.display = "none"

        //when second innings start
        if(secondInnings){
               
            // if match draw
            if((target - 1) === totalRuns){
                runshow.innerHTML = ""
                // targetEl.style.display = "none"                
                winner.innerHTML = "Match Draw"
                playAgainBtn.style.display = "block" // play again button showed 
                playAgainBtn.className = "btn btn-success center-text"                
            }
            // when target chased
            else if(totalRuns >= target){
                runshow.innerHTML = ""
                // targetEl.style.display = "none"                
                winner.innerHTML = secondInningTeam + " won by " + (playersArr.length + 1) + " wickets"
                playAgainBtn.style.display = "block" // play again button showed 
                playAgainBtn.className = "btn btn-success center-text"                
            }

            //if target not chased
            else if(totalRuns < target){
                // targetEl.style.display = "none"                
                runshow.innerHTML = ""    
                winningRuns = target - totalRuns - 1         
                winner.innerHTML = firstInningTeam + " won by " + winningRuns + " runs"
                playAgainBtn.style.display = "block" // play again button showed 
                playAgainBtn.className = "btn btn-success center-text"                
            }
            return false;
        }
        else{
            target = totalRuns + 1;
            targetEl.innerHTML = 'Target = ' + target;
        }
        //created a btn next innings
        var inningsNode = document.createElement('input');
        inningsNode.setAttribute('type', 'button');
        inningsNode.setAttribute('value', 'Next Innings');
        inningsNode.addEventListener('click', reset)
        inningsNode.className = "btn btn-success marg-top"
        inningsBtn.appendChild(inningsNode);   

    }
}

// function to start secong innings
function reset(){
    secondInnings = true;
    wickets = 0;
    totalBalls = 12;
    totalRuns = 0
    scoreEl.innerHTML = "Runs = " + totalRuns;
    wicketEl.innerHTML = 'Wickets = ' + wickets;
    ballEl.innerHTML = 'Remaining balls = ' + totalBalls;
    targetEl = "Target = " + target
    inningsBtn.style.display = 'none'
    ballBtn.style.display = "block"
    runshow.innerHTML = ""
    playersArr = ['player1' , 'player2' ,'player3' ,'player4' ,'player5'];
    player = playersArr[0];
    playersArr.splice(0,1);
    teamName.innerHTML = secondInningTeam
}



// function to reset the game
function playagain(){
    window.location.reload();
}

