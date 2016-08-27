let expect = require('chai').expect;
let NoLogger = require('../../src/logger').NoLogger;

describe("nologger", ()=> {
    describe("should have all logging methods of the log4js logger", ()=> {
        it('does', (done)=> {
            let logger = new NoLogger();
            logger.debug();
            logger.info();
            logger.warn();
            logger.trace();
            logger.debug();
            logger.mark();
            logger.fatal();
            done();
        });
    })
});
