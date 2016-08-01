let ZipcodeTranslater = require('../ZipcodeTranslater.js');
let CommandResponse = require('../CommandResponse.js');

class MainCommand {
    constructor() {
    }

    execute() {
        let text = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;

        let next = false;
        let reset = false;
        let newMapping = null;
        return new CommandResponse(text, next, reset, newMapping);

    }


}

module.exports = MainCommand;
