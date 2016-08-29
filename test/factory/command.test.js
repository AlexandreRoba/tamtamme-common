let expect = require('chai').expect;
let Command = require('../../src/factory/command');

describe('Command',()=>{
   describe('#constructor',()=>{
       describe('When called empty',()=>{
           it('should throw an error',()=>{
               expect(()=>{let sut = new Command();}).to.throw(Error);
           })
       });
       describe('When called with no command Id',()=>{
           let sut = new Command('name');
           it('should set the name',()=>{
              expect(sut.name).to.be.equal('name');
           });
           it('should generate a command id',()=>{
               expect(sut.id).to.not.equal(null);
           });
           it('should not set the payload',()=>{
               expect(sut.payload).to.not.equal(true);
           })
       });
       describe('when called with an aggregate id and name',()=>{
           it('should set the aggregate id and name',(done)=>{
               let aggregate = {id:1,name:'aggregate'};
               let sut = new Command('command',{},{},aggregate);
               expect(sut.aggregate.id).to.equal(1);
               expect(sut.aggregate.name).to.equal('aggregate');
               done();
           })
       });
       describe('when called without aggregate info but a payload',()=>{
           it('should set the meta and the aggregate to null',(done)=>{
               let payload = {param1:'value1'};
               let sut = new Command('command',payload);
               expect(sut.payload).to.deep.equal({param1:'value1'});
               expect(sut.meta).to.not.equal(true);
               expect(sut.aggregate).to.not.equal(true);
               done();
           })
       })
   })
});
