# Password Entropy

A simple module for calculating the entropy of a given password. There are a few configurable options to make it work for your use case as well. 

## Installation

```
npm i password-entropy
```

## API

### Constructor Options

Parameters:

* `props` - Object that can contain the following keys:
  * `minLength` - Minimum password length as integer (defaults to 8)
  * `maxLength` - Maximum password length as integer (defaults to 64)
  * `disallowRepeated` - Boolean for whether passwords should disallow repeated characters (e.g. `aa`). (defaults to false)
  * `badWords` - Array of words that should be disallowed. Defaults to an array pulled from [this link](https://www.welivesecurity.com/2018/12/17/most-popular-passwords-2018-revealed/)

Returns:

* New `PasswordEntropy` object

### validate(password)

Parameters:

* `password` - The password to test

Returns:

* The number of bits of entropy (floored to nearest integer). Higher is better. 0 is returned when either a too-common password, or a password that violates one of the boundaries set through options.

### Example usage:

```javascript
"use strict";

const PasswordEntropy = require("password-entropy");

const validator = new PasswordEntropy();

const password = "Testing,A,Password";

if (validator.validate(password) < 50) {
  console.log("Your password is unacceptable.");
} else {
  console.log("Your password is acceptable.");
}
```
