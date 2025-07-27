import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactCompiler from 'eslint-plugin-react-compiler'
import vitest from '@vitest/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'

export default tseslint.config(
	{ ignores: ['dist', 'coverage'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.strict,
			eslintPluginPrettier,
			testingLibrary.configs['flat/react'],
			jestDom.configs['flat/recommended']
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			react,
			vitest,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'react-compiler': reactCompiler,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'no-unused-vars': 'off',
			...reactHooks.configs.recommended.rules,
			...vitest.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react-compiler/react-compiler': 'error',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			'testing-library/no-node-access': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'testing-library/no-container': 'off',
			'react-refresh/only-export-components': 'off'
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	}
)
