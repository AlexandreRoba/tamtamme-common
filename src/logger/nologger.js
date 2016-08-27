function NoLogger(){

}

NoLogger.prototype = {
    info(){},
    trace(){},
    error(){},
    debug(){},
    warn(){},
    fatal(){},
    mark(){}
};

module.exports = NoLogger;