/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    forceExit: true,
    moduleNameMapper: {
        '^configs/(.*)$': '<rootDir>/src/configs/$1',
        '^constants/(.*)$': '<rootDir>/src/constants/$1',
        '^errors/(.*)$': '<rootDir>/src/errors/$1',
        '^middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^modules/(.*)$': '<rootDir>/src/modules/$1',
        '^routes/(.*)$': '<rootDir>/src/routes/$1',
        '^types/(.*)$': '<rootDir>/src/types/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
    },
};
