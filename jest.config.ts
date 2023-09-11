import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/';
const baseTestDir = '<rootDir>/src/test/';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.test.ts`],
};

export default config;
