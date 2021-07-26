var readlineSync = require('readline-sync');
var chalk = require('chalk');

var lightPurple = chalk.rgb(209, 92, 255);
var fireRed = chalk.rgb(230, 46, 53);

var score = 0;
var username;

var highscores = [
  {
    name: "Bhushan",
    score: 5
  },
  {
    name: "Sahil",
    score: 4
  },
  {
    name: "Meetkumar",
    score: 4
  },
  {
    name: "Vidit",
    score: 3
  }
];

var questions = [
    {
      question: "What is the name of tanjiro's sister? ",
      answer: "Nezuko",
      options: ["Mezuko","Nezuko","Nenuko","Mizuno"]
    }, {
      question: "Whats the name of the character wearing a boar's head? ",
      answer: "Inosuke",
      options: ["Zenitsu","Tanjiro","Inosuke","Giyuu"]
    }, {
      question: "What color is Tanjiro’s Nichirin blade? ",
      answer: "Black",
      options: ["Black","Red","Gray","Yellow"]
    }, {
      question: "What's the name of the mountain used for the Final Selection?",
      answer: "Fujikasane Mountain",
      options: ["Sagiri Mountain","Chōkai Mountain","Natagumo Mountain","Fujikasane Mountain"]
    }, {
      question: "Which flower can be used to make a poison fatal to demons? ",
      answer: "Wisteria",
      options: ["Wisteria","Chrysanthemum","Red Spider Lily","Plum Blossom"]
    }
  ];


function greetings(){
  username = readlineSync.question('What is your name? ');
  console.log("\n\nHello " + chalk.green(username) + " welcome to anime quiz \nHere I will ask questions about an famous anime named Demon Slayer. \nLets see how much you know.\n");
}

function play(question, answer, options) {

  for(let i =0 ; i<options.length ; i++){
    options[i] = lightPurple(options[i]);
  }

  console.log(fireRed(question));
  var userAnswer = readlineSync.keyInSelect(options,null,{guide:true,cancel:chalk.magenta("Exit quiz")});

  if(userAnswer === -1){
    return true;
  }

  //console.log(question);
  if (lightPurple(answer) === options[userAnswer]) {
    console.log(chalk.green("you are Right!"));
    score=score+1;
  }
  else {
    console.log(chalk.red("You are wrong."));
    console.log("Right answer is", answer);
  }
  //console.log("Score:", score);
  console.log('\n--------------------------\n');

  return false;

}

function playGame(){
  console.log("Press \'0\' in the answer anytime to exit\n\n")

  for (let i = 0; i < questions.length; i++) {
    var data = questions[i];
    var isExit = play(data.question, data.answer,data.options);
    if(isExit){
      break;
    }
  }
  console.log(chalk.white("Your score for the quiz is ") + score);
  console.log("quiz ended\n\n");
}

function displayHighScores(userScoreValue){

  let userScore = userScoreValue;
  let userHighscore = {
    name: chalk.green(username),
    score: userScore
  }
  for(let i=0 ; i < highscores.length ; i++){
  // console.log("tested" +i);
  if(score > highscores[i].score){  
    highscores.splice(i,0,userHighscore);
    break;
  }

  if(i == (highscores.length - 1)){
    highscores.push(userHighscore);

    // infinite loop was running due to this error
    // this was adding value and for loop was continuing
    break;
  }
}
  var highScoreObject = highscores.reduce((acc,{name,...x})=>{
    acc[name] = x;
    return acc;
  },{});
  console.table(highScoreObject);
}

greetings();
playGame();
displayHighScores(score);

console.log("Game ended");
