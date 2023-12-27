import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(line => line.split(' ').map(Number));


let sumNextValues = 0;
let sumPreviousValues = 0;

input.forEach(history => {
    let historyCalculations = [];
    historyCalculations.push(history);
    while (!allElementsAreZeros(history)) {
        let nextLine = [];
        for (let i = 0; i < history.length - 1; i++) {
            let difference = history[i + 1] - history[i];
            nextLine.push(difference);
        }
        historyCalculations.push(nextLine);
        history = nextLine;
    }

    historyCalculations.forEach(calculationLine => {
        sumNextValues += calculationLine[calculationLine.length - 1];
    })

    let firstValue = 0;
    for (let i = historyCalculations.length - 2; i >= 0; i--) {
        firstValue = historyCalculations[i][0] - firstValue;
    }
    sumPreviousValues += firstValue;
})

function allElementsAreZeros(arrayWithNumbers) {
    for (let i = 0; i < arrayWithNumbers.length; i++) {
        if (arrayWithNumbers[i] !== 0) return false;
    }
    return true;
}

console.log(sumNextValues);
// 1743490457 correct

console.log(sumPreviousValues);
// 1053 correct