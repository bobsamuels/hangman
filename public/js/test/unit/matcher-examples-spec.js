describe("Simple matcher example tests", function(){
    var walter = {};
    var jessie = {};

    var getWalter = function(){
        return walter;
    }

    var isWalterACriminal = function(){
        return walter.occupations.indexOf("Meth Cook") > 0;
    }

    beforeEach(function(){
        walter = {name:"Walter White", nickname:"Heizenburg", occupations:["teacher", "Meth Cook"], netWorth:5000000.32, numberOfKids:2};
        jessie = {name:"Jessie Pinkman", nickname:"The kid", occupations:["dropout", "punk", "drug dealer", "Meth Cook"], netWorth:4000000, numberOfKids:0};
    });

    it("toEqual vs toBe test", function(){
        var _personObj = {name:"Walter White", nickname:"Heizenburg", occupations:["teacher", "Meth Cook"], netWorth:5000000.32, numberOfKids:2};
        expect(walter).toBe(getWalter());
        expect(walter).toEqual(getWalter());

        expect(walter).toEqual(_personObj);
        expect(walter).not.toBe(_personObj);
    });

    it("toContain test", function(){
        expect(getWalter().occupations).toContain("teacher");
        //Walter has a change of heart....
        getWalter().occupations.pop();
        expect(getWalter().occupations).not.toContain("Meth Cook");
    });

    it("undefined test", function(){
        var emptyEmotions = null;

        expect(getWalter().emotions).toBeUndefined();

        getWalter().emotions = emptyEmotions;
        expect(getWalter().emotions).toBeNull();

    });

    it("less than test", function(){
        expect(getWalter().netWorth).toBeGreaterThan(jessie.netWorth);
    });

    it("close to test", function(){
        expect(getWalter().netWorth).toBeCloseTo(5000000, 0);
        expect(getWalter().netWorth).not.toBeCloseTo(5000000, 1);
        expect(getWalter().netWorth).toBeCloseTo(5000000.3, 1);
    });

    it("falsey test", function(){
        //Boolean
        expect(isWalterACriminal()).toBeTruthy();
        getWalter().occupations.pop();
        expect(isWalterACriminal()).toBeFalsy();

        // 0 --> falsy, 1--> truthy
        expect(getWalter().numberOfKids).toBeTruthy();
        expect(jessie.numberOfKids).toBeFalsy();

        //empty --> falsy, not empty -- truthy
        getWalter().emotions = '';
        expect(getWalter().emotions).toBeFalsy();
        jessie.emotions = ["sadness", "anger"];
        expect(jessie.emotions).toBeTruthy();
    })

});