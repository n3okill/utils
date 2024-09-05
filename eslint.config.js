import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import security from "eslint-plugin-security";
import jest from "eslint-plugin-jest";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    security.configs.recommended,
    jest.configs["flat/recommended"],
    {
        ignores: [ "**/dist/", "**/coverage/", "build.cjs", "eslint.config.js", "jest.config.js"]
    },
    {
        languageOptions: {
            parserOptions: {
                project: [ "tsconfig.json", "./tsconfig.jest.json"],
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 2020
            }
        },
        rules: {
            "@typescript-eslint/no-inferrable-types": "off"
        }
    },
);