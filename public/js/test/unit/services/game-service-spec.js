describe("gameService", function(){
    beforeEach(function(){
        var self = this;
        module("hangmanApp");

        inject(function($rootScope, $q, hangmanService){
            self.$rootScope = $rootScope;
            self.$q = $q;
            self.hangmanService = hangmanService;
        });
    });

    describe("sanity checks", function(){
       it("service exists", function(){
           expect(this.hangmanService).not.toBeUndefined();
       });
    });


    //Tests to add
    //startGame
    //recordGuess
    //hasMoreGuesses
    //numberOfRemainingGuesses
    //getDisplayedWord
});