module.exports = {
    testEnvironment: "jsdom", // Simulates a browser environment
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js","@testing-library/jest-dom/extend-expect"], // Run before each test
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"], // Supported file types
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS modules
      "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js", // Mock static files
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transpile JavaScript & TypeScript
    },
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)", // Match test files inside __tests__ folder
      "**/?(*.)+(spec|test).[tj]s?(x)", // Match `*.test.js` & `*.spec.js`
    ],
    collectCoverage: true, // Enable test coverage
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}", // Collect coverage from all source files
      "!src/index.js", // Exclude index.js
      "!src/reportWebVitals.js", // Exclude reportWebVitals.js
      "!src/setupTests.js", // Exclude setupTests.js
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    },
    testTimeout: 10000,
  };
  