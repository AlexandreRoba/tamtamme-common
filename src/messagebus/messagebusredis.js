const redis = require('redis');

/**
 * @typedef {object} MessageBusRedisConfig
 * @property {string} type - this should be set to 'redis'
 * @property {string} [host=localhost] - the redis host server name
 * @property {number} [port=6379] - the redis server port
 * @property {string} [password=] - the connection password
 * @property {string} [prefix=] - the prefix
 * @property {string} [commandsCollectionName=commands] - The commands collection name
 * @property {string} [eventsCollectionName=events] - The events collection name
 */

/**
 * @typedef {object} RedisOptions
 * @property {string} [host=localhost] - the redis host server name
 * @property {number} [port=6379] - the redis server port
 * @property {string} [password=] - the connection password
 * @property {string} [prefix=] - the prefix
 */

/**
 * The messagebus based on redis as the pub/sub provider
 * @param {MessageBusRedisConfig} messageBusRedisOptions
 * @param {Logger} logger
 * @constructor
 */
function MessageBusRedis(messageBusRedisOptions, logger) {
    this.logger = logger || require('log4js').getLogger();
    messageBusRedisOptions.host = messageBusRedisOptions.host || 'localhost';
    messageBusRedisOptions.port = messageBusRedisOptions.port || 6379;
    messageBusRedisOptions.commandsCollectionName = messageBusRedisOptions.commandsCollectionName || 'commands';
    messageBusRedisOptions.eventsCollectionName = messageBusRedisOptions.eventsCollectionName || 'events';

    /** @type RedisOptions */
    this.redisOptions = {
        host: messageBusRedisOptions.host,
        port: messageBusRedisOptions.port,
    };
    if (messageBusRedisOptions.password){ this.redisOptions.password = messageBusRedisOptions.password;}
    if (messageBusRedisOptions.prefix){ this.redisOptions.prefix = messageBusRedisOptions.prefix;}


    this.commandsCollectionName = messageBusRedisOptions.commandsCollectionName;
    this.eventsCollectionName = messageBusRedisOptions.eventsCollectionName;


    this.evtSubscriptions = [];
    this.cmdSubscriptions = [];

    this.logger.debug('Redis connection '+messageBusRedisOptions.host+':'+messageBusRedisOptions.port);
    this.publisher = redis.createClient(this.redisOptions);
    this.subscriber = redis.createClient(this.redisOptions);
    let self = this;
    this.subscriber.on('message', (channel, message)=> {
        if (channel === this.eventsCollectionName) {
            let event = JSON.parse(message);
            self.evtSubscriptions.forEach((subscriber)=> {
                subscriber(event);
            });
        } else if (channel === this.commandsCollectionName) {
            let command = JSON.parse(message);
            self.cmdSubscriptions.forEach((subscriber)=> {
                subscriber(command);
            });

        }
    });
}

MessageBusRedis.prototype = {
    emitCommand(command) {
        this.publisher.publish(this.commandsCollectionName, JSON.stringify(command));
    },

    onCommand(callback) {
        if (this.cmdSubscriptions.length === 0) {
            this.subscriber.subscribe(this.commandsCollectionName);
        }
        this.cmdSubscriptions.push(callback);
    },

    emitEvent(event) {
        this.publisher.publish(this.eventsCollectionName, JSON.stringify(event));
    },

    onEvent(callback) {
        if (this.evtSubscriptions.length === 0) {
            this.subscriber.subscribe(this.eventsCollectionName);
        }
        this.evtSubscriptions.push(callback);
    }
};


module.exports = MessageBusRedis;
