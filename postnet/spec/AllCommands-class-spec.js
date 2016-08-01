let MainCommand = require('../src/Commands/MainCommand.js');
let GoToZipToBarcodePageCommand = require('../src/Commands/GoToZipToBarcodePageCommand.js');
let TransformZipToBarcodeCommand = require('../src/Commands/TransformZipToBarcodeCommand.js');
let GoToBarToZipcodePageCommand = require('../src/Commands/GoToBarToZipcodePageCommand.js');
let TransformBarToZipcodeCommand = require('../src/Commands/TransformBarToZipcodeCommand.js');
let QuiteCommand = require('../src/Commands/QuiteCommand.js');
let OtherCommand = require('../src/Commands/OtherCommand.js');
let CommandResponse = require('../src/CommandResponse.js');

describe('AllCommands-class-spec', () => {
    it('mainCommand', () => {
        let mainCommand = new MainCommand();
        let text = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
        let next = false;
        let reset = false;
        let newMapping = null;
            expected = new CommandResponse(text, next, reset, newMapping);
        expect(mainCommand.execute()).toEqual(expected);
    });

    it('#1.goToZipToBarcodePageCommand', () => {
        let goToZipToBarcodePageCommand = new GoToZipToBarcodePageCommand();
        let text = 'Please input zip code:';
        let next = false;
        let reset = false;
        let newMapping = {'*': new TransformZipToBarcodeCommand(goToZipToBarcodePageCommand)};

        let expected = new CommandResponse(text, next, reset, newMapping);

        expect(goToZipToBarcodePageCommand.execute()).toEqual(expected);
    });

    it('#1.right input', () => {
        let transformZipToBarcodeCommand = new TransformZipToBarcodeCommand();
        let zipcode = '12345';
        let result = transformZipToBarcodeCommand.execute(zipcode);

        let text = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let next = false;
        let reset = true;
        let newMapping = null;
        let expected = new CommandResponse(text,next,reset,newMapping);

        expect(result).toEqual(expected);
    });
    it('#1.wrong input', () => {
        let transformZipToBarcodeCommand = new TransformZipToBarcodeCommand();
        let zipcode = '2345';
        let result = transformZipToBarcodeCommand.execute(zipcode);
        let text = 'Please give right input:\n';
        let next = transformZipToBarcodeCommand.goToZipToBarcodePage;
        let reset = false;
        let newMappiing = null;
        let expected = new CommandResponse(text,next,reset,newMappiing);
        expect(result).toEqual(expected);
    });
    it('#1. input wrong zipcode', () => {
        let transformZipToBarcodeCommand = new TransformZipToBarcodeCommand();
        let zipcode = '-2345';
        let result = transformZipToBarcodeCommand.execute(zipcode);
        let text = 'Please give right input:\n';
        let next = transformZipToBarcodeCommand.goToZipToBarcodePage;
        let reset = false;
        let newMappiing = null;
        let expected = new CommandResponse(text,next,reset,newMappiing);
        expect(result).toEqual(expected);
    });
    it('#1. input wrong zipcode', () => {
        let transformZipToBarcodeCommand = new TransformZipToBarcodeCommand();
        let zipcode = '12345-678-';
        let result = transformZipToBarcodeCommand.execute(zipcode);
        let text = 'Please give right input:\n';
        let next = transformZipToBarcodeCommand.goToZipToBarcodePage;
        let reset = false;
        let newMappiing = null;
        let expected = new CommandResponse(text,next,reset,newMappiing);
        expect(result).toEqual(expected);
    });
    it('#1. input wrong zipcode', () => {
        let transformZipToBarcodeCommand = new TransformZipToBarcodeCommand();
        let zipcode = '1234:';
        let result = transformZipToBarcodeCommand.execute(zipcode);
        let text = 'Please give right input:\n';
        let next = transformZipToBarcodeCommand.goToZipToBarcodePage;
        let reset = false;
        let newMappiing = null;
        let expected = new CommandResponse(text,next,reset,newMappiing);
        expect(result).toEqual(expected);
    });


    it('#2.goToBarToZipcodePage', () => {
        let goToBarToZipcodePageCommand = new GoToBarToZipcodePageCommand();
        let text = 'Please input bar code:';
        let next = false;
        let reset = false;
        let newMapping = {'*': new TransformBarToZipcodeCommand(goToBarToZipcodePageCommand)};
        let expected = new CommandResponse(text, next, reset, newMapping);
        expect(goToBarToZipcodePageCommand.execute()).toEqual(expected);

    });

    it('#2.right input', () => {
        let transformBarToZipcodeCommand = new TransformBarToZipcodeCommand();
        let barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let result = transformBarToZipcodeCommand.execute(barcode);
        let text = '12345';
        let next = false;
        let reset = true;
        let newMapping = null;
        let expected = new CommandResponse(text, next, reset, newMapping);
        expect(result).toEqual(expected);
    });

    it('#2.wrong input', () => {
        let transformBarToZipcodeCommand = new TransformBarToZipcodeCommand();
        let barcode = '|::|:|::||::|::|:|:|::|:|:|';
        let result = transformBarToZipcodeCommand.execute(barcode);
        let text = 'Please give right input:\n';
        let next = transformBarToZipcodeCommand.goToBarToZipcodePage;
        let reset = false;
        let newMapping = null;
        let expected = new CommandResponse(text, next, reset, newMapping);
        expect(result).toEqual(expected);
    });

    it('#3.quite', () => {
        let quiteCommand = new QuiteCommand();
        let text = 'Thanks for using';
        let next = false;
        let reset = false;
        let newMapping = null;
        let expected = new CommandResponse(text, next, reset, newMapping);
        expect(quiteCommand.execute()).toEqual(expected);

    });

    it('#other input', () => {
        let otherCommand = new OtherCommand();
        let mainCommand = new MainCommand();

        let text = 'Please give right input:\n';
        let next = mainCommand.execute();
        let reset = true;
        let newMapping = null;
        let expected = new CommandResponse(text, next, reset, newMapping);
        expect(otherCommand.execute()).toEqual(expected);
    });

});