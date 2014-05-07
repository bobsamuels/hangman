hangmanModule.service("hangmanService", function($http, $q) {
    var hangmanData;

    var svc = this;

    function initData(){
        hangmanData = {chosenWord:"", allowedGuesses:10, selectedLetters:[], gameError:"", hasWon:false};
    }

    this.startGame = function() {
        initData();
        var result = $q.defer();
        $http.get("/randomWord")
            .success(function (data) {
                hangmanData.chosenWord = data.replace(/"/g, "");
                return result.resolve();
            })
            .error(function (err) {
                hangmanData.gameError = err;
                return result.reject(err);
            });

        return result.promise;
    };

    this.getGameError = function(){
        return hangmanData.gameError;
    }

    this.getChosenWord = function(){
        return hangmanData.chosenWord;
    }

    this.getSelectedLetters = function(){
        return hangmanData.selectedLetters;
    }

    this.recordGuess = function(letter){
        if(hangmanData.selectedLetters.indexOf(letter.toUpperCase()) < 0)
        {
            hangmanData.selectedLetters.push(letter.toUpperCase());
            return true;
        }
        return false;
    }

    this.hasMoreGuesses = function(){
        return hangmanData.allowedGuesses > hangmanData.selectedLetters.length;
    }

    this.numberOfRemainingGuesses = function(){
        return hangmanData.allowedGuesses - hangmanData.selectedLetters.length;
    }

    this.checkWord = function(answer){
        hangmanData.hasWon = (hangmanData.chosenWord.toUpperCase() === answer.toUpperCase());
    }

    this.getDisplayWord = function(){
        var theWord = "";
        angular.forEach(hangmanData.chosenWord.toUpperCase(), function(value, key){
            if(hangmanData.selectedLetters.indexOf(value.toUpperCase()) > -1)
            {
                theWord += ' ' + value + ' ';
            }
            else
            {
                theWord += " _ ";
            }
        });

        if(theWord.indexOf("_") < 0){
            hangmanData.hasWon = true;
        }

        return theWord;
    }

    this.gameWon = function(){
        return hangmanData.hasWon;
    }

});
