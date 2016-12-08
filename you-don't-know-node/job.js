var util = require('util')
var events = require('events')
var Job = function Job() {
	var job = this

	job.process = function() {
		setTimeout(function() {
			job.emit('done', { completedOn: new Date() })
		}, 700)
	}

	job.on('start', function() {
		job.process()
	})
}

util.inherits(Job, events.EventEmitter)
module.exports = Job