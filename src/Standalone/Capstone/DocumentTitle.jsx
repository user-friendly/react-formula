// FIXME Too many re-renders occuring. This is basically equivalent to having the state in components?
// Why even use a state?

import _ from 'lodash'
import {useState, useEffect, useCallback} from 'react'

const APP_LONG_NAME = "Rica's Plants"

const useDocumentTitle = () => {
	const [title, setTitle] = useState(APP_LONG_NAME)
	
	useEffect(() => {
		if (typeof title === 'string') {
			document.title = title
		} // TODO Report to GA?
	}, [title])
	
	const updateTitle = useCallback((newTitle) => {
		if (newTitle && _.isString(newTitle)) {
			newTitle = `${APP_LONG_NAME} - ${newTitle}`
		} else {
			newTitle = APP_LONG_NAME
		}
		if (title !== newTitle) {
			setTitle(newTitle)
		}
	}, [title])
	
	return [title, updateTitle]
}

export {useDocumentTitle}
