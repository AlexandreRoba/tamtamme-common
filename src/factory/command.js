let uuid = require('uuid');

/**
 * Create a command not related to an aggregate
 * @param {string} name - The command name
 * @param {object} aggregate - The aggregate identity
 * @param {object} payload - The command payload
 * @constructor {Command}
 */
function Command(name,aggregate,payload){

    if(!name)
        throw new Error('The command name cannot be null or empty');
    if (!payload){
        payload = aggregate;
    }
    this.name = name;
    this.id = uuid.v1();
    this.payload = payload || {};
    this.aggregate = aggregate || {};
}

module.exports = Command;
