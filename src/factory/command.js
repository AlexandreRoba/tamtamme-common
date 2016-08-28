let uuid = require('uuid');

/**
 * Create a command not related to an aggregate
 * @param {string} name - The command name
 * @param {object} aggregate - The aggregate identity
 * @param {object} payload - The command payload
 * @param {object} meta - The command meta
 * @constructor {Command}
 */
function Command(name, aggregate, payload, meta) {
    if (!name)
        throw new Error('The command name cannot be null or empty');
    if (!meta && payload && aggregate) {
        meta = payload;
        payload = aggregate;
        aggregate=null;
    }
    if (!meta && !payload) {
        payload = aggregate;
        aggregate=null;
    }
    this.name = name;
    this.id = uuid.v1();
    this.payload = payload || {};
    this.aggregate = aggregate || {};
    this.meta = meta || {};
}

module.exports = Command;
