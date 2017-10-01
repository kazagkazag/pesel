const {getRandomInt, padWithZero} = require("./utils.js");

function generate(options) {
    if(
        (options && options.year) 
        && (typeof options.year !== "number" || options.year < 1800 || options.year > 2299)
    ) {
        throw Error("Incorrect year provided. Only numbers from 1800 to 2299 are allowed.");
    }

    if(
        (options && options.month) 
        && (typeof options.month !== "number" || options.month < 1 || options.month > 12)
    ) {
        throw Error("Incorrect month provided. Only numbers from 1 to 12 are allowed.");
    }

    if(
        (options && options.day) 
        && (typeof options.day !== "number" || options.day < 1 || options.day > 31)
    ) {
        throw Error("Incorrect day provided. Only numbers from 1 to 31 are allowed.");
    }

    if(
        (options && options.sex) 
        && (typeof options.sex !== "string" || !/^K|M|F$/ig.test(options.sex))
    ) {
        throw Error("Incorrect sex provided. Only strings: K or F for female, and M for male are allowed.");
    }

    return options && options.prettyUnique
        ? getPrettyUniquePesel(options)
        : getPesel(options);
}

function getPesel(options) {
    const year = options && options.year || getRandomInt(1800, 2299);
    const month = options && options.month || getRandomInt(1, 12);
    // unsafe random day number - if February will be our month,
    // and day will be '31', then we will end up with date from March
    const day = options && options.day || getRandomInt(0, 31); 

    // actual date may be different than user specified date,
    // for example is user specified 2017-02-30, then actual date
    // will be 2017-03-02, because of 2 extra days for February
    const date = new Date(year, month - 1, day);

    // if created date object isn't really date object, or
    // we can't get time from it, it means that there is something wrong
    // with the parameters
    if(
        Object.prototype.toString.call(date) !== "[object Date]" ||
        (Object.prototype.toString.call(date) === "[object Date]" && isNaN(date.getTime()))
    ) {
        throw Error("Provided options for date are incorrect. Only numbers are accepted. Provided: ", JSON.stringify(options));
    }

    const yearNumber = getYearNumbers(date.getFullYear());
    const monthNumber = getMonthNumber(date.getFullYear(), date.getMonth() + 1);
    const dayNumber = padWithZero(date.getDate());
    const sex = getSexNumber(options && options.sex);

    const withoutSum = `${yearNumber}${monthNumber}${dayNumber}${getSeries()}${sex}`;

    return `${withoutSum}${getSum(withoutSum)}`;
}

function getPrettyUniquePesel() {
    const date = new Date();

    const withoutSum = ""
        + padWithZero(date.getMonth() + 1)
        + padWithZero(date.getDate())
        + padWithZero(date.getHours())
        + padWithZero(date.getMinutes())
        + padWithZero(date.getSeconds());

    return `${withoutSum}${getSum(withoutSum)}`;
}

function getYearNumbers(year) {
    return year.toString().slice(-2);
}

function getMonthNumber(year, month) {
    if(year < 1899) {
        return month + 80;
    } else if(year < 1999) {
        return padWithZero(month);
    } else if(year < 2099) {
        return month + 20;
    } else if(year < 2199) {
        return month + 40;
    } else if(year < 2299) {
        return month + 60;
    } 
}

function getSexNumber(sex) {
    switch(sex) {
        case "F":
        case "K":
        case "k":
        case "f":
            return getRandomInt(1,4) * 2;
            break;
        case "m":
        case "M":
            return getRandomInt(0,4) * 2 + 1;
            break;
        default:
            return getRandomInt(1,9);
    }
}

function getSeries() {
    return (1000 + getRandomInt(1, 999)).toString().slice(-3);
}

function getSum(peselWithoutSum) {
    const weights = [1,3,7,9,1,3,7,9,1,3];
    const components = peselWithoutSum.split("").map(c => parseInt(c));
    const weightsTimesComponents = weights.reduce((prev, next, index) => {
        return prev + (next * components[index]); 
    }, 0);

    return (10 - (weightsTimesComponents % 10)) % 10;
}

module.exports = {
    generate
};
