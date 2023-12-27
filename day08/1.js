import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n\n');

const instructions = input.shift().split('');

const nodeArray = input.shift().split('\n').map(line => line.split(' = ').map((node, index) => {
    return index % 2 !== 0 ? node.slice(1, 9).split(', ') : node;
}));

const nodeMap = new Map(nodeArray);


/* Part one */

let steps = 0;
let instruction = '';
let currentNode = 'AAA';

while (currentNode !== 'ZZZ') {
    instruction = instructions[steps % instructions.length];
    currentNode = instruction === 'L' ? nodeMap.get(currentNode)[0] : nodeMap.get(currentNode)[1];
    steps++;
}

console.log(steps);
// 18673 correct


/* Part two */

let paths = [];
let startPattern = /\w\wA/;
let stepsPartTwo = 0;

nodeMap.forEach((value, key) => {
    if (startPattern.test(key)) paths.push(key)
})

while (notEnded(paths)) {
    instruction = instructions[stepsPartTwo % instructions.length];
    if (stepsPartTwo % 100000000 === 0) console.log(instruction, paths, stepsPartTwo);
    paths.forEach((node, index) => {
        let nextNode = instruction === 'L' ? nodeMap.get(node)[0] : nodeMap.get(node)[1];
        paths[index] = nextNode;
    })
    stepsPartTwo++;
}

console.log(stepsPartTwo);
// runs too long

function notEnded(paths) {
    let notAllPathsEnded = false;
    let endPattern = /\w\wZ/;
    for (let i = 0; i < paths.length; i++) {
        const node = paths[i];
        if (!endPattern.test(node)) {
            notAllPathsEnded = true;
            break;
        }
    }
    return notAllPathsEnded;
}
