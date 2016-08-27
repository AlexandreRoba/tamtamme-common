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
           it('should set the payload to an empty object',()=>{
               expect(sut.payload).to.deep.equal({});
           })
       });
       describe('when called with an aggregate id and name',()=>{
           it('should set the aggregate id and name',(done)=>{
               let sut = new Command('command',{id:1,name:'aggregate'},{});
               expect(sut.aggregate.id).to.equal(1);
               expect(sut.aggregate.name).to.equal('aggregate');
               done();
           })
       })
       describe('when called without aggregate info but a payload',()=>{
           it('should get the paylod from the second parameter',(done)=>{
               let sut = new Command('command',{param1:'value1'});
               expect(sut.payload).to.deep.equal({param1:'value1'});
               done();
           })
       })
   })
});
