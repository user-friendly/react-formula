import _ from 'lodash'

import {useState, useEffect, useSyncExternalStore, Fragment} from 'react'

import Router from '#Router'

async function sleep(ms) {
    return await new Promise((s, e) => setTimeout(() => s(), ms))
}

class LogStore {
	#logs = []
	#listeners = []
	
	#tid = 0
	
	log(obj) {
		// IMPORTANT Returning a new array to the subscribers (getSnapshot)
		//			 will cause an infinite loop (in dev at least).
		this.#logs = [...this.#logs, obj]
		
		clearTimeout(this.#tid)
		this.#tid = setTimeout(() => {
			this.#notifyAll()
		}, 500)
		
		return this
	}
	
	getAll() {
		return this.#logs
	}
	
	subscribe(listener) {
	  this.#listeners = [...this.#listeners, listener]
	  return () => {
	    this.#listeners = this.#listeners.filter(l => l !== this.#listeners)
	  }
	}
	
	getSnapshot() {
	  return this.getAll();
	}
	
	#notifyAll() {
		for (let listener of this.#listeners) {
	    	listener()
	  	}
	}
}
const logs = new LogStore()

let sid = 0

async function sweetPromise() {
    const id = sid++
    console.log(`Promise (${id}): start async work`)
    await sleep(500)
    const rn = Math.floor(Math.random() * 100)
    if (rn > 70) {
        throw `Promise (${id}): promise rejected: invalid number '${rn}'`
    }
    await sleep(500)
    console.log(`Promise (${id}): done with the work`)
    return `Promise (${id}): result is ${rn}`
}

function doWork() {
    return sweetPromise()
}

async function doBatch() {	
	const BATCH_MAX = 2
	
	console.log(`lunch a batch of ${BATCH_MAX}`)
	for (let i = 0; i < BATCH_MAX; i++) {
	    doWork()
			.then(r => logs.log(<Message>`A worker has finished: ${r}`</Message>))
			.catch(e => logs.log(<Message className="text-red-600 font-bold">{`A worker has FAILED: ${e}`}</Message>))
	}
}

const Message = (props) => {
	return <span {...props}>{props.children}</span>
}

const Button = (props) => {
	return <button className="my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700" {...props}>{props.children}</button>
}

const Promises = () => {
	const [refresh, setRefresh] = useState(0)
	
	const logStore = useSyncExternalStore(_.bind(logs.subscribe, logs), _.bind(logs.getSnapshot, logs))
	
	if (refresh > 0) {
		console.log(`manually refreshed ${refresh} times`)
	}
	
	useEffect(() => {
		// setMessages([...logs.getAll()])
	}, [refresh])
	
	return <div className="my-6 flex flex-col items-center">
		<h2 className="mb-6 text-3xl">JavaScript Promise Shenanigans</h2>
		
		<h3 className="text-xl">Logs</h3>
		
		<div className="my-6 flex flex-col items-center">
			{logStore.map((m, k) => <Fragment key={k}>{m}</Fragment>)}
		</div>
		
		<div>
			<Button onClick={() => doBatch()}>Run</Button>
			<Button onClick={() => setRefresh(refresh + 1)}>Reload</Button>
		</div>
	</div>
}

Router.setRoute('/lesson/misc/promises', <Promises />, 'Misc: JS Promise/Async')

export default Promises
