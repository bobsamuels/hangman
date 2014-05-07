'use strict';

hangmanModule.controller('GameCtrl', function ($scope, $location, hangmanService) {
    $scope.initialized = false;
    $scope.guess = {text:""};
    $scope.answer = {submittedAnswer:false, text:"", correct:false};


    function startGame(){
        hangmanService.startGame().then(function(){
            $scope.initialized = true;
        }, function(err){
            $location.path("/error");
        });
    }

    startGame();

    $scope.resetGame = function(){
        $scope.initialized = false;
        $scope.guess = {text:""};
        $scope.answer = {submittedAnswer:false, text:"", correct:false};
        startGame();
    }

    $scope.addGuess = function(){
        console.log($scope.guess);
        console.log($scope);
        if(!hangmanService.recordGuess($scope.guess.text))
        {
            $scope.letterErr = "You already guessed that letter";
        }
        else
        {
            $scope.letterErr = "";
        }

        $scope.guess = {text:""};
    }

    $scope.hasMoreGuesses = function(){
        return hangmanService.hasMoreGuesses();
    }

    $scope.numberOfGuessesRemaning =  function(){
        return hangmanService.numberOfRemainingGuesses();
    }

    $scope.gameOver = function(){
        return hangmanService.gameWon() || $scope.answer.submittedAnswer;
    }

    $scope.submitAnswer = function(){
        hangmanService.checkWord($scope.answer.text);
        $scope.answer.submittedAnswer = true;
    }

    $scope.chosenLetters = function(){
        return hangmanService.getSelectedLetters();
    }

    $scope.chosenWord = function(){
        return hangmanService.getChosenWord();
    }

    $scope.gameWon = function(){
        return hangmanService.gameWon();
    }

    $scope.showWordGuess = function(){
        return !hangmanService.hasMoreGuesses() && !$scope.answer.submittedAnswer;
    }

    $scope.displayWord = function(){
        if($scope.initialized)
        {
            return hangmanService.getDisplayWord();
        }
        else
        {
            return "Initializing....please wait";
        }
    }

});