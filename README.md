# Banka
Easy online banking system.



[![Build Status](https://travis-ci.org/vkarpov15/fizzbuzz-coverage.svg?branch=master)](https://travis-ci.org/vkarpov15/fizzbuzz-coverage)
[![Coverage Status](https://coveralls.io/repos/vkarpov15/fizzbuzz-coverage/badge.svg)](https://coveralls.io/r/vkarpov15/fizzbuzz-coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/nickmerwin/node-coveralls/badge.svg)](https://snyk.io/test/github/nickmerwin/node-coveralls)


# Description

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money

## Documentation

#Required UI
* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.

# Endpoint
No| Endpoint
--|---------
* Create user account

* Create a bank account

* Activate or deactivate an account. Specify the new ​ status ​ in​ ​ the request body.

* Delete a specific bank account.

* Debit a bank account.

* Credit a bank account.

* User can view account transaction history.

* User can view a specific account transaction.

* User can view account details.

* Admin/staff can view a list of accounts owned by a specific user.

* Staff/Admin can view all bank accounts

* Staff/Admin can view all active bank accounts.

## Prerequisites

No| Setup| 
--|---------|-----
1. install postgresql
2. install node
3. install npm 





## Setup

- you clone on github, copy https://github.com/kagabof/Banka.git
    then white thos command in the terminal 
```
git clone <link>
```

 - you install npm in the same packeg that contain the git repository use.

```
npm i
```
### Running the tests
To run automated test just use 
```
npm test
```

### ENDPOINT APIs
|ENDPOINT                              | METHODS  | DESCRIPTION |
|--------------------------------------|----------|-------------|
|/api/v2/auth/signup                   |POST       |User sign up
|/api/v2/auth/signup/staff             |POST    |User sign up as a user
|/api/v2/auth/signup/admin             |POST    |User sign up an admin
|/api/v2/auth/signin                   |POST    |User sign in
|/api/v2/auth/:email/delete            |DELETE  |Delete a user

|/api/v2/account/:accountNumber        |PATCH   | Admin/Staff can activate or deactivate an account.
|/api/v2/account/:accountNumber        |POST    |
|/api/v2/accounts/:accountNumber       |DELETE  | Admin/Staff can delete an account
|/api/v2/account/:accountNumber        |GET     |
|/api/v2/user/:email/accounts          |GET |Admin/staff can view a list of accounts owned by a specific user.
|/api/v2/accounts                      |POST | Create bank account
|/api/v2/transactions/:accountNumber/debit   |POST |Staff (cashier) can credit an account
|/api/v2/transactions/:accountNumber/credit  |POST |Staff (cashier) can debit an account
|/api/v2/account/:accountNumber |    GET   |User can view account details.
|/api/v2/user/:email/accounts |    GET  |   Admin/staff can view a list of accounts owned by a specific user.
|/api/v2/accounts   |  GET  |Staff/Admin can view all active bank accounts, Staff/Admin can view all dormant bank accounts.



 run by:
```
npm run dev
```
### Dependencies

List of libraries(node.js)

### Getting Started
```
npm run test
```
## Contribute

if you are using banka first install node.js 

#### Response format
We will be using the JSON Format
* Success
```
{
    'status': 200,
    'data': []
} 
```
* Error
```
{
    'status': 400,
    'errors': []
}
```



##Authors
- Kagabo Faustin