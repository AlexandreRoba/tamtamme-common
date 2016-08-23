const EventEmitter = require('events');

/**
 * The messagebus based on an event emitter
 * @param {EventEmitter} [eventEmitter] - An event emitter to support testing scenarios.
 * @constructor
 */
function MessageBusInMemory(eventEmitter) {
    this.evtSubscriptions = [];
    this.cmdSubscriptions = [];

    this.eventEmitter = eventEmitter || new EventEmitter();
    this.eventEmitter.on('event', (event)=> {
        this.evtSubscriptions.forEach((subscriber)=> {
            subscriber(event);
        });
    });
    this.eventEmitter.on('command', (command)=> {
        this.cmdSubscriptions.forEach((subscriber)=> {
            subscriber(command);
        });
    });
}

MessageBusInMemory.prototype = {
    emitCommand(command) {
        this.eventEmitter.emit('command', command);
    },
    onCommand(callback) {
        this.cmdSubscriptions.push(callback);
    },
    emitEvent(event) {
        this.eventEmitter.emit('event', event);
    },
    onEvent(callback) {
        this.evtSubscriptions.push(callback);
    }
};


module.exports = MessageBusInMemory;