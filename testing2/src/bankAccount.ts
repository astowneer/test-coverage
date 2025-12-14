class BankAccount {
  private balance: number;

  constructor(initialBalance: number = 0) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }

    this.balance = initialBalance;
  }

  deposit(amount: number): number {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    this.balance += amount;
    return this.balance;
  }

  withdraw(amount: number): number {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient funds.");
    }

    this.balance -= amount;
    return this.balance;
  }

  getBalance(): number {
    return this.balance;
  }
}

export { BankAccount };
