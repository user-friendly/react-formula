/**
 * Privacy Policy view.
 * 
 * %title = Privacy Policy
 * %route = /privacy
 */

import LegaleseMarkdown from '#Components/LegaleseMarkdown'

import MD_COOKIES from '#Data/Cookie-Policy.md?raw'

const PrivacyPolicy = () => {
	return <LegaleseMarkdown className="m-auto p-4 max-w-5xl">{MD_COOKIES}</LegaleseMarkdown>
}

export default PrivacyPolicy
