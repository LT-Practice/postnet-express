let Route = require('../src/Route.js');
describe('Route-class-spec', () => {

    it('#1.start', () => {
        let route = new Route();

        let response = route.execute('main');
        let expected = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
        expect(response).toEqual(expected)
    });

    it('#2.input 1 goToZipToBarcodePage', () => {
        let route = new Route();
        let response = route.execute('1');
        // console.log(response);
        let expected = `Please input zip code:`;
        expect(response).toEqual(expected);
    });


    it('#3.input a right zipcode to trnsformZipToBarcodeCommand', () => {
        let route = new Route();
        route.execute('1');
        let response = route.execute('12345');
        let expected = `|:::||::|:|::||::|::|:|:|::|:|:|\n
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;

        expect(response).toEqual(expected);


    });

    it('#4.input a wrong zipcode transformZipToBarcodeCommand', () => {
        let route = new Route();
        route.execute('1');
        let response = route.execute('1234');
        let expected = 'Please give right input:\nPlease input zip code:';
        expect(response).toEqual(expected);
    });


    it('#5.input 2 goToBarToZipcodePage', () => {
        let route = new Route();
        let response = route.execute('2');
        let expected = `Please input bar code:`;
        expect(response).toEqual(expected);
    });

    it('#6.input a right barcode', () => {
        let route = new Route();
        route.execute('2');
        let response = route.execute('|:::||::|:|::||::|::|:|:|::|:|:|');
        let expected = '12345\n';
        expected += `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`
        expect(response).toEqual(expected);
    });

    it('#7.input a wrong barcode to transformZipToBarcodeCommand ', () => {
        let route = new Route();
        route.execute('2');
        let response = route.execute('|:::||::|:|::||::|::|:|:|::');
        let expected = 'Please give right input:\nPlease input bar code:';
        expect(response).toEqual(expected);
    });

    it('#8.input other', () => {
        let route = new Route();
        let response = route.execute('6');
        let expected = 'no command Please give right input:';
        expect(response).toEqual(expected);
    });

    it('#9.quit', () => {
        let route = new Route();
        let response = route.execute('3');
        let expected = 'Thanks for using';
        expect(response).toEqual(expected);
    });


});
