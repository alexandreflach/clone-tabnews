const nextJest = require("next/jest");
const dotenv = require("dotenv");

const createJestConfig = nextJest({
  dir: ".",
});

dotenv.config({
  path: ".env.development",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
