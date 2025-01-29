/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/*"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/dbSetup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        compiler: "ts-patch/compiler",
      },
    ],
  },
};
