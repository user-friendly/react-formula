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
		}
	},
  },
  plugins: [],
}
