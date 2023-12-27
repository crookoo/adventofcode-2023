import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input-test', import.meta.url);
const input = rawInput
    .split('\n\n')
    .map((line, index) => {
        let indexColon = line.indexOf(':');
        if (index === 0) {
            return line
                .substring(indexColon + 2)
                .split(' ')
                .map(value => parseInt(value));
        } else {
            return line
                .substring(indexColon + 2)
                .split('\n')
                .map(values => values
                    .split(' ')
                    .map(value => parseInt(value))
                )
        }

    });

const seeds = input[0];
const almanac = input.slice(1);

let lowestLocationNumber = Infinity;

seeds.forEach(seed => {
    almanac.forEach(rule => {
        let ruleApplied = false;

        rule.forEach(range => {
            const destination = range[0];
            const source = range[1];
            const steps = range[2]
            const difference = source - destination;
            if (seed >= source && seed <= source + steps && !ruleApplied) {
                seed = seed - difference;
                ruleApplied = true;
            }
        })
    })
    if (seed < lowestLocationNumber) lowestLocationNumber = seed;
})

console.log(lowestLocationNumber);
// 313045984 correct

let lowestLocationNumber2 = Infinity;

for (let i = 0; i < seeds.length; i += 2) {
    const startNumber = seeds[i];
    const seedRange = seeds[i + 1];
    for (let seed = startNumber; seed < startNumber + seedRange; seed++) {
        console.log(seed);
        let currentSeed = seed;

        almanac.forEach(rule => {
            let ruleApplied = false;

            rule.forEach(range => {
                const source = range[1];
                const steps = range[2]
                if (currentSeed >= source && currentSeed <= source + steps && !ruleApplied) {
                    const destination = range[0];
                    const difference = source - destination;
                    currentSeed = currentSeed - difference;
                    ruleApplied = true;
                }
            })
        })

        if (currentSeed < lowestLocationNumber2) lowestLocationNumber2 = currentSeed;
        if (seed % 10000000 === 0) console.log(seed);
    }
}

console.log(lowestLocationNumber2);
// 20283861 too high, long run time