let ZipcodeTranslater = require('../src/ZipcodeTranslater.js');
// var allCodes = require('../src/codes');
let  CoreResponse = require('../src/CoreResponse');



let transtlater = new ZipcodeTranslater();
describe('ZipcodeTranslater-class-spec', () => {
    it('execute', () => {
        let zipcode = '12345';
        let expected = new CoreResponse('|:::||::|:|::||::|::|:|:|::|:|:|',true)
        expect(transtlater.execute(zipcode)).toEqual(expected);
    });


});