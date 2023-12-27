import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(line => line.split(''));

let partNumberSum = 0;
let neighbourCoordinates = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

for (let i = 0; i < input.length; i++) {

    const row = input[i];
    let numberCollection = [];
    let columnCollection = [];

    for (let j = 0; j < row.length; j++) {
        const element = input[i][j];
        const nextElement = input[i][j + 1];

        if (!isNaN(element)) {
            numberCollection.push(element);
            columnCollection.push(j);
        }

        if (isNaN(nextElement) || row.length === j) {
            let symbolFound = false;

            columnCollection.forEach(col => {
                if (symbolFound) return;

                neighbourCoordinates.forEach(neighbourCoord => {
                    let toBeCheckedRow = i + neighbourCoord[0];
                    let toBeCheckedCol = col + neighbourCoord[1];

                    if (toBeCheckedRow > -1 && toBeCheckedRow < input.length &&
                        toBeCheckedCol > -1 && toBeCheckedCol < row.length) {
                        let toBeCheckedChar = input[toBeCheckedRow][toBeCheckedCol];
                        if (isNaN(toBeCheckedChar) && toBeCheckedChar !== '.') {
                            symbolFound = true;
                            partNumberSum += parseInt(numberCollection.join(''));
                        }
                    }
                })
            });

            numberCollection = [];
            columnCollection = [];
        }
    }
}

console.log(partNumberSum);
// 525181 correct


let gearCollection = new Map();

for (let i = 0; i < input.length; i++) {

    const row = input[i];
    let numberCollection = [];
    let columnCollection = [];

    for (let j = 0; j < row.length; j++) {
        const element = input[i][j];
        const nextElement = input[i][j + 1];

        if (!isNaN(element)) {
            numberCollection.push(element);
            columnCollection.push(j);
        }

        if (isNaN(nextElement) || row.length === j) {
            let symbolFound = false;

            columnCollection.forEach(col => {
                if (symbolFound) return;

                neighbourCoordinates.forEach(neighbourCoord => {
                    let toBeCheckedRow = i + neighbourCoord[0];
                    let toBeCheckedCol = col + neighbourCoord[1];

                    if (toBeCheckedRow > -1 && toBeCheckedRow < input.length &&
                        toBeCheckedCol > -1 && toBeCheckedCol < row.length) {
                        let toBeCheckedChar = input[toBeCheckedRow][toBeCheckedCol];

                        if (toBeCheckedChar === '*') {
                            symbolFound = true;
                            let gearCoordString = `${toBeCheckedRow},${toBeCheckedCol}`;

                            if (gearCollection.has(gearCoordString)) {
                                let newNumberCollection = gearCollection.get(gearCoordString)
                                newNumberCollection.push(numberCollection.join(''));
                                gearCollection.set(gearCoordString, newNumberCollection)
                            } else {
                                gearCollection.set(gearCoordString, [numberCollection.join('')])
                            }
                        }
                    }
                })
            });

            numberCollection = [];
            columnCollection = [];
        }
    }
}

let gearRatioSum = 0;

gearCollection.forEach(gearSet => {
    if (gearSet.length === 2) {
        gearRatioSum += gearSet[0] * gearSet[1];
    }
})

console.log(gearRatioSum);
// 84289137 correct