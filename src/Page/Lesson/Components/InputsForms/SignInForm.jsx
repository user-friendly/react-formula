
import _ from 'lodash'

import { useState, useEffect, useId } from 'react'

import TextInput from './Components/TextInput'

class Login {
	#username = 'anonymous'
	#password = 0
	
	constructor (username = false, password = false) {
		this.#username = _.isString(username) ? username : this.#username
		this.#password = _.isString(password) ? this.#dumbHash(password) : this.#password
	}
	
	get username() {
		return this.#username
	}
	
	get password() {
		return this.#password
	}
	
	#dumbHash(str) {
	  let hash = 0;
	  for (let i = 0; i < str.length; i++) {
	    const char = str.charCodeAt(i);
	    hash = (hash << 5) - hash + char;
	    hash = hash & hash; // Convert to 32bit integer
	  }
	  return hash;
	}
	
	toString() {
		return JSON.stringify({username: this.username, password: this.password.toString()})
	}
}

export default ({children}) => {
	{/* FIXME The delayed updates can cause state invalidation, for a login object. */}
	// const [login, setLogin] = useState({user: '', pass: ''})
	// onChange={value => setLogin(_.assign({}, login, {user: value}))}
	// onChange={value => setLogin(_.assign({}, login, {pass: value}))}
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const submitHandler = (e) => {
		e.preventDefault()
		const login = new Login(username, password)
		console.log(`Post form to API backend: ${login}`)
	}
	
	return <form method="post" action="/" onSubmit={submitHandler}
			className="mt-4 self-center flex flex-col shadow-lg rounded-xl border border-neutral-300 overflow-clip"
		>
		<div className="bg-white p-4
			flex flex-col items-center
		">
			<h3 className="text-4xl mb-4">Sign-In</h3>
			
			{/* FIXME The Lodash assignment looks a bit too overcomplicated. */}
			{/* FIXME classNameLabel? No good. */}
			<TextInput
				classNameLabel="text-xl min-w-80 flex items-center justify-between"
				className="text-base my-1 bg-orange-100 rounded-lg p-1 text-neutral-700 border-2 border-neutral-300 focus:border-green-400 outline-none"
				label='Username' name='username' placeholder='JohnDoe86' value={username}
				onChange={value => setUsername(value)}
			/>
			
			<TextInput
				classNameLabel="text-xl min-w-80 flex items-center justify-between"
				className="text-base my-1 bg-orange-100 rounded-lg p-1 text-neutral-700 border-2 border-neutral-300 focus:border-green-400 outline-none"
				label='Password' name='password' type="password" value={password}
				onChange={value => setPassword(value)}
			/>
		</div>
		
		<input type="submit" className="
			p-4 text-xl text-white bg-sky-400 cursor-pointer
			hover:bg-sky-600 active:bg-sky-700
		" />
	</form>
}
















