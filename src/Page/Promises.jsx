import _ from 'lodash'

import {useState, useEffect, useSyncExternalStore, Fragment} from 'react'

import Router from '#Router'

import Loopy from '#Components/Loopy'

const DEFAULT_BATCH_SIZE = 1

async function sleep(ms) {
    return await new Promise((r) => setTimeout(() => r(), ms))
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
		/*this.log('This is an ordinary message.')
		this.logSuccess('This is a success message.')
		this.logError('This is an error message.')
		this.log('This is an ordinary message. But, it is very, very, very, very, very, very, very, very, very, long.')*/
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

// Serial id, for workers.
let sid = 0

async function sweetPromise(work) {
    const id = sid++
    logger.log(`Promise (${id}): Start async work: ${work}.`)
    await sleep(500)//(500 + _.random(0, 500))
	const rn = _.random(1, 100)
    if (rn > 50) {
        throw `Promise (${id}): Worker (${work}) rejected: error(${rn})`
    }
    logger.log(`Promise (${id}): Done with the work: ${work}.`)
    return `Promise (${id}): result is ${rn}`
}

function doWork(work) {
    return sweetPromise(work)
}

function getBatch(size) {
	size = _.toInteger(size)
	return size > 0 && size <= 128 ? size : DEFAULT_BATCH_SIZE
}

async function doBatchV1(size, work = '') {
	const BATCH_MAX = getBatch(size)
	logger.log(`Lunch a batch of ${BATCH_MAX} worker(s).`)
	for (let i = 0; i < BATCH_MAX; i++) {
	    doWork(work)
			.then(r => logger.logSuccess(`A worker has finished: ${r}`))
			// Equivalent to .then(null, e => {})
			.catch(e => logger.logError(`A worker has FAILED: ${e}`))
	}
}

async function doBatchV2(size, work = '') {
	const BATCH_MAX = getBatch(size)
	logger.log(`Lunch a batch of ${BATCH_MAX} worker(s).`)
	for (let i = 0; i < BATCH_MAX; i++) {
	    doWork(work)
			.then(r => {
				logger.logSuccess(`A worker has finished: ${r}, queue up another worker.`)
				return doWork(`Subworker of ${work}`)
			})
			.then(r => logger.logSuccess(`A subworker has finished: ${r}`))
			// Equivalent to .then(null, e => {})
			.catch(e => logger.logError(`A worker has FAILED: ${e}`))
	}
}

async function doBatchV3(size, work = '') {
	let p = null
	const BATCH_MAX = getBatch(size)
	logger.log(`Lunch a batch of ${BATCH_MAX} worker(s).`)
	for (let i = 0; i < BATCH_MAX; i++) {
	    p = doWork(work)
		 	.then(r => {
				logger.logSuccess(`Chain 1, resolved & complete: ${r}`)
				return r
			})
			// Equivalent to .then(null, e => {})
			.catch(async (e) => {
				logger.logError(`Chain 1, failed: ${e}`)
				await sleep(250)
				if (_.random(1) === 1) {
					return `Chain 1, restart worker from the failed state: ${e}`
				} else {
					throw Error(`Chain 1, throw an error down the chains: ${e}`)
				}
			})
		
		// Chain 1 processing. Other chains will wait for chain 1's promise fulfillment.
		// Var `p` is the mutated promise returned by the last .catch() method.
		// Chain 2 & 3 will execute in an async manner. If you want all chains to be
		// async, don't store the promise returned by the last .catch() of chain 1.
		// Refactor to: p = doWork(); p.then(...chain 1...
		
		p.then(async r => {
			logger.log(`Chain 2.1, resolved for: ${r}`)
			await sleep(250)
			logger.log(`Chain 2.1, did some work for: ${r}`)
			return r
		}).then(r => {
				logger.log(`Chain 2.2, resolved: ${r}`)
				return r
			})
			.finally(() => logger.log('Chain 2.3, final.'))
			.then(r => logger.logSuccess(`Chain 2.4, resolved & complete: ${r}`))
			.catch((e) => {})
		
		p.then(r => {
			if (_.random(2) >= 1) {
				logger.log(`Chain 3, queue up subworker of ${r}`)
				return doWork(`Subworker of ${r}`)
					.then((r) => logger.logSuccess(`Chain 3, subworker resolved & complete: ${r}`))
					.catch((e) => logger.logError(`Chain 3, subwoker failed: ${e}`))
			}
			logger.logSuccess(`Chain 3, resolved & complete: ${r}`)
		})
		
		p.catch(e => logger.logError(`Chain 4, failed: ${e}`))
	}
}

const Promises = () => {
	const [batch, setBatch] = useState(DEFAULT_BATCH_SIZE)
	const [refresh, setRefresh] = useState(0)
	
	const logStore = useSyncExternalStore(_.bind(logger.subscribe, logger), _.bind(logger.getSnapshot, logger))
	
	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight)
	}, [logStore])
	
	return <div className="my-6 flex flex-col items-center">
		<h2 className="mb-6 text-3xl">JavaScript Promise Shenanigans</h2>
		
		<h3 className="text-xl">Logs</h3>
		
		<div className="w-[720px] my-6 flex flex-col">
			{logStore.map((m, k) => <Fragment key={k}>{m}</Fragment>)}
		</div>
		
		<div className="">
			<div>
				<input className="my-2 mx-1 px-2 py-1 w-16 bg-blue-100 text-xl rounded-md"
					type="number" min={1} max={128}
					name="batchSize" value={batch} onChange={e => setBatch(e.target.value)}
				/>
				<Button onClick={() => doBatchV1(batch, 'vanilla')}>Run v1</Button>
				<Button onClick={() => doBatchV2(batch, 'apple')}>Run v2</Button>
				<Button onClick={() => doBatchV3(batch, 'orange')}>Run v3</Button>
				<Button onClick={() => logger.clear()}>Clear</Button>
				<Button onClick={() => {
					setRefresh(refresh + 1)
					setBatch(DEFAULT_BATCH_SIZE)
					logger.clear()
					sid=0
				}}>Reload</Button>
			</div>
			
			<div>
				<Button onClick={() => Loopy()}>Loopy</Button>
			</div>
		</div>
	</div>
}

Router.setRoute('/lesson/misc/promises', <Promises />, 'Misc: JS Promise/Async')

export default Promises
