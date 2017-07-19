var inquirer = require("inquirer");
var flashCard = require("./clozeCard.js");
var questions = require("./questions.js");

var Q = [];
var categories = [];
var info = questions.category;
var count = 0;
var correct = 0;

// loops through info and grabs the category names for the prompt
for (var i = 0; i < info.length; i++){
	categories.push(info[i].name);
}


console.log("\n::::::::::::::::::::::::::::\n::       Flashcards       ::\n::::::::::::::::::::::::::::\n");

//------------------------------- category -----------------------------------------
//inquirer function to pick the category to study
function category(){
	inquirer.prompt([
	    {
	      	type: "list",
	      	message: "What category would you like to learn?",
	      	choices: categories,
	      	name: "category"
	    },

	]).then(function(response) {
		// a = the location in the array of the category name
		var a;
		//loops through to find which category was selected
		for (var i = 0; i < info.length; i++) if(info[i].name === response.category) a = i;
		//loops through creates the clozecard objects and stores them in an array
		for (var i = 0; i < 5; i++) Q[i] = new flashCard(info[a][i].Q, info[a][i].A);
		//starts the flashcards "quiz"
		question();
	});
		
}

//------------------------------- replay -------------------------------------------
//inquirer function to restart 
function replay(){
	inquirer.prompt([
	    {
	      	type: "confirm",
	      	message: "Would you like to play again?",
	      	defualt: true,
	      	name: "replay"
	    },

	]).then(function(response) {
		//if the response is yes reset count and correct to 0 and run category to start over
		if(response.replay){
			count = 0; correct = 0; category();
		}
	});
}

//------------------------------- question -----------------------------------------
//inquirer functino to run to flashcard "quiz"
function question(){
	//check to see if 5 quesions have been asked
	if(count < 5){
		//set up clozecard.partial by running clozedeletion
		Q[count].clozeDeletion();
		
		console.log("\nQuestion " + (count + 1))
		console.log("----------------");
		//ask the question using clozecard.partial
		inquirer.prompt([
		    {
		      	type: "input",
		      	message: Q[count].partial,	
		      	name: "answer"
		    },

		]).then(function(response) {
		//if the answer mataches the clozecard.cloze 
		if (response.answer.trim().toLowerCase() == Q[count].cloze){
			console.log("\nCorrect!\n" + Q[count].fullText);
			correct++
		} 
		//if the answer doesn't match the clozecard.cloze
		else console.log("\nIncorrect\n" + Q[count].fullText);
		//add 1 to count and rerun question
		count++ 
		question();			
		});
	}
	//if 5 questions have been asked show results of flashcard "quiz"
	else {
		console.log("\nResults\n----------------\nYou got " + correct + " correct.\n");
		//ask if they want to replay by running replay inquirer
		replay();
	}
}

//starts the app
category();