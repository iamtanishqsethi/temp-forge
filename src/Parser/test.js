
const {Evaluator} = require('../Evaluator/evaluator')
const {Parser} = require('./parser')

const parser = new Parser();
function exec(){
    const program='hello {{name}} and welcome to {{place}} !'
    const ast = parser.parse(program)
    const data=Evaluator(ast)
    console.log(ast)
    console.log(data)
}
exec()