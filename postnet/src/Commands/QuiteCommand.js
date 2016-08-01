let CommandResponse = require('../CommandResponse.js');
class QuiteCommand {
    constructor() {
    }

    execute() {

        let text = 'Thanks for using';
        let next = false;
        let reset = false;
        let newMapping = null;

        return new CommandResponse(text, next, reset, newMapping);

    }

}

module.exports = QuiteCommand;