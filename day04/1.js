import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(line => line
        .slice(10)
        .trimStart()
        .replaceAll('  ', ' ')
        .split(' | ')
        .map(side => side
            .split(' ')
            .map(char => parseInt(char))
        )
    );


/* Part one */

let totalPoints = 0;

input.forEach(card => {
    const winningNumbers = new Set(card[0]);
    const havingNumbers = card[1];
    let cardPoints = 0;

    havingNumbers.forEach(number => {
        if (winningNumbers.has(number)) {
            if (cardPoints === 0) {
                cardPoints = 1;
            } else {
                cardPoints = cardPoints * 2;
            }
        }
    })

    totalPoints += cardPoints;
})

console.log(totalPoints);
// 26426 correct


/* Part two */

let totalCardAmount = 0;
let myWinningNumbersCollection = []
let scratchCardCollection = new Array(input.length).fill(1);

input.forEach(card => {
    const winningNumbers = new Set(card[0]);
    const havingNumbers = card[1];
    let amountWinningNumbers = 0;

    havingNumbers.forEach(number => {
        if (winningNumbers.has(number)) amountWinningNumbers++;
    })

    myWinningNumbersCollection.push(amountWinningNumbers);
})

myWinningNumbersCollection.forEach((winningNumber, index) => {
    let startIndex = index + 1;
    let endIndex = index + 1 + winningNumber;
    for (let i = startIndex; i < endIndex; i++) {
        scratchCardCollection[i] += scratchCardCollection[index];
    }
})

totalCardAmount = scratchCardCollection.reduce((total, current) => total + current);

console.log(totalCardAmount);
// 6227972 correct