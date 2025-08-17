import antfu from '@antfu/eslint-config'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default antfu({
	nextjs: true,
	react: true,
	typescript: true,

	lessOpinionated: true,
	isInEditor: false,

	stylistic: {
		indent: 'tab',
		quotes: 'single',
	},

	formatters: {
		css: true,
	},

	ignores: [
		'migrations/**/*',
		'**/*.d.json.ts',
		'next-env.d.ts',
	],
}, jsxA11y.flatConfigs.recommended, {
}, {
	rules: {
		'antfu/top-level-function': 'off',
		'antfu/no-top-level-await': 'off',
		'style/jsx-quotes': ['error', 'prefer-single'],
		'style/brace-style': ['error', '1tbs'],
		'ts/no-require-imports': 'off',
		'react/prefer-destructuring-assignment': 'off',
		'node/prefer-global/process': 'off',
		'ts/consistent-type-definitions': 'off',
	},
})
