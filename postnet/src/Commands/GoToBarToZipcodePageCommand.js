let CommandResponse = require('../CommandResponse.js');

let TransformBarToZipcodeCommand = require('./TransformBarToZipcodeCommand');
class GoToBarToZipcodePageCommand {
    constructor() {
    }

    execute() {
        // let self = this;
        let text = `Please input bar code:`;
        let next = false;
        let reset = false;
        let newMapping = {'*': new TransformBarToZipcodeCommand(this)};

        return new CommandResponse(text, next, reset, newMapping);
    }
}

module.exports = GoToBarToZipcodePageCommand;