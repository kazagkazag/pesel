function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function padWithZero(value) {
    return (100 + parseInt(value)).toString().slice(-2);
}

module.exports = {
    getRandomInt,
    padWithZero
};
