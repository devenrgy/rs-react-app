/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
	'*': ['prettier --write --ignore-unknown'],
	'*.{js,mjs,ts,jsx,tsx}': ['eslint --quiet --fix --cache --max-warnings 0 --no-warn-ignored']
}

export default config
