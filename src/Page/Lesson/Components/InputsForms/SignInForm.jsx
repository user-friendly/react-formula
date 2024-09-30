
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
	
	return <div className="mt-4 flex flex-col justify-center items-center">
		
		<form method="post" action="/" onSubmit={submitHandler}
			className="flex flex-col justify-center items-center"
		>
			
			{/* FIXME The Lodash assignment looks a bit too overcomplicated. */}
			{/* FIXME classNameLabel? No good. */}
			<TextInput
				classNameLabel="text-xl min-w-80 flex items-center justify-between"
				className="text-base my-1 bg-orange-100 rounded-lg p-1 text-neutral-700 border-2 border-neutral-300 focus:border-green-400 outline-none"
				label='Username' name='username' placeholder='JohnDoe86' value={username} delay={600}
				onChange={value => setUsername(value)}
			/>
			
			<TextInput
				classNameLabel="text-xl min-w-80 flex items-center justify-between"
				className="text-base my-1 bg-orange-100 rounded-lg p-1 text-neutral-700 border-2 border-neutral-300 focus:border-green-400 outline-none"
				label='Password' name='password' type="password" value={password} delay={200}
				onChange={value => setPassword(value)}
			/>
			
			<input type="submit" className="
				cursor-pointer text-xl px-1 my-2 rounded-xl
				border-8
				bg-neutral-200 hover:border-green-200 active:border-green-600
			" />
		</form>
	</div>
}
















