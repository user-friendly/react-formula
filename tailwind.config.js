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
			noto: ['Noto Color Emoji', 'sans-serif']
		},
		
		keyframes: {
			slideDownKF: {
				'from': {
					transform: 'translateY(-100%)',
				    opacity: 0,
				},
				'to': {
					transform: 'translateY(0)',
				    opacity: 1,
				},
			}
		},
		animation: {
			slideDown: 'slideDownKF 0.5s ease-out'
		}
	},
  },
  plugins: [],
}
