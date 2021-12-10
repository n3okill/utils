module.exports = {
    root: true,
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "plugin:jest/recommended",
        "plugin:jest/style"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './tsconfig.jest.json'],
        "extraFileExtensions": [".cjs"]
    },
    "plugins": [
        "@typescript-eslint",
        "jest"
    ],
    "rules": {
        "@typescript-eslint/no-inferrable-types": "off"
    }
};
