
import {IconDecorative} from '#Components/Icon'
import {Section, Heading, Paragraph} from '#Components/Text'

const sectionStyle = `m-4 p-6 max-w-[700px] rounded-lg text-white text-2xl bg-neutral-600/95`
const buttonStyle = `hover:underline active:translate-y-1`

const CookieBanner = ({show, onAccept, onDecline}) => {
	return <div className={'z-50 fixed bottom-0 left-0 ' + (!show && 'hidden')}>
		<Section className={sectionStyle}>
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
	</div>
}

export default CookieBanner
