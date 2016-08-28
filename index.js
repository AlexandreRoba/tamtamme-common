let MessageBus = require('./src/messagebus');
let requireEnvAsObject = require('./src/env');
let eventDefinition = require('./src/definition/event');
let commandDefinition = require('./src/definition/command');
let Command = require("./src/factory/command");
let NoLogger = require('./src/logger').NoLogger;
let getAuthenticationMiddleware = require('./src/middleware').getAuthenticationMiddleware;

module.exports = {
    MessageBus: MessageBus,
    requireEnvAsObject: requireEnvAsObject,
    commandDefinition: commandDefinition,
    eventDefinition: eventDefinition,
    Command: Command,
    noLogger: new NoLogger(),
    getAuthenticationMiddleware
};
