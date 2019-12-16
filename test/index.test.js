const StrengthTest = require('../src');

const pwTester = new StrengthTest({minLength: 8, maxLength: 42, badWords: ['moist']});

describe('StrengthCheck', () => {
  it('should be atleast 8 characters', () => {
    const validate = pwTester.validate('small');
    expect(validate).toBe(0);
  });

  it('should accept good passwords', () => {
    const validate = pwTester.validate('J.23dZ?x_[1[-@Mq,fgFCK8@Bs46m<b');
    expect(validate).toBeGreaterThan(90);
  });

  it('should not accept unnecessarily long passwords', () => {
    const validate = pwTester.validate('J.23dZ?x_[1[-@Mq,fgFCK8@Bs46m<J.23dZ?x_[1[-@Mq,fgFCK8@Bs46m<bb');
    expect(validate).toBe(0);
  });

  it('should not accept weak passwords', () => {
    const validate = pwTester.validate('passwordBad');
    expect(validate).toBeLessThan(65);
  })

  it('should not accept really weak passwords', () => {
    const validate = pwTester.validate('password');
    expect(validate).toBe(0);
  });

  it('should not accept bad words', () => {
    const validate = pwTester.validate('moist');
    expect(validate).toBe(0);
  });
});
