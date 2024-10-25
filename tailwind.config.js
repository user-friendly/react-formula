/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
		fontFamily: {
			// Font is directly linked in the index.html document.
			noto: ['Noto Color Emoji', 'sans-serif'],
			tiny5: ['Tiny5', 'sans-serif']
		},
		
		keyframes: {
			slideDown: {
				'from': {
					transform: 'translateY(-100%)',
				    opacity: 0,
				},
				'to': {
					transform: 'translateY(0)',
				    opacity: 1,
				},
			},
			fadeUp: {
				'from': {
					transform: 'translateY(0)',
				    opacity: 1,
				},
				'to': {
					transform: 'translateY(-100%)',
				    opacity: 0,
					display: 'hidden',
				},
			}
		},
		animation: {
			slideDown: 'slideDown 0.5s ease-out',
			fadeUp: 'fadeUp 0.5s ease-out forwards',
		}
	},
  },
  plugins: [],
}
