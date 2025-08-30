import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintReact from '@eslint-react/eslint-plugin'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactCompiler from 'eslint-plugin-react-compiler'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.strict,
			eslintReact.configs['recommended-type-checked'],
			eslintPluginPrettier,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs['recommended'],
			reactCompiler.configs['recommended']
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports
		},
		rules: {
			'@eslint-react/no-missing-key': 'warn',
			'react-refresh/only-export-components': 'off',
			'react-compiler/react-compiler': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'@eslint-react/no-unstable-context-value': 'off',
			'@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
			'@eslint-react/no-array-index-key': 'off',
			'@eslint-react/hooks-extra/no-unnecessary-use-prefix': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			]
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	}
)
