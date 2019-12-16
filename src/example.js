const StrengthCheck = require("./");

const pw = process.argv.slice(2).join(" ");

if (pw === '') {
  throw new Error("Usage: node index.js <password>");
} else {
  console.log(`Testing ${pw}`);
}

const tester = new StrengthCheck({ minLength: 10, badWords: ['sphere'] });

const strength = tester.validate(pw);
console.log(`Strength is ${strength}`);
