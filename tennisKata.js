/*
    Name everything
    No mutable state
    Exhaustive conditionals
    Do not use intermediate variables
    Expressions not statements
    No Explicit recursion
    Generic building blocks
    Side effects at the boundaries
    Infinite Sequences
    One argument functions
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TENNIS KATA> '
});

function askForNextPointWinner(currentScore){
    rl.question(
      'Who is the next point winner?\n',
      computeNewScoreForCurrentScore(currentScore)
    );
}

function computeNewScoreForCurrentScore(currentScore) {
  return function computeNewScoreForPointWinner(pointWinner){
    return printScore(
      addPoint({currentScore, pointWinner})
    )
  }
}

function addPoint({currentScore, pointWinner}){
  if(pointWinner === 'A'){
    return {...currentScore, A: currentScore.A + 1}
  }
  else {
    return {...currentScore, B: currentScore.B + 1}
  }
}

function printScore(currentScore){
  // A game is won by the first player to have won at least four points in total 
  //and at least two points more than the opponent.
  if(
    (currentScore.A >= 4) &&
    (currentScore.A >= currentScore.B + 2)
  ){
    return "Player A wins"
  }
  else if(
    (currentScore.B >= 4) &&
    (currentScore.B >= currentScore.A + 2)
  ){
    return "Player B wins"
  }
  // The running score of each game is described in a manner peculiar to tennis: 
  // scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively
  else if(currentScore.A < 4 && currentScore.B < 4){
    return printTwoPlayerScores(printPlayerScoreUnder4(currentScore.A))(printPlayerScoreUnder4(currentScore.B))
  }

}

function printTwoPlayerScores(firstPlayerScore){
  return function (secondPlayerScore){
    return firstPlayerScore + " - " + secondPlayerScore
  }
}

function printPlayerScoreUnder4(playerPointCount){
  if(playerPointCount === 0){
    return "love"
  }
  else if(playerPointCount === 1){
    return "fifteen"
  }
  else if(playerPointCount === 2){
    return "thirty"
  }
  else if(playerPointCount === 3){
    return "forty"
  }
}

