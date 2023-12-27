import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n').map(line => line.split(''));

let calibrationSum = 0;

input.forEach(line => {
    let current = '';
    line.forEach(letter => {
        if (!Number.isNaN(parseInt(letter))) {
            if (current === '') {
                current += letter;
                current += letter;
            } else {
                current = current.substring(0, 1) + letter;
            }
        }
    })
    calibrationSum += parseInt(current);
})

console.log(calibrationSum);
// 54630 correct

let calibrationSum2 = 0;
const input2 = rawInput.split('\n');
const searchPatterns = [
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
];

input2.forEach(line => {
    let current = [];

    let smallestIndex = Infinity;
    searchPatterns.forEach(searchTerm => {
        let position = line.indexOf(searchTerm[0]);
        if (position > -1 && position < smallestIndex) {
            smallestIndex = position;
            current[0] = searchTerm[1];
        }
    })

    let hightestIndex = -1;
    searchPatterns.forEach(searchTerm => {
        let position = line.lastIndexOf(searchTerm[0]);
        if (position > -1 && position > hightestIndex) {
            hightestIndex = position;
            current[1] = searchTerm[1];
        }
    })

    calibrationSum2 += parseInt(current.join(''));
})

console.log(calibrationSum2);
// 54770 correct