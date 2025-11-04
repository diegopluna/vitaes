import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";



/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
    eslintConfigPrettier,
    js.configs.recommended,
    turboPlugin.configs['flat/recommended'],
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2020,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
        }
    }
]