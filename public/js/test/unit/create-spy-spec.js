describe("Simple Create Spy tests", function(){
    var MathObj = function(){
        var progressMsg = "";

        this.reportProgress = function(){
            return this.progressMsg;
        }

        this.addFuzzyNumbers = function(firstNum, secondNum){
            var fuzz = 0.1;
            this.progressMsg = this.recordProgress();
            return (fuzz * firstNum + fuzz * secondNum);
        };

        this.recordProgress = function(){
            return "I'm doing stuff";
        }
    };

    beforeEach(function(){
        var self = this;
       self.mathObj = new MathObj();
    });

    it("Test fuzzy math alone", function(){
        var answer = this.mathObj.addFuzzyNumbers(10, 20);
        expect(answer).toBe(3);
    });

    describe("create spy", function(){
        it("Spy on fuzzy math", function(){
            this.mathObj.recordProgress = jasmine.createSpy("reportProgress-spy");
            this.mathObj.addFuzzyNumbers(10, 20);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
        });

        it("Spy on fuzzy math - fake return val", function(){
            this.mathObj.recordProgress = jasmine.createSpy("recordProgress-spy").and.returnValue("Hey, I'm a spy... I don't do stuff.");
            this.mathObj.addFuzzyNumbers(10, 20);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress()).toBe("Hey, I'm a spy... I don't do stuff.");
        });

        it("Spy on fuzzy math - fake function", function(){
            this.mathObj.recordProgress = jasmine.createSpy("recordProgress-spy").and.callFake(function(){
                console.log("Hello world from the spy!");
                return "Shaken, not stirred.";
            });
            this.mathObj.addFuzzyNumbers(10, 20);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress()).toBe("Shaken, not stirred.");
        });

        it("Create the entire object...", function(){
            this.mathObj = jasmine.createSpyObj('Math-spy', ['addFuzzyNumbers', 'reportProgress', 'newMethod']);
            this.mathObj.reportProgress.and.returnValue('Yep, this is from the spy');
            this.mathObj.newMethod.and.returnValue("I'm totally new....like the driven snow.");
            this.mathObj.addFuzzyNumbers.and.callFake(function(firstNum, secondNum){
                this.reportProgress();
                this.newMethod();
                return firstNum + secondNum;
            });

            var answer = this.mathObj.addFuzzyNumbers(10,20);
            expect(this.mathObj.reportProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress()).toBe('Yep, this is from the spy');
            expect(this.mathObj.newMethod).toHaveBeenCalled();
            expect(this.mathObj.newMethod()).toBe("I'm totally new....like the driven snow.");
            expect(answer).toBe(30);
        });
    });

    describe("SpyOn", function(){
        it("Spy on it", function(){
            spyOn(this.mathObj, 'recordProgress');
            this.mathObj.addFuzzyNumbers(20,30);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
        });

        it("Spy on it, return new val", function(){
            spyOn(this.mathObj, 'recordProgress');
            spyOn(this.mathObj, 'reportProgress').and.returnValue('New and improved');
            this.mathObj.addFuzzyNumbers(20,30);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress()).toBe('New and improved');
        });

        it("Spy on it, call fake", function(){
            spyOn(this.mathObj, 'recordProgress');
            spyOn(this.mathObj, 'reportProgress').and.returnValue('New and improved');
            spyOn(this.mathObj, 'addFuzzyNumbers').and.callFake(function(one, two){
                this.recordProgress();
                this.reportProgress();
                return one + two;
            });
            var answer = this.mathObj.addFuzzyNumbers(20,30);
            expect(this.mathObj.recordProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress).toHaveBeenCalled();
            expect(this.mathObj.reportProgress()).toBe('New and improved');
            expect(answer).toBe(50);
        });


    });



})