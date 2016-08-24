let expect = require('chai').expect;
let Command = require('../../src/factory/command');

describe('Command',()=>{
   describe('#constructor',()=>{
       describe('When called empty',()=>{
           it('should throw an error',()=>{
               expect(()=>{let sut = new Command();}).to.throw(Error);
           })
       });
       describe('When called with no commandId',()=>{
           let sut = new Command('name');
           it('should set the name',()=>{
              expect(sut.commandName).to.be.equal('name');
           });
           it('should generate a command id',()=>{
               expect(sut.commandId).to.not.equal(null);
           });
           it('should set the payload to an empty object',()=>{
               expect(sut.payload).to.deep.equal({});
           })
       })
   })
});
