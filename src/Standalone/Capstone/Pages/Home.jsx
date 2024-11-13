

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'
import NavHeader from '#cap/Components/NavHeader'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

const Home = () => {
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="p-8 mx-auto w-full max-w-5xl">
			<Heading className="p-2 text-center">Welcome to Rica's Plants</Heading>
			
			<Paragraph>Your one-stop destination for all things green and growing! Our passion for plants shines through in our diverse selection of lush houseplants, exotic succulents, and vibrant garden favorites. We believe that plants bring more than just beauty to a space; they breathe life into your home, purify your air, and uplift your spirit. Whether you’re a seasoned green thumb or a first-time plant parent, we’re here to help you cultivate the perfect indoor oasis.</Paragraph>

			<Paragraph>At Rica's Plants, we understand that every plant has its own personality and needs. That's why we offer detailed care guides, personalized recommendations, and friendly support to ensure your plants thrive. From bright, sun-loving cacti to delicate, shade-loving ferns, we have options to suit every environment and lifestyle. Our commitment to quality means that each plant is carefully selected and nurtured until it's ready to become part of your space.</Paragraph>

			<Paragraph>Discover the joy of nurturing your own slice of nature with our specially curated collections. Our selection changes with the seasons, allowing you to find the freshest additions to your plant family throughout the year. Explore our rare finds section for unique specimens that will make your collection truly stand out. Join our community of plant lovers and embark on a journey of growth, inspiration, and endless greenery.</Paragraph>
		</Section>
	</RedirectAuthenticated>
}

export default Home
