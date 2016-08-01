const MainCommand = require("./Commands/MainCommand");
const GoToZipToBarcodePageCommand = require('./Commands/GoToZipToBarcodePageCommand');
const GoToBarToZipcodePageCommand = require('./Commands/GoToBarToZipcodePageCommand');
const QuiteCommand = require('./Commands/QuiteCommand');

class Route {
    constructor() {
        this.mapping = {
            '1': new GoToZipToBarcodePageCommand(),
            '2': new GoToBarToZipcodePageCommand(),
            '3': new QuiteCommand(),
            'main': new MainCommand()
        };

    }


    execute(input) {
        let command = this.mapping[input];
        let result = '';
        let response = '';
        if (command) {
            response = command.execute(input);
            result += response.text;
        } else if (this.mapping['*']) {
            response = this.mapping['*'].execute(input);
            result += response.text;
        } else {
            return 'no command Please give right input:';
        }


        if (response.next) {
            let newResponse = '';
            do {
                newResponse = response.next.execute(input);
                result += newResponse.text;

            } while (newResponse.next);
        }


        if (response.newMapping) {
            this.mapping = response.newMapping;
        }


        if (response.reset) {
            this.reset();
            result += `\n`;
            result += this.mapping['main'].execute()._text;
        }
        return result;
    }


    reset() {
        this.mapping = {
            '1': new GoToZipToBarcodePageCommand(),
            '2': new GoToBarToZipcodePageCommand(),
            '3': new QuiteCommand(),
            'main': new MainCommand()
        };
    };

}

module.exports = Route;
