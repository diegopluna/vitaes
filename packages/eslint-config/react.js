import { globalIgnores } from "eslint/config";
import globals from "globals";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { config as baseConfig } from './base';
/**
 * A shared ESLint configuration for React projects.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            ...baseConfig,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        }
    }
]