const events = require('events')
const emitter = new events.EventEmitter();

/*emitter.on('knock', () => {
	console.log('Who\'s there')
})

emitter.on('knock', () => {
	console.log('Go away')
})*/

emitter.once('knock', () => {
	console.log('Who\'s there')
})

emitter.on('knock', () => {
	console.log('Go away')
})

emitter.emit('knock')
emitter.emit('knock')