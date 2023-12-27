import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(line => line
        .split(': ')
        .map((side, index) => {
            if (index === 0) {
                return parseInt(side.substring(5));
            }
            if (index === 1) {
                return side
                    .split('; ')
                    .map(set => set
                        .split(', ')
                        .map(single => single
                            .split(' ')
                            .map((base, index) => {
                                if (index === 0) {
                                    return parseInt(base);
                                } else if (index === 1) {
                                    return base;
                                }
                            })
                        ));
            }
        })
    );

let idSum = 0;

input.forEach(game => {
    let possibleGame = true;
    let gameId = game[0];
    let gameSets = game[1];
    gameSets.forEach(set => {
        set.forEach(singleDraw => {
            let amount = singleDraw[0];
            let color = singleDraw[1];
            switch (color) {
                case 'red':
                    if (amount > 12) possibleGame = false;
                    break;
                case 'green':
                    if (amount > 13) possibleGame = false;
                    break;
                case 'blue':
                    if (amount > 14) possibleGame = false;
            }
        })
    })
    if (possibleGame) idSum += gameId;
})

console.log(idSum);
// 2085 correct

let powerSum = 0;

input.forEach(game => {
    let redMax = 0, greenMax = 0, blueMax = 0;
    let gameSets = game[1];
    gameSets.forEach(set => {
        set.forEach(singleDraw => {
            let amount = singleDraw[0];
            let color = singleDraw[1];
            switch (color) {
                case 'red':
                    if (amount > redMax) redMax = amount;
                    break;
                case 'green':
                    if (amount > greenMax) greenMax = amount;
                    break;
                case 'blue':
                    if (amount > blueMax) blueMax = amount;
            }
        })
    })
    let power = redMax * greenMax * blueMax;
    powerSum += power;
})

console.log(powerSum);
// 79315 correct