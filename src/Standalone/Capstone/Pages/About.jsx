

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'
import NavHeader from '#cap/Components/NavHeader'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

const About = () => {
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="p-8 mx-auto w-full max-w-5xl">
			<Heading className="p-2 text-center">About</Heading>
			
			<Paragraph>Welcome to Rica's Plants, your trusted destination for beautiful, healthy houseplants. We believe in the power of greenery to transform spaces and uplift spirits. Whether you’re a seasoned plant enthusiast or just starting your journey, our curated selection of plants is designed to bring life and vibrancy to your home or office.</Paragraph>
			
			<Paragraph>At Rica's Plants, we source our plants from sustainable growers who share our passion for quality and care. Each plant is handpicked to ensure it thrives in its new home. From low-maintenance favorites like pothos and snake plants to striking statement pieces like fiddle-leaf figs, we offer a variety of options to suit every lifestyle and aesthetic.</Paragraph>
			
			<Paragraph>More than just a plant shop, we’re here to inspire and guide. Our resources include care tips, styling ideas, and personalized advice to help you build your indoor jungle with confidence. Let’s grow together and make every corner of your space a little greener!</Paragraph>
		</Section>
	</RedirectAuthenticated>
}

export default About
