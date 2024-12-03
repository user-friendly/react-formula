/**
 * Terms of Service view.
 * 
 * %title = Terms of Service
 * %route = /terms
 */

import LegaleseMarkdown from '#Components/LegaleseMarkdown'

import MD_TOS from '#Data/EN_Terms-of-Service.md?raw'

const TermsService = () => {	
	return <LegaleseMarkdown className="m-auto p-4 max-w-5xl">{MD_TOS}</LegaleseMarkdown>
}

export default TermsService
