let loadenvs = require('foreman/lib/envs').loadEnvs;
let envs = null;
/**
 * This methods reads the environment variable defined on the .env variable and returns a js object out of it.
 * @param variableName
 */
function requireEnvAsObject(variableName) {
    let filename = '.env';
    if(!envs)
        envs = loadenvs(filename);
    var config = envs[variableName];
    if(!config)
        return null;
    try{
        return JSON.parse(config);
    } catch(ex) {
        return config;
    }
}

module.exports = requireEnvAsObject;
