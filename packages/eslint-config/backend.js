import { config as baseConfig } from './base';
import globals from 'globals';
/**
 * A shared ESLint configuration for React projects.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    ...baseConfig,
    {
        languageOptions: {
            globals: globals.node,
        }
    }
]