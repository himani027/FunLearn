function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// questions
var questions = [
    new Question("Where is the correct place to insert a JavaScript?", ["Body", "Both body and head","Head", "Anywhere"], "Both body and head"),
    new Question("How do you write 'Hello' in an alert box?", ["alert('Hello')", "msgBox('Hello')", "msg('Hello')", "alertBox('Hello')"], "alert('Hello')"),
    new Question("How to write an IF statement for executing some code if 'i' is NOT equal to 5?", ["if (i<>5)", "if i=! 5 then","if i<>5", "if(i!=5)"], "if(i!=5)"),
    new Question("How can you add a multiline comment in a JavaScript?", ["'Comment", "/*Comment*/", "//Comment", "#Comment"], "/*Comment*/"),
    new Question("How do you round the number 7.25, to the nearest integer?", ["round(7.25)", "rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25))"], "Math.round(7.25)")
];

// create quiz
var quiz = new Quiz(questions);

// display 
populate();