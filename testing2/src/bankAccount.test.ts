import { BankAccount } from "./bankAccount";

describe("BankAccount", () => {
  describe("Initialization", () => {
    it("should create an account with a balance of 0 when no initial balance is provided", () => {
      const account = new BankAccount();
      expect(account.getBalance()).toBe(0);
    });

    it("should create an account with the provided initial balance", () => {
      const account = new BankAccount(100);
      expect(account.getBalance()).toBe(100);
    });

    it('should return "Initial balance cannot be negative." when initialized with a negative balance', () => {
      expect(() => new BankAccount(-50)).toThrow(
        "Initial balance cannot be negative."
      );
    });
  });

  describe("Deposits", () => {
    it("should increase the balance when depositing a positive amount", () => {
      const account = new BankAccount(100);
      account.deposit(50);
      expect(account.getBalance()).toBe(150);
    });

    it('should return "Deposit amount must be positive." when trying to deposit a negative amount', () => {
      const account = new BankAccount();
      expect(() => account.deposit(-10)).toThrow(
        "Deposit amount must be positive."
      );
    });

    it('should return "Deposit amount must be positive." when trying to deposit zero', () => {
      const account = new BankAccount();
      expect(() => account.deposit(0)).toThrow(
        "Deposit amount must be positive."
      );
    });
  });

  describe("Withdrawals", () => {
    it("should reduce the balance when withdrawing a valid amount", () => {
      const account = new BankAccount(100);
      account.withdraw(40);
      expect(account.getBalance()).toBe(60);
    });

    it('should return "Withdrawal amount must be positive." when attempting to withdraw a negative amount', () => {
      const account = new BankAccount(100);
      expect(() => account.withdraw(-20)).toThrow(
        "Withdrawal amount must be positive."
      );
    });

    it('should return "Withdrawal amount must be positive." when attempting to withdraw zero', () => {
      const account = new BankAccount(100);
      expect(() => account.withdraw(0)).toThrow(
        "Withdrawal amount must be positive."
      );
    });

    it('should return "Insufficient funds." when trying to withdraw more than the current balance', () => {
      const account = new BankAccount(50);
      expect(() => account.withdraw(100)).toThrow("Insufficient funds.");
    });
  });

  describe("Balance Retrieval", () => {
    it("should returns the current balance", () => {
      const account = new BankAccount(75);
      expect(account.getBalance()).toBe(75);
    });
  });

  describe("Transaction", () => {
    it("should return right balance after many operations with bank account", () => {
      const account = new BankAccount(1000);
      account.deposit(100);
      account.withdraw(50);
      account.deposit(200);
      account.withdraw(500);
      expect(account.getBalance()).toBe(750);
    });
  });
});
