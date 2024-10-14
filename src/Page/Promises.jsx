import _ from 'lodash'

import {useState, useEffect, useSyncExternalStore, Fragment} from 'react'

import Router from '#Router'

const DEFAULT_BATCH_SIZE = 2

async function sleep(ms) {
    return await new Promise((s, e) => setTimeout(() => s(), ms))
}

const Button = (props) => {
	return <button className="my-2 mx-1 px-2 py-1 bg-blue-500 text-xl text-white rounded-md hover:bg-blue-600 active:bg-blue-700" {...props}>{props.children}</button>
}

const Message = (props) => {
	const classBase = 'm-1 py-1 px-2 rounded-md border border-neutral-300 text-lg bg-white'
	const classSuccess = 'm-1 py-1 px-2 rounded-md border border-neutral-300 text-lg text-green-500 bg-green-200 font-bold'
	const classError = 'm-1 py-1 px-2 rounded-md border border-neutral-300 text-lg text-red-500 bg-red-200 font-bold'
	
	let classType = classBase
	if (props.type === 'error') {
		classType = classError
	} else if (props.type === 'success') {
		classType = classSuccess
	}
	
	const className = `${classType} ${props.className}`
	return <span {...props} className={className}>{props.children}</span>
}

class LogStore {
	#logs = []
	#listeners = []
	
	#tid = 0
	
	constructor() {
		this.log('This is an ordinary message.')
		this.logSuccess('This is a success message.')
		this.logError('This is an error message.')
		this.log('This is an ordinary message. But, it is very, very, very, very, very, very, very, very, very, long.')
	}
	
	#push(obj) {
		// IMPORTANT Returning a new array to the subscribers (getSnapshot)
		//			 will cause an infinite loop (in dev at least).
		this.#logs = [...this.#logs, obj]
		
		clearTimeout(this.#tid)
		this.#tid = setTimeout(() => {
			this.#notifyAll()
		}, 250)
		
		return this
	}
	
	log(obj) {
		this.#push(<Message>{obj}</Message>)
	}
	
	logSuccess(obj) {
		this.#push(<Message type='success'>{obj}</Message>)
	}
	
	logError(obj) {
		this.#push(<Message type='error'>{obj}</Message>)
	}
	
	getAll() {
		return this.#logs
	}
	
	clear() {
		this.#logs = []
		this.#notifyAll()
		return this
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
const logger = new LogStore()

let sid = 0

async function sweetPromise() {
    const id = sid++
    logger.log(`Promise (${id}): start async work`)
    await sleep(500)//(500 + _.random(0, 500))
	const rn = _.random(1, 100)
    if (rn > 70) {
        throw `Promise (${id}): promise rejected: invalid number '${rn}'`
    }
    logger.log(`Promise (${id}): done with the work`)
    return `Promise (${id}): result is ${rn}`
}

function doWork() {
    return sweetPromise()
}

async function doBatch(size) {
	size = _.toInteger(size)
	const BATCH_MAX = size > 0 && size <= 128 ? size : DEFAULT_BATCH_SIZE
	
	logger.log(`Lunch a batch of ${BATCH_MAX} worker(s).`)
	for (let i = 0; i < BATCH_MAX; i++) {
	    doWork()
			.then(r => logger.logSuccess(`A worker has finished: ${r}`))
			.catch(e => logger.logError(`A worker has FAILED: ${e}`))
	}
}

const Promises = () => {
	const [batch, setBatch] = useState(DEFAULT_BATCH_SIZE)
	const [refresh, setRefresh] = useState(0)
	
	const logStore = useSyncExternalStore(_.bind(logger.subscribe, logger), _.bind(logger.getSnapshot, logger))
	
	if (refresh > 0) {
		console.log(`manually refreshed ${refresh} times`)
	}
	
	return <div className="my-6 flex flex-col items-center">
		<h2 className="mb-6 text-3xl">JavaScript Promise Shenanigans</h2>
		
		<h3 className="text-xl">Logs</h3>
		
		<div className="w-[720px] my-6 flex flex-col">
			{logStore.map((m, k) => <Fragment key={k}>{m}</Fragment>)}
		</div>
		
		<div>
			<input className="my-2 mx-1 px-2 py-1 w-16 bg-blue-100 text-xl rounded-md"
				type="number" min={1} max={128}
				name="batchSize" value={batch} onChange={e => setBatch(e.target.value)}
			/>
			<Button onClick={() => doBatch(batch)}>Run</Button>
			<Button onClick={() => logger.clear()}>Clear</Button>
			<Button onClick={() => setRefresh(refresh + 1)}>Reload</Button>
		</div>
	</div>
}

Router.setRoute('/lesson/misc/promises', <Promises />, 'Misc: JS Promise/Async')

export default Promises











