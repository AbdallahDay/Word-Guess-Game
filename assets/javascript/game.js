var game = {
    wins: 0,
    guesses: 12,
    gamesList: ["GTA San Andreas", "Pac Man", "Pokemon", "Sonic the Hedgehog", "Super Mario Bros", "Tetris"],
    words: [],
    currentWord: "",
    currentGuessPhrase: "",
    incorrectGuesses: "",

    Initialize: function(isReload) {
        if (isReload) {
            //repopulate words array, reset win count, re-initialize game
            this.words = this.gamesList.slice(0);   //copy values instead of referencing
            this.wins = 0;
        }

        console.log("gamesList: " + this.gamesList);
        console.log("words: " + this.words);

        this.guesses = 12;  //reset guess count
        this.currentGuessPhrase = "";
        this.incorrectGuesses = "";

        $("#incorrect-guesses").text(this.incorrectGuesses);
        
        if (this.words.length > 0) {
            //Choose word, then remove it from array so it wont be chosen again
            this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
            this.words.splice(this.words.indexOf(this.currentWord), 1);

            //update display
            $(".wins-number").text(this.wins);
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
            $("#wins-losses").text(this.wins);

            $("#MainContainer").hide();
            $("#HiddenContainer").show();
        }
    },

    UserInput: function(letter) {
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
                $("#wins").text(this.wins);

                //next phrase
                this.Initialize(false);
            }
        } else if (!this.incorrectGuesses.toLowerCase().includes(letter.toLowerCase())) {
            //first, make sure it's not already recorded
            //then, decrement number of remaining guesses
            this.guesses--;
            $("#guesses-left").text(this.guesses);

            this.incorrectGuesses += letter.toUpperCase();
            $("#incorrect-guesses").text(this.incorrectGuesses);

            if (this.guesses === 0) {
                //LOSS, next phrase
                this.Initialize(false);
            }
        }
    }
};

$(document).ready(function() {
    game.Initialize(true);

    $("#reload-btn").on("click", function() {
        game.Initialize(true);
        
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