module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@characters/(.*)$': '<rootDir>/src/characters/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
  },
};
