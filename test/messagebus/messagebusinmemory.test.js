let expect = require('chai').expect;

let MessageBusInMemory = require('../../src/messagebus/messagebusinmemory');

let currentValue=0;
let spy = function(done){
    currentValue+=1;
    if(currentValue>=3)
        done();
};

describe('messageBusInMemory',()=>{
    beforeEach((done)=>{
        currentValue = 0;
        done();
    });
    describe('When one subscriber to the commands',()=>{
        describe('And a command is emitted',()=>{
            it('should trigger the subscriber',(done)=>{
                let sut = new MessageBusInMemory();
                sut.onCommand(()=>{
                    done();
                });
                sut.emitCommand({});
            })
        })
    });
    describe('When several subscribers to the events',()=>{
        describe('And an event is emitted',()=>{
            it('should trigger all subscribers',(done)=>{
                let sut = new MessageBusInMemory();
                sut.onCommand(()=>{
                    spy(done);
                });
                sut.onCommand(()=>{
                    spy(done);
                });
                sut.onCommand(()=>{
                    spy(done);
                });
                sut.emitCommand({});
            })
        })
    });
    describe('When one subscriber to the events',()=>{
        describe('And an event is emitted',()=>{
            it('should trigger the subscriber',(done)=>{
                let sut = new MessageBusInMemory();
                sut.onEvent(()=>{
                    done();
                });
                sut.emitEvent({});
            })
        })
    });
    describe('When several subscribers to the events',()=>{
        describe('And an event is emitted',()=>{
            it('should trigger all subscribers',(done)=>{
                let sut = new MessageBusInMemory();
                sut.onEvent(()=>{
                    spy(done);
                });
                sut.onEvent(()=>{
                    spy(done);
                });
                sut.onEvent(()=>{
                    spy(done);
                });
                sut.emitEvent({});
            })
        })
    })
});
