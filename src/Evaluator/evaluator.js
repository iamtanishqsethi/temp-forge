const Evaluator = (ast) => {
    if (!ast||!Array.isArray(ast.body)) {
        throw new Error("Invalid AST: Missing or improperly structured 'body'");
    }

    const data = {};

    ast.body.forEach((element)=>{
        if(element.type==="variable"){
            data[element.value]="";
        }
    })

    return data;
}

module.exports = {
    Evaluator,
}
