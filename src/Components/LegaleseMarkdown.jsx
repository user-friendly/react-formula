
import {twMerge} from 'tailwind-merge'
import {Section, Heading, Paragraph} from '#Components/Text'
import Markdown from 'react-markdown'

const headingStyle = `py-2 border-b-2 border-gray-300`
const paraStyle = ``
const linkStyle = `font-medium text-sky-400 hover:underline`

const LegaleseMarkdown = (props) => {
	const {children, ...rest} = props
	
	const heading = (props, level = 1) => {
		const {children, className, node, ...rest} = props
		
		let textSizeStyle = ''
		switch (level) {
			case 0:
			case 1: textSizeStyle = 'text-6xl'
			break;
			case 2: textSizeStyle = 'text-4xl'
			break;
			case 3: textSizeStyle = 'text-2xl'
			break;
			default: textSizeStyle = 'text-xl'
			break;
		}
		
		return <Heading level={level} className={twMerge(headingStyle, textSizeStyle, className)} {...rest}>{children}</Heading>
	}
	
	const para = (props) => {
		const {children, className, node, ...rest} = props
		return <Paragraph className={twMerge(paraStyle, className)} {...rest}>{children}</Paragraph>
	}
	
	const link = (props) => {
		const {children, className, node, ...rest} = props
		return <a target="_blank" className={twMerge(linkStyle, className)} {...rest}>{children}</a>
	}
	
	const components = {
		h1: (props) => heading(props, 1),
		h2: (props) => heading(props, 2),
		h3: (props) => heading(props, 3),
		h4: (props) => heading(props, 4),
		h5: (props) => heading(props, 5),
		h6: (props) => heading(props, 6),
		p: para,
		a: link,
		ul: (props) => <ul className="list-disc pl-8">{props.children}</ul>,
	}
	
	return <Markdown components={components} {...rest}>{children}</Markdown>
}

export default LegaleseMarkdown
