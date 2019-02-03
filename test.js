// npm i
// node -r esm test.js
// node -r esm test.js test_name_here

import * as color from "./test/color.js";
import * as coordinates from "./test/coordinates.js";
const tests = {...color, ...coordinates}

import { equal, shorten, rgb, hsl } from './utils.js'

const reset = "\x1b[0m";
const red = "\x1b[31m";
const redbg = "\x1b[41m";
const green = "\x1b[32m";
const greenbg = "\x1b[42m";
const dim = "\x1b[2m";

console.log(`\n  ${dim}Running Fachwerk tests${reset}\n`);


const filteredKey = process.argv[2]

let passed = 0
let failed = 0

Object.keys(tests).filter(key => filteredKey ? key.startsWith(filteredKey) : true).forEach(key => {
  const [expected, actual] = tests[key]();
  if (equal(expected, actual)) {
    passed++
    console.log(`  ${shorten(key).padEnd(53)}\t${green}OK${reset}`);
  } else {
    failed++
    console.log(`  ${shorten(key).padEnd(53)}\t${red}Failed${reset}${dim}
 
${String(tests[key]).split('\n').map(row => `    ${row}`).join('\n')}

    Actual: ${reset}${red}${JSON.stringify(actual)}${reset}${dim}

    Expected: ${JSON.stringify(expected)}
${reset}`);
  }
});

if (passed || failed) {
console.log(`

  ${greenbg} Tests passed: ${passed} ${reset} ${ failed ? `${redbg} Tests failed: ${failed} ${reset}` : ''}

`)
} else {
console.log(`
  No tests found

`)
}
