let expect = require('chai').expect;

let requireEnvAsObject = require('../../src/env');

describe('requireEnvAsObject', ()=> {
    describe('When the variable is not found in .en file', ()=> {
        it('should return null', (done)=> {
            let actual = requireEnvAsObject('MISSINGVARIABLE');
            expect(actual).to.be.equal(null);
            done();
        })
    });
    describe('When the variable is found in the file', ()=> {
        describe('and it is a string',()=>{
            it('should return a string',(done)=>{
                let actual = requireEnvAsObject('VARIABLE1');
                expect(actual).to.be.equal('value01');
                done();
            })
        });
        describe('and it is a JSON',()=>{
            it('should return a the json as object',(done)=>{
                let actual = requireEnvAsObject('VARIABLE2');
                expect(actual).to.be.deep.equal({value:'value01'});
                done();
            })
        })
    })
});
