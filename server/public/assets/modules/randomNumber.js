function randomNumber(min, max){
    return parseFloat(Math.floor(Math.random() * (1 + max - min) + min));
}

console.log('randomNumber connected');

module.exports = randomNumber;
