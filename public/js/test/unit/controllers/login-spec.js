describe("login", function(){

    beforeEach(function(){
        var self = this;
        module("hangmanApp");

        inject(function($rootScope, $controller, $location, $httpBackend) {
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.$location = $location;
            self.$httpBackend = $httpBackend;
        });

        self.$controller("LoginCtrl", {$scope: this.$scope});
    });

    describe("test login scenarios", function(){
        beforeEach(function(){
            spyOn(this.$location, 'path');
        });
        it("No username supplied, error returned", function(){
            var loginObj = {username:"", password:"secr3t"};
            this.$httpBackend.expectPOST("/login", loginObj).respond(400, 'Username and pwd required');
            this.$scope.loginCredentials = loginObj;
            this.$scope.login();
            this.$httpBackend.flush();
            expect(this.$scope.errMsg).toBe('Username and pwd required');
            expect(this.$scope.specialError).toBe("400 error returned");
            expect(this.$location.path).not.toHaveBeenCalled();
        });

        it("Wrong username supplied, error returned", function(){
            var loginObj = {username:"wrongName", password:"secr3t"};
            var msg = "We don't have that username and password combo.";
            this.$httpBackend.expectPOST("/login", loginObj).respond(402, msg);
            this.$scope.loginCredentials = loginObj;
            this.$scope.login();
            this.$httpBackend.flush();
            expect(this.$scope.errMsg).toBe(msg);
            expect(this.$scope.specialError).toBe("402 error returned");
            expect(this.$location.path).not.toHaveBeenCalled();
        });

        it("Successful login, location change", function(){
            var loginObj = {username:"open", password:"seseame"};
            this.$httpBackend.expectPOST("/login", loginObj).respond(200, "OK");
            this.$scope.loginCredentials = loginObj;
            this.$scope.login();
            this.$httpBackend.flush();
            expect(this.$scope.errMsg).toBeUndefined();
            expect(this.$scope.specialError).toBeUndefined();
            expect(this.$location.path).toHaveBeenCalledWith('/game');
        });

    });

})