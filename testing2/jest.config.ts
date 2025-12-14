export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  verbose: true,
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "BankAccount Test Report",
      outputPath: "docs/testReports.html",
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
};
