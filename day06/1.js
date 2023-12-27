import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n');
const times = input[0].match(/\d+/g).map(rawNumber => parseInt(rawNumber));
const distances = input[1].match(/\d+/g).map(rawNumber => parseInt(rawNumber));


/* Part one */

let waysToBeatTheRecord = [];

times.forEach((time, index) => {
    waysToBeatTheRecord[index] = 0;
    for (let buttonTime = 0; buttonTime <= time; buttonTime++) {
        const velocity = buttonTime;
        const drivingTime = time - buttonTime;
        const distance = velocity * drivingTime;
        if (distance > distances[index]) waysToBeatTheRecord[index]++;
    }
})

const multipliedResult = waysToBeatTheRecord.reduce((total, current) => total * current);

console.log(multipliedResult);
// 252000 correct


/* Part two */

const oneRaceTime = parseInt(times.join(''));
const oneRaceDistance = parseInt(distances.join(''));
let oneRaceWaysToBeatTheRecord = 0;

for (let buttonTime = 0; buttonTime <= oneRaceTime; buttonTime++) {
    const velocity = buttonTime;
    const drivingTime = oneRaceTime - buttonTime;
    const distance = velocity * drivingTime;
    if (distance > oneRaceDistance) oneRaceWaysToBeatTheRecord++;
}

console.log(oneRaceWaysToBeatTheRecord);
// 36992486 correct