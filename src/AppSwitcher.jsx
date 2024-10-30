
import _ from 'lodash'

import {useContext} from 'react'
import AppWrapperContext from '#AppWrapperContext'

const AppSwitcher = (props) => {
	const ctx = useContext(AppWrapperContext)
	const newProps = _.omit(_.clone(props), ['onClick'])
	newProps.onClick = (e) => {
		if (props.appid === undefined) {
			console.error(`Failed to request app switch - no app id provided.`)
			return
		}
		if (props.onClick !== undefined && false === props.onClick(e)) {
			return
		}
		ctx.switchApp(props.appid)
	}
	
	if (newProps.type === undefined) {
		newProps.type = 'button'
	}
	
	return <button {...newProps}>{props.children}</button>
}

export default AppSwitcher
