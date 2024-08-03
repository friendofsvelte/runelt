import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		screens: {
			'tall': { 'raw': '(min-height: 800px)' }
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
