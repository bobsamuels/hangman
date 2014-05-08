describe("gameService", function(){
    beforeEach(function(){
        var self = this;
        module("hangmanApp");

        inject(function($rootScope, $q, $httpBackend, hangmanService){
            self.$rootScope = $rootScope;
            self.$q = $q;
            self.$httpBackend = $httpBackend;
            self.hangmanService = hangmanService;
        });
    });

    describe("sanity checks", function(){
       it("service exists", function(){
           expect(this.hangmanService).not.toBeUndefined();
       });
    });

    describe("startGame", function(){
        it("test startGame success without quotes", function(){
            var spellingWord = "Fantastic";
            this.$httpBackend.whenGET('/randomWord').respond(200, spellingWord);
            this.hangmanService.startGame();
            this.$httpBackend.flush();
            expect(this.hangmanService.getChosenWord()).toBe(spellingWord);
            expect(this.hangmanService.getGameError()).toBeFalsy();
        });

        it("test startGame success with quotes", function(){
            var spellingWord = "Attrocious";
            this.$httpBackend.whenGET('/randomWord').respond(200, "\"" + spellingWord+  "\"");
            this.hangmanService.startGame();
            this.$httpBackend.flush();
            expect(this.hangmanService.getChosenWord()).toBe(spellingWord);
            expect(this.hangmanService.getGameError()).toBeFalsy();
        });

        it("test startGame failure", function(){
            var spellingWord = "\"Attrocious\"";
            this.$httpBackend.whenGET('/randomWord').respond(500, "Something bad happened");
            this.hangmanService.startGame();
            this.$httpBackend.flush();
            expect(this.hangmanService.getGameError()).toBe("Something bad happened");
            expect(this.hangmanService.getChosenWord()).not.toBe(spellingWord);
        });

    });

    describe("recordGuess", function(){

    });

    describe("hasMoreGuesses", function(){

    });

    describe("numberOfRemainingGuesses", function(){

    });

    describe("getDisplayedWord", function(){

    });
});