describe("game", function() {

    beforeEach(function () {
        var self = this;
        module("hangmanApp");

        inject(function ($rootScope, $controller, $location, hangmanService) {
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.$location = $location;
            self.hangmanService = hangmanService;
        });

        self.$controller("GameCtrl", {$scope: this.$scope});
    });

    describe("sanity checks", function(){
        it("controller exists", function(){
            expect(this.$controller).not.toBeUndefined();
        });
    });
});
/*

 //TESTS TO ADD
 resetGame
 addGuess
 gameOver
 showWordGuess
 submitAnswer

 */