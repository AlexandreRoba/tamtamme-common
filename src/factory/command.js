let uuid = require('uuid');

/**
 * Create a command
 * @param {string} commandName - The command name
 * @param {object} payload - The command paylod
 * @constructor {Command}
 */
function Command(commandName,payload){
    if(!commandName)
        throw new Error('The command name cannot be null or empty');
    this.commandName = commandName;
    this.commandId = uuid.v1();
    this.payload = payload || {};
}

module.exports = Command;
