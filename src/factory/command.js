let uuid = require('uuid');

/**
 * Create a command not related to an aggregate
 * @param {string} name - The command name
 * @param {object} aggregate - The aggregate identity
 * @param {object} payload - The command payload
 * @param {object} meta - The command meta
 * @constructor {Command}
 */
function Command(name,payload, meta,aggregate) {
    if (!name)
        throw new Error('The command name cannot be null or empty');
    this.id = uuid.v1();
    this.name = name;
    if(payload)
        this.payload = payload;
    if(aggregate)
        this.aggregate = aggregate;
    if(meta)
        this.meta = meta;
}

module.exports = Command;
