//Make sure that the Math.log2() function exists,
//since entropy calculations depend on it
if (!Math.log2) {
  Math.log2 = function(x) {
    return Math.log(x) * Math.LOG2E;
  };
}

//Default list of bad passwords
//https://www.welivesecurity.com/2018/12/17/most-popular-passwords-2018-revealed/
const badWords = [
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  '111111',
  '1234567',
  'sunshine',
  'qwerty',
  'iloveyou',
  'princess',
  'admin',
  'welcome',
  '666666',
  'abc123',
  'football',
  '123123',
  'monkey',
  '!@#$%^&*',
  'charlie',
  'aa123456',
  'donald',
  'password1',
  'qwerty123'
];

module.exports = class PasswordEntropy {
  constructor(props = {
    badWords: [],
    minLength: 8,
    maxLength: 64,
    disallowRepeated: false
  }) {
    this.badWords = badWords.concat(props.badWords || []);
    this.minLength = props.minLength || 8;
    this.maxLength = props.maxLength || 64;
    this.disallowRepeated = props.disallowRepeated || false;
    this.charClasses = [
      { pattern: /[0-9]/, size: 10 },
      { pattern: /[A-Z]/, size: 26 },
      { pattern: /[a-z]/, size: 26 },
      { pattern: /[^0-9A-Za-z]/, size: 33 }
    ];
  }

  pwStrength(pw) {
    // ensure it's a string
    const passwd = String(pw);
    
    const poolSize = this.charClasses.reduce((numChars, pool) =>  (pool.pattern.test(passwd)) ? numChars + pool.size : numChars, 0);

    return Math.floor(Math.log2(Math.pow(poolSize, passwd.length)));
  }

  correctLength(value) {
    return value.length >= this.minLength && value.length <= this.maxLength;
  }

  isBadWord(value) {
    return this.badWords.includes(value.toLowerCase());
  }

  isNull(value) {
    return value === null || value === '';
  }

  hasRepeatedChars(value) {
    const pattern = /([a-zA-Z0-9])\1{1,}/g;
    return pattern.test(value);
  }
  
  validationTests(value) {
    return this.isNull(value) ||
      this.isBadWord(value) ||
      (this.disallowRepeated && this.hasRepeatedChars(value)) ||
      !this.correctLength(value);
  }

  validate(value) {
    return (this.validationTests(value)) ? 0 : this.pwStrength(value);
  }
};
