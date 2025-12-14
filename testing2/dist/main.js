"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bankAccount_1 = require("./bankAccount");
const main = () => {
    const account = new bankAccount_1.BankAccount(100);
    console.log(`Current balance: ${account.getBalance()}`);
    account.deposit(500);
    console.log(`Current balance: ${account.getBalance()}`);
    account.deposit(500);
    console.log(`Current balance: ${account.getBalance()}`);
};
main();
