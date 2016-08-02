let express = require('express');
let bodyParser = require("body-parser");

let BarcodeToZipcode = require('./postnet/src/BarcodeTranslater');
let ZipcodeToBarcode = require('./postnet/src/ZipcodeTranslater');
let Route = require('./postnet/src/Route');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendfile('./index.html');

});

app.post('/result2', function (req, res) {

    let code = req.body.code;
    let route = new Route().execute(code);
    res.send(route);
});


app.post('/result', function (req, res) {

    let code = req.body.code;
    let barcodeTranslater = new BarcodeToZipcode();
    let typeBarcode = barcodeTranslater.checkBarcode(code).type;

    // console.log(typeBarcode);

    let zipcodeTranslater = new ZipcodeToBarcode();
    let typeZipcode = zipcodeTranslater.checkZipcode(code).type;
    // console.log(typeZipcode);

    if (typeZipcode) {
        res.send("转码结果是：" + zipcodeTranslater.execute(code)._result);

    } else if (typeBarcode) {
        res.send("转码结果是：" + barcodeTranslater.execute(code)._result);

    }
    else {
        res.send("您输入的结果有误，请重新输入。");
    }

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


