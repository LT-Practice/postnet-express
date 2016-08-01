let TransformZipToBarcodeCommand = require('./TransformZipToBarcodeCommand');
let CommandResponse = require('../CommandResponse.js');


class GoToZipToBarcodePageCommand {
    constructor() {
    }

    execute() {
        // let self = this;
        let text = `Please input zip code:`;
        let next = false;
        let reset = false;
        let newMapping = {'*': new TransformZipToBarcodeCommand(this)};
        return new CommandResponse(text, next, reset, newMapping);

    }
}

module.exports = GoToZipToBarcodePageCommand;


