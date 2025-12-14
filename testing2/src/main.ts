import { BankAccount } from "./bankAccount";

const main = () => {
  const account = new BankAccount(100);
  console.log(`Current balance: ${account.getBalance()}`)
  account.deposit(500);
  console.log(`Current balance: ${account.getBalance()}`)
  account.deposit(500);
  console.log(`Current balance: ${account.getBalance()}`)
}

main();
