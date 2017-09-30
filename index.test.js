const isPeselValid = require("pesel-check");
const pesel = require("./index.js");
const {padWithZero} = require("./utils.js");

describe("Pesel generator", () => {

    test("should generate random pesel if no options provided", () => {
        expect(isPeselValid(pesel.generate())).toBeTruthy();
    });

    test("should generate pesel with specified year", () => {
        const generatedFromRange1 = pesel.generate({year: 1801});
        const generatedFromRange2 = pesel.generate({year: 1901});
        const generatedFromRange3 = pesel.generate({year: 2001});
        const generatedFromRange4 = pesel.generate({year: 2101});
        const generatedFromRange5 = pesel.generate({year: 2201});

        console.log(generatedFromRange1);
        console.log(generatedFromRange2);
        console.log(generatedFromRange3);
        console.log(generatedFromRange4);
        console.log(generatedFromRange5);

        expect(generatedFromRange1.slice(0,2)).toBe("81");
        expect(generatedFromRange2.slice(0,2)).toBe("01");
        expect(generatedFromRange3.slice(0,2)).toBe("21");
        expect(generatedFromRange4.slice(0,2)).toBe("41");
        expect(generatedFromRange5.slice(0,2)).toBe("61");

        expect(isPeselValid(generatedFromRange1)).toBeTruthy();
        expect(isPeselValid(generatedFromRange2)).toBeTruthy();
        expect(isPeselValid(generatedFromRange3)).toBeTruthy();
        expect(isPeselValid(generatedFromRange4)).toBeTruthy();
        expect(isPeselValid(generatedFromRange5)).toBeTruthy();
    });

    test("should generate pesel with specified month", () => {
        const generated = pesel.generate({month: 1});
        console.log("month", generated);
        expect(generated.slice(2,4)).toBe("01");
        expect(isPeselValid(generated)).toBeTruthy();
    });

    test("should generate pesel with specified day", () => {
        const generated = pesel.generate({day: 1});
        console.log("day", generated);
        expect(generated.slice(4,6)).toBe("01");
        expect(isPeselValid(generated)).toBeTruthy();
    });

    test("should generate pesel with specified sex", () => {
        const generated = pesel.generate({sex: "K"});
        expect(parseInt(generated.slice(9,10)) % 2).toBe(0);
        expect(isPeselValid(generated)).toBeTruthy();
    });

    test("should generate pretty unique pesel", () => {
        const currentDate = new Date();
        const generated = pesel.generate({
            prettyUnique: true
        });

        expect(isPeselValid(generated)).toBeTruthy;
        expect(generated.slice(0,2)).toBe(padWithZero(currentDate.getMonth() + 1));
        expect(generated.slice(2,4)).toBe(padWithZero(currentDate.getDate()));
        expect(generated.slice(4,6)).toBe(padWithZero(currentDate.getHours()));
        expect(generated.slice(6,8)).toBe(padWithZero(currentDate.getMinutes()));
        expect(generated.slice(8,10)).toBe(padWithZero(currentDate.getSeconds()));
    });

});
