import { globalIgnores } from "eslint/config";
import globals from "globals";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import baseConfig from '@vitaes/eslint-config/base';
/**
 * A shared ESLint configuration for React projects.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    globalIgnores(['dist']),
    ...baseConfig,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        }
    }
]