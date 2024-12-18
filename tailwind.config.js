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
			tiny5: ['Tiny5', 'sans-serif'],
			ubuntu: ['Ubuntu', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
			// Capstone fonts.
			playfair: ['Playfair Display', 'sans-serif'],
			lato: ['Lato', 'sans-serif'],
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
			slideRight: {
				'from': {
					transform: 'translateX(100%)',
				    opacity: 0,
				},
				'to': {
					transform: 'translateX(0)',
				    opacity: 1,
				},
			},
			slideLeft: {
				'from': {
					transform: 'translateX(-100%)',
				    opacity: 0,
				},
				'to': {
					transform: 'translateX(0)',
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
			slideRight: 'slideRight 0.5s ease-out',
			slideLeft: 'slideLeft 0.5s ease-out',
			fadeUp: 'fadeUp 0.5s ease-out forwards',
			spinOnce: 'spin 1s linear forwards',
		}
	},
  },
  plugins: [],
}
