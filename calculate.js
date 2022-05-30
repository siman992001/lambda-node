var calc = require('./calculator');


exports.handler = async function(event, context){
    console.log('Addition', calc.add(6, 7));
    console.log('Subtract', calc.subtract(5, 2));
    console.log('Multiply', calc.multiply(6, 3));
    console.log('Divide', calc.divide(14, 7));
}
