import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
	{
		ignores: ['dist/', '.astro/', 'node_modules/'],
	},
];
