describe("game", function() {

    beforeEach(function () {
        var self = this;
        module("hangmanApp");

        inject(function ($rootScope, $controller, $location, $q, $httpBackend, hangmanService) {
            self.$rootScope = $rootScope;
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.$location = $location;
            self.$q = $q;
            self.$httpBackend = $httpBackend;
            self.hangmanService = hangmanService;
        });

        self.$controller("GameCtrl", {$scope: this.$scope});
        self.$httpBackend.whenGET('/randomWord').respond(200, {});
    });

    describe("sanity checks", function(){
        it("controller exists", function(){
            expect(this.$controller).not.toBeUndefined();
        });
    });

    describe("resetGame", function(){
        it("resetGame test", function(){
            var startGameDeferred = this.$q.defer();
            var guess = {text:""};
            var answer = {submittedAnswer:false, text:"", correct:false};

            //Mock out startGame to return deferred from above
            spyOn(this.hangmanService, 'startGame').and.returnValue(startGameDeferred.promise);
            //Call reset game
            this.$scope.resetGame();

            expect(this.$scope.initialized).toBeFalsy();
            expect(this.hangmanService.startGame).toHaveBeenCalled();
            expect(this.$scope.guess).toEqual(guess);
            expect(this.$scope.answer).toEqual(answer);

            //triggers the 'then' in startGame
            startGameDeferred.resolve();
            this.$rootScope.$apply();

            expect(this.$scope.initialized).toBeTruthy();
        });
    });

    describe("addGuess", function(){

    });

    describe("gameOver", function(){

    });

    describe("showWordGuess", function(){

    });

    describe("submitAnswer", function(){

    });
});