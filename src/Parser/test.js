const {Parser} = require('./parser')
const parser = new Parser();
function exec(){
    const program='hello {{name}} welcome ! {{age}}'
    const ast = parser.parse(program)
    console.log(JSON.stringify(ast,null,2));
}
exec()