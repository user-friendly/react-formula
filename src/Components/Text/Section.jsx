
import _ from 'lodash'
import {twMerge} from 'tailwind-merge'
import {createContext, useContext} from 'react'

const SectionLevelContext = createContext(0)

const defaultStyle = ``

const Section = (props) => {
	const level = useContext(SectionLevelContext)
	const newProps = _.omit(_.clone(props), ['className'])
	return <SectionLevelContext.Provider value={level + 1}>
		<div className={twMerge(defaultStyle, props.className)} {...newProps}>
			{props.children}
		</div>
	</SectionLevelContext.Provider>
}

// Padding left. How will this work for right-to-left languages?
const defaultIndentStyles = [
	``, // top section
	`ml-2`, // sub section 1
	`ml-6`, // sub section 1
	`ml-10`, // sub section 1
	`ml-14`, // sub section 1
	`ml-20`, // sub section 1
]

const GetSectionLevelIndentStyle = () => {
	const level = useContext(SectionLevelContext)
	return level < 7 ? defaultIndentStyles[level-1] : defaultIndentStyles[5]
} 

export {SectionLevelContext, GetSectionLevelIndentStyle}
export default Section
