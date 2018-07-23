var game = {
    wins: 0,
    guesses: 12,
    words: ["GTA San Andreas", "Pac Man", "Pokemon", "Sonic the Hedgehog", "Super Mario Bros", "Tetris"],
    currentWord: "",
    currentGuessPhrase: "",
    incorrectGuesses: "",

    Initialize: function() {
        //used to start/restart game

        //reset guess count
        this.guesses = 12;
        this.currentGuessPhrase = "";
        this.incorrectGuesses = "";

        $("#incorrect-guesses").text(this.incorrectGuesses);
        
        if (this.words.length > 0) {
            //Choose word, then remove it from array so it wont be chosen again
            this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
            this.words.splice(this.words.indexOf(this.currentWord), 1);

            console.log(this.currentWord);//DEBUG

            //update display
            $("#wins-number").text(this.wins);
            $("#guesses-left").text(this.guesses);

            //display correct number of underscores and spaces for currentWord
            for (var i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i] === ' ') {
                    this.currentGuessPhrase += " ";
                } else {
                    this.currentGuessPhrase += "_";
                }
            }

            $("#guess-phrase").text(this.currentGuessPhrase);
        } else {
            //no more words to choose from
            var newP = $(`<p>Congratulations! You have completed the game with ${this.wins} wins!</p>`);
            var reloadBtn = $('<button id="reload-btn">Reload</button>');

            $("#HiddenContainer").html(newP);
            $("#HiddenContainer").append(reloadBtn);

            $("#MainContainer").hide();
            $("#HiddenContainer").show();
        }
    },

    UserInput: function(letter) {
        console.log("input: " + letter);
        if (this.currentWord.toLowerCase().includes(letter.toLowerCase())) {
        //guessed correctly, update currentGuessPhrase with letter

            //replace matching indices of guessed letter in currentGuessPhrase
            for (var i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i].toLowerCase() === letter.toLowerCase()) {
                    this.currentGuessPhrase = this.currentGuessPhrase.substr(0, i) + this.currentWord[i] + this.currentGuessPhrase.substr(i + 1);
                }
            }

            //update display
            $("#guess-phrase").text(this.currentGuessPhrase);

            if (this.currentGuessPhrase.toLowerCase() === this.currentWord.toLowerCase()) {
                //WIN
                this.wins++;
                $("#wins-number").text(this.wins);

                //restart game
                this.Initialize();
            }
        } else if (!this.incorrectGuesses.toLowerCase().includes(letter.toLowerCase())) {
            //first, make sure it's not already recorded
            //then, decrement number of remaining guesses
            this.guesses--;
            $("#guesses-left").text(this.guesses);

            console.log("remaining guesses: " + this.guesses);//DEBUG

            this.incorrectGuesses += letter.toUpperCase();
            $("#incorrect-guesses").text(this.incorrectGuesses);
        }
    }
};

$(document).ready(function() {
    game.Initialize();

    $("#reload-btn").on("click", function() {
        game.Initialize();
        
        $("#HiddenContainer").hide();
        $("#MainContainer").show();
    });

    $(document).on("keyup", function(event) {
        var key = event.key.toLowerCase();

        var alpha = "abcdefghijklmnopqrstuvwxyz";

        if (alpha.includes(key)) {
            game.UserInput(key);
        }
    });
});