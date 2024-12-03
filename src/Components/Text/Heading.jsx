
import {twMerge} from 'tailwind-merge'
import {useContext} from 'react'
import {SectionLevelContext, GetSectionLevelIndentStyle} from './Section'

const indentStyle = [
	`text-6xl`, // h1
	`text-5xl`, // h2
	`text-4xl`, // h3
	`text-3xl`, // h4
	`text-2xl`, // h5
	`text-xl`, // h6
]

const defaultTextStyle = 'text-xl'

const HtmlElement = (props) => {
	switch (props.level) {
		// Should never be 0, but just in case.
		case 0:
		case 1: return <h1 {...props}>{props.children}</h1>
		break;
		case 2: return <h2 {...props}>{props.children}</h2>
		break;
		case 3: return <h3 {...props}>{props.children}</h3>
		break;
		case 4: return <h4 {...props}>{props.children}</h4>
		break;
		case 5: return <h5 {...props}>{props.children}</h5>
		break;
		case 6: 
		default: return <h6 {...props}>{props.children}</h6>
		break;
	}
	return <div {...props}>{props.children}</div>
}

const Heading = (props) => {
	const level = props.level !== undefined ? props.level : useContext(SectionLevelContext)
	const sectionIndentStyle = GetSectionLevelIndentStyle()
	return <HtmlElement level={level} className={twMerge(defaultTextStyle, sectionIndentStyle, indentStyle[level-1], props.className)}>
		{props.children}
	</HtmlElement>
}

export default Heading
