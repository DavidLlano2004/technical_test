module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx'
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/api",
    "<rootDir>/src/router",
    "<rootDir>/src/helpers",
    "<rootDir>/src/assets/icons",
    "<rootDir>/src/assets/images",
    "<rootDir>/src/product/actions",
    "<rootDir>/src/product/hooks",
    "<rootDir>/src/product/interfaces",
    "<rootDir>/src/main.tsx",
    
  ]
};