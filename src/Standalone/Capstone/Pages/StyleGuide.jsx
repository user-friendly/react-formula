
import {useDocumentTitle} from '#cap/DocumentTitle'

import Icon from '#cap/Components/Icon'
import NavHeader from '#cap/Components/NavHeader'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

const placeholder = `
	The quick brown fox jumps over the lazy dog, darting swiftly across the field with grace.
	As it leaps, its sleek fur glistens under the afternoon sun, casting fleeting shadows on the
	ground. The dog, unmoved by the fox's antics, lies lazily on the grass, its eyes half-closed
	in contentment. Around them, the sounds of nature fill the air: the chirping of birds,
	the rustling of leaves, and the distant hum of a breeze that stirs the tall grass. Time seems
	to slow in this peaceful moment, where the simple beauty of the scene speaks louder than words.
`

const StyleGuide = () => {
	const [title, setTitle] = useDocumentTitle()
	setTitle('Style Guide')
	
	return <>
			<NavHeader />
			<div className="p-6 m-auto max-w-5xl ">
				<h1 className="my-4 text-5xl">Heading</h1>
				
				<div className="my-4 text-xl font-playfair">
					Font Playfair Display test. This here is some random text to test the given font.
				</div>
				
				<div className="my-4 text-xl font-lato">
					Font Lato test. This here is some random text to test the given font. 
				</div>
				
				<div>
					<h2 className="my-4 text-4xl">Icons</h2>
					<div className="flex flex-wrap items-center gap-4">
						<Icon name="menu" />
						<Icon name="home"
							className="text-4xl"
						/>
						<Icon name="account_circle" />
						<Icon name="login" />
						<Icon name="progress_activity" 
							className="rounded-full bg-transparent text-amber-700 hover:bg-amber-200 active:bg-amber-300 animate-spin"
						/>
						<Icon name="logout" />
						<Icon name="close"
							className="bg-violet-100 text-violet-700 hover:bg-violet-200 active:bg-violet-300"
						/>
					</div>
				</div>
			</div>
			
			<Section className="my-20">
				<Heading>Sub heading</Heading>
				
				<Paragraph>{placeholder}</Paragraph>
				<Section>
					<Heading>Sub heading</Heading>
					
					<Paragraph>{placeholder}</Paragraph>
					<Section>
						<Heading>Sub heading</Heading>
						
						<Paragraph>{placeholder}</Paragraph>
						<Section>
							<Heading>Sub heading</Heading>
	
							<Paragraph>{placeholder}</Paragraph>
							<Section>
								<Heading>Sub heading</Heading>
	
								<Paragraph>{placeholder}</Paragraph>
								<Section>
									<Heading>Sub heading</Heading>
	
									<Paragraph>{placeholder}</Paragraph>
									<Section>
										<Heading>Sub heading</Heading>
	
										<Paragraph>{placeholder}</Paragraph>
										<Section>
											<Heading>Sub heading</Heading>
											
											<Paragraph>{placeholder}</Paragraph>
										</Section>
									</Section>
								</Section>
							</Section>
						</Section>
					</Section>
				</Section>
			</Section>
			
			<Section className="my-20">
				<Heading>Sub heading</Heading>

				<Paragraph>{placeholder}</Paragraph>
				<Section>
					<Heading>Sub heading</Heading>

					<Paragraph>{placeholder}</Paragraph>
				</Section>
			</Section>		
		</>
	}

export default StyleGuide
