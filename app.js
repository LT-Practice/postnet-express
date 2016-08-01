let express = require('express');
let BarcodeToZipcode = require('./postnet/src/BarcodeTranslater');
let ZipcodeToBarcode = require('./postnet/src/ZipcodeTranslater');
let app = express();

// app.get('/', function (req, res) {
//     res.send(new BarcodeToZipcode().execute('||:|:::|:|:|:::|:::||::||::|:|:|'));
// });
app.get('/', function (req, res) {
    res.sendfile('./index.html');
});
app.get('/result', function (req, res) {
    let barcodeTranslater = new BarcodeToZipcode();
    let zipcodeTranslater = new ZipcodeToBarcode();
    let code = req.query.Barcode;
    let typeBarcode = barcodeTranslater.checkBarcode(code).type;
    let typeZipcode = zipcodeTranslater.checkZipcode(code).type;
    if (typeBarcode) {
        res.send('Hello GET:' + barcodeTranslater.execute(req.query.Barcode)._result);
    } else if (typeZipcode) {
        res.send('Hello GET:' + zipcodeTranslater.execute(req.query.Barcode)._result);
    } else {
        res.send("输入错误.");
    }

});
app.get('/hello', function (req, res) {
    res.send("Hello!");

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});