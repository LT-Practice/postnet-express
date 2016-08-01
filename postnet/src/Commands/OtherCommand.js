let MainCommand = require('./MainCommand');
let CommandResponse = require('../CommandResponse.js');


class OtherCommand {

    constructor() {
    }

    execute() {
        let mainCommand = new MainCommand();
        let text = 'Please give right input:\n';
        let next = mainCommand.execute();
        let reset = true;
        let newMapping = null;

        return new CommandResponse(text, next, reset, newMapping);

    }
}

module.exports = OtherCommand;