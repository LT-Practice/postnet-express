let ZipcodeTranslater = require('../ZipcodeTranslater.js');
let CommandResponse = require('../CommandResponse.js');

class TransformZipToBarcodeCommand {
    constructor(next) {
        this.next = next;
    }

    execute(zipcode) {
        // let zipcodeTranslater = new ZipcodeTranslater();
        // let coreResponse = new ZipcodeTranslater().zipcodeToBarcode(zipcode);
        let coreResponse = new ZipcodeTranslater().checkZipcode(zipcode);
        if (coreResponse.type) {
            let coreResponse = new ZipcodeTranslater().zipcodeToBarcode(zipcode);
            let text = coreResponse._result;
            let next = false;
            let reset = true;
            let newMapping = null;

            return new CommandResponse(text, next, reset, newMapping);

        } else {
            let text = 'Please give right input:\n';
            let next = this.next;
            let reset = false;
            let newMapping = null;
            return new CommandResponse(text, next, reset, newMapping);


        }
    }
}

module.exports = TransformZipToBarcodeCommand;
