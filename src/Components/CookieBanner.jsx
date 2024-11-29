
import {IconDecorative} from '#Components/Icon'
import {Section, Heading, Paragraph} from '#Components/Text'

const sectionStyle = `fixed bottom-2 left-2
	p-4 w-80 md:w-96 rounded-lg text-white bg-neutral-600/95
`

const buttonStyle = `hover:underline active:translate-y-1`

const CookieBanner = ({show, onAccept, onDecline}) => {
	return <Section className={sectionStyle + (!show && 'hidden')}>
		<Heading className="mb-4">
			Cookies <IconDecorative name="cookie" className="text-white" />
		</Heading>
		
		<Paragraph>
			This website uses cookies to improve your experience and to analyze traffic. By continuing to use our site, you agree to our use of cookies.
		</Paragraph>
		
		<div className="mt-4 flex justify-evenly">
			<button className={buttonStyle} onClick={onAccept}>Accept</button>
			<button className={buttonStyle} onClick={onDecline}>Decline</button>
		</div>
	</Section>
}

export default CookieBanner
