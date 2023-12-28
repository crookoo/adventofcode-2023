import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n').map(line => line.split(''));


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

while (currentTile !== 'S') {
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