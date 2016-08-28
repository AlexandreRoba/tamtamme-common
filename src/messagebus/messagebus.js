var MessageBusRedis = require('./messagebusredis');
var MessageBusInMemory = require('./messagebusinmemory');
let log4js = require('log4js');

/**
 * Create a new Message Bus
 * @param {MessageBusRedisConfig} options
 * @param {object} logger
 * @constructor {MessageBus}
 */
function MessageBus(options, logger) {
    this.logger = logger || log4js.getLogger();
    if (options.type === 'redis') {
        this.logger.debug('Redis Message Bus Type requested.');
        this.messageBus = new MessageBusRedis(options, this.logger);
    } else {
        this.logger.warn('InMemory Message Bus Type requested.');
        this.messageBus = new MessageBusInMemory(this.logger);
    }
}

MessageBus.prototype = {
    /**
     * Publish a command to the command listeners
     * @param {object} command - The command to publish to the command listeners
     */
    emitCommand(command) {
        this.logger.debug('MessageBus emit command:' + JSON.stringify(command));
        this.messageBus.emitCommand(command);
    },
    /**
     * Register a command listener
     * @param {function} callback - The command handler to be registered
     */
    onCommand(callback) {
        this.logger.debug('MessageBus command handler registered.');
        this.messageBus.onCommand(callback);
    },
    /**
     * Publish en event to the event listeners
     * @param {object} event - The event to publish to the event listeners
     */
    emitEvent(event) {
        this.logger.trace('MessageBus emit event:' + JSON.stringify(event));
        this.messageBus.emitEvent(event);
    },
    /**
     * Register an event listener
     * @param {function} callback - The event handler top be registered
     */
    onEvent(callback) {
        this.logger.debug('MessageBus event handler registered.');
        this.messageBus.onEvent(callback);
    }


};

module.exports = MessageBus;
