import baseConfig from '@vitaes/eslint-config/base';
import { globalIgnores } from "eslint/config";
import globals from 'globals';
/**
 * A shared ESLint configuration for backend projects.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    globalIgnores(['dist', 'node_modules']),
    ...baseConfig,
    {
        languageOptions: {
            globals: globals.node,
        }
    }
]