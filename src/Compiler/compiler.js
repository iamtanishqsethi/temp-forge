const compiler = (ast, data) => {
    if (!ast || !Array.isArray(ast.body) || ast.body.length === 0) return "";

    return (
    ast.body.map((element) => {
            if (element.type === "variable") {
                return data[element.value] !== undefined ? data[element.value] : `"${element.value}"`;
            } else if (typeof element.value === "string") {
                return element.value;
            } else {
                console.warn("Unexpected element in AST body:", element);
                return ""; // Fallback for unexpected cases
            }
        })
        .join("")
    )
};

module.exports = {
    compiler,
};
