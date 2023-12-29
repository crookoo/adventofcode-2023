import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(''));


/* Part one */

function findCoordinatesOfS(input) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const tile = input[i][j];
            if (tile === 'S') {
                return [i, j]
            }
        }
    }
    return null;
}

function findFirstStep(input, rowS, colS) {
    const lookupCoords = [
        [-1, 0, ['|', 'F', '7']],
        [0, 1, ['-', '7', 'J']],
        [1, 0, ['|', 'L', 'J']],
        [0, -1, ['-', 'F', 'L']]];

    for (let i = 0; i < lookupCoords.length; i++) {
        const nextRow = lookupCoords[i][0] + rowS;
        const nextCol = lookupCoords[i][1] + colS;
        const currentTile = input[nextRow][nextCol];
        const possibleTiles = lookupCoords[i][2];
        if (possibleTiles.indexOf(currentTile) > -1) {
            return [nextRow, nextCol, currentTile];
        }
    }
    return null;
}

const [rowS, colS] = findCoordinatesOfS(input)
const [rowFirstStep, colFirstStep] = findFirstStep(input, rowS, colS);

let countSteps = 1;
let rowLast = rowS;
let colLast = colS;
let currentTile = input[rowFirstStep][colFirstStep];
let rowCurrent = rowFirstStep;
let colCurrent = colFirstStep;

let loopTiles = new Map();
loopTiles.set(`${rowS}-${colS}`, 'S');

while (currentTile !== 'S') {
    loopTiles.set(`${rowCurrent}-${colCurrent}`, currentTile);

    let rowDifference = rowCurrent - rowLast;
    let colDifference = colCurrent - colLast;
    rowLast = rowCurrent;
    colLast = colCurrent;

    switch (currentTile) {
        case '|':
            rowDifference === 1 ? rowCurrent++ : rowCurrent--;
            break;
        case '-':
            colDifference === 1 ? colCurrent++ : colCurrent--;
            break;
        case 'L':
            colDifference === 0 ? colCurrent++ : rowCurrent--;
            break;
        case 'J':
            colDifference === 0 ? colCurrent-- : rowCurrent--;
            break;
        case '7':
            colDifference === 0 ? colCurrent-- : rowCurrent++;
            break;
        case 'F':
            colDifference === 0 ? colCurrent++ : rowCurrent++;
            break;
    }

    currentTile = input[rowCurrent][colCurrent];
    countSteps++;
}

console.log(countSteps / 2);
// 6690 correct


/* Part two */

let countEnclosedTiles = 0;
let outsideTheLoop = true;
let activeF = false;
let activeL = false;

for (let i = 0; i < input.length; i++) {
    let insideOfLoopCounter = 0;

    for (let j = 0; j < input[i].length; j++) {
        const tile = input[i][j];
        const tilePartOfTheLoop = loopTiles.has(`${i}-${j}`);

        if (tilePartOfTheLoop) {
            switch (tile) {
                case '|':
                    insideOfLoopCounter++;
                    break;
                case 'S':
                case 'F':
                    activeF = true;
                    break;
                case 'L':
                    activeL = true;
                    break;
                case 'J':
                    if (activeF) {
                        insideOfLoopCounter++;
                        activeF = false;
                    }
                    activeL = false;
                    break;
                case '7':
                    if (activeL) {
                        insideOfLoopCounter++;
                        activeL = false;
                    }
                    activeF = false;
                    break;
            }
        }

        outsideTheLoop = insideOfLoopCounter % 2 === 1 ? false : true;

        if (!tilePartOfTheLoop && !outsideTheLoop) countEnclosedTiles++;

    }
}

console.log(countEnclosedTiles);
// 525 correct