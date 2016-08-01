let BarcodeTranslater = require('../src/BarcodeTranslater.js');
let  CoreResponse = require('../src/CoreResponse');
// var allCodes = require('../src/codes');
let barcodeTranslater = new BarcodeTranslater();

describe('BarcodeTranslater-class-spec', () => {
    it('execute', () => {
        let barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
        // let zipcode = barcodeToZipcode.barcodeToZipcode(barcode);
        // let expected = {
        //     _result: '12345',
        //     _type: true
        // };
        let expected = new CoreResponse('12345', true);
        expect(barcodeTranslater.execute(barcode)).toEqual(expected);
    });
});