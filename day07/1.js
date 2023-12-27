import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(line => line.split(' '));


// Encode hands for sorting
input.forEach(set => {
    let hand = set[0];
    let countingMap = new Map();

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        if (countingMap.has(card)) {
            let amount = countingMap.get(card);
            amount++;
            countingMap.set(card, amount);
        } else {
            countingMap.set(card, 1);
        }
    }

    // Part one
    let handStrength = parseInt(Array.from(countingMap.values()).sort().reverse().join('').padEnd(5, '0'));
    set.push(handStrength);

    // Part two
    if (countingMap.has('J')) {
        const amountJ = countingMap.get('J');
        countingMap.set('J', 0);
        const mostKinds = [...countingMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
        countingMap.set(mostKinds[0], mostKinds[1] + amountJ);

        let handStrengthPartTwo = parseInt(Array.from(countingMap.values()).sort().reverse().join('').padEnd(5, '0'));
        set.push(handStrengthPartTwo);
    } else {
        set.push(handStrength);
    }
})

function solvePuzzle(input, encodedHand, strength) {
    input.sort((a, b) => {
        const strengthA = a[encodedHand];
        const strengthB = b[encodedHand];

        if (strengthA < strengthB) {
            return -1;
        } else if (strengthA > strengthB) {
            return 1;
        } else {
            const handA = a[0];
            const handB = b[0];

            for (let i = 0; i < handA.length; i++) {
                const strengthLetterA = strength.indexOf(handA[i]);
                const strengthLetterB = strength.indexOf(handB[i]);

                if (strengthLetterA < strengthLetterB) {
                    return 1;
                } else if (strengthLetterA > strengthLetterB) {
                    return -1;
                }
            }
        }

        return 0;
    }
    );

    let totalWinnings = 0;
    input.forEach((set, index) => {
        totalWinnings += set[1] * (index + 1);
    })

    return totalWinnings
}

const strengthPartOne = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
console.log(solvePuzzle(input, 2, strengthPartOne));
// 250957639 correct

const strengthPartTwo = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
console.log(solvePuzzle(input, 3, strengthPartTwo));
// 251515496 correct