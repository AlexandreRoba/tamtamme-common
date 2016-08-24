let uuid = require('uuid');

/**
 * Create a command
 * @param {string} commandName - The command name
 * @param {string} {commandId} - A command id
 * @param {object} payload - The command paylod
 * @constructor {Command}
 */
function Command(commandName,commandId,payload){
    if(!commandName)
        throw new Error('The command name cannot be null or empty');
    this.commandName = commandName;
    this.commandId = commandId || uuid.v1();
    this.payload = payload || {};
}

module.exports = Command;
