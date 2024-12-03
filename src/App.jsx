/**
 * Main application component.
 */

import _ from 'lodash'

import {lazy, useState, useEffect, useContext, Suspense} from 'react'

import {default as RouteMap, RouterPathMap} from '#RouteMap'

import {
	BrowserRouter, Routes, Route, Link,
	useLocation, useNavigate
} from 'react-router-dom'

import AppSwitcher from '#AppSwitcher'
import SelectItem from '#SelectItem'
import NavBar from '#NavBar'
import NotFound from '#Page/NotFound'

const linkStyle="select-none cursor-pointer px-2.5 py-0.5 rounded-xl bg-sky-400 transition-bg"

const App = () => {
	const lessonSelectValue = '<none>'
	// Create a list of the lesson view routes.
	const lessonRoutes = _.filter(
		RouterPathMap.map((r, k) => {
			// Skip non-lesssons.
			if (!_.startsWith(r.path, '/lesson/')) return null

			// TODO Sort by what?
			const weight = k + 1000
			return {key: weight, value: r.path, label: r.title}
		})
	)
	lessonRoutes.push({
		key: 0,
		value: lessonSelectValue,
		label: '-- Select Lesson --',
	})
	const RouteSelect = () => {
		const navigate = useNavigate()
		const location = useLocation()
		let current = lessonRoutes.find(r => r.value === location.pathname)
		current = current ? current.value : lessonSelectValue
		
		return <><SelectItem
			name="routes"
			items={lessonRoutes}
			value={current}
			onSelect={(e, path) => {
				if (path !== lessonSelectValue) {
					navigate(path)
				}
			}}
		/></>
	}
	
	return (<BrowserRouter>
		<div className="h-dvh flex flex-col justify-between">
			{/* Header */}
			<div className="bg-indigo-100">
				<NavBar>
					<Link className={linkStyle} to="/">
						Home
					</Link>
					
					<AppSwitcher className={linkStyle} appid="capstone">
						Capstone Project
					</AppSwitcher>
					
					<RouteSelect />
					
					<Link className={linkStyle} to="/about">
						About
					</Link>
				</NavBar>
				<NavBar>
					<Link className={linkStyle} to="/weather">
						Weather
					</Link>
					<Link className={linkStyle} to="/msw-test">
						Mock Service Worker
					</Link>
					<Link className={linkStyle} to="/promises">
						JS Promise
					</Link>
					<Link className={linkStyle} to="/random">
						PseudoRNG
					</Link>
					
					<AppSwitcher className={linkStyle} appid="graphics">
						Graphics
					</AppSwitcher>
				</NavBar>
			</div>

			{/* Content */}
			<div className={`bg-sky-50 text-sans px-6 py-4 flex-1`}>
				<RouteMap notfound={<NotFound />} />
			</div>

			{/* Footer */}
			<div className="bg-indigo-100">
				<NavBar>
					<Link className={linkStyle} to="/terms">Terms of Service</Link>
					<Link className={linkStyle} to="/privacy">Privacy Policy</Link>
					<Link className={linkStyle} to="/contact">Contact</Link>
				</NavBar>
			</div>
		</div>
	</BrowserRouter>)
}

export default App
