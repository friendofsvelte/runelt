import type { Config } from 'tailwindcss';
import Typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		screens: {
			'tall': { 'raw': '(min-height: 800px)' }
		}
	},

	plugins: [Typography]
} as Config;
