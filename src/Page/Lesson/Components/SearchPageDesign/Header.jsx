/**
 * Search Page header.
 */

import Button from '#Button'

const preferencesIcon = '🕵️'

const styleButton = 'select-none cursor-pointer p-2'

const Header = () => {
	return (
		<div
			className="
		px-4 py-2
		flex justify-between items-center
		bg-orange-200
		
		text-orange-700
	"
		>
			<div className="flex items-start gap-2">
				<Button type="route" route="/about" style={styleButton}>
					About
				</Button>
				<Button type="route" route="/about" style={styleButton}>
					Store
				</Button>
			</div>
			<div>
				<Button type="route" route="/preferences" style={styleButton}>
					Preferences{' '}
					<span className="font-noto text-xl">{preferencesIcon}</span>
				</Button>
			</div>
		</div>
	)
}

export default Header
