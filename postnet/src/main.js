let readlineSync = require('readline-sync');
let Route = require('./Route');


console.log('----Welcome----');
let index = new Route().execute('main');
console.log(index);

let ok = true;
let route = new Route();

while (ok) {
    let input = readlineSync.question('');
    let result = route.execute(input);
    console.log(result);

    if (result === 'Thanks for using') {
        // console.log(result);
        ok = false;
    }

}
