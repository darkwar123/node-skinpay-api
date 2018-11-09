# SkinPay API for Node.js
[![npm version](https://img.shields.io/npm/v/skinpay-api.svg)](https://npmjs.com/package/skinpay-api)
[![npm downloads](https://img.shields.io/npm/dm/skinpay-api.svg)](http://npm-stat.com/charts.html?package=skinpay-api)
[![license](https://img.shields.io/npm/l/skinpay-api.svg)](https://github.com/darkwar123/node-skinpay-api/blob/master/LICENSE)

This module is designed for manage API of [Skinpay](https://skinpay.com/).

**You absolutely need Node.js v6.0.0 or later or this won't work.**

Install it from [npm](https://www.npmjs.com/package/skinpay-api)

# Example

```javascript
const SkinPayApi = require('skinpay-api');
const api = new SkinPayApi({ "privateKey": 'private_key_from_skinpay', "publicKey": 'public_key_from_skinpay' });

// Return deposit url for skinpay
console.log(api.deposit.create({ userid: '76561198216122468', min_amount: 1, currency: 'usd', currency_rate: 66 }));
// Return true or false (check for sign is right)
let query = { }; // here your POST body data from request to your server
console.log(api.deposit.result(query));
// Request skinpay for order status
api.api.getOrderStatus({ orderid: 1 }).then(console.log).catch(console.error);
```

## Installing

Using npm:

```bash
$ npm install skinpay-api
```

# Support

If you use it and you need more api methods, please make an issue and I will help you.
Report bugs on the [issue tracker](https://github.com/darkwar123/node-skinpay-api/issues)