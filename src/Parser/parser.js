const { Tokenizer } = require("./tokenizer");

class Parser {
    constructor() {
        this._tokenizer = new Tokenizer();
        this._lookahead = null;
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);
        this._lookahead = this._tokenizer.getNextToken();
        return this.Program();
    }

    Program() {
        return {
            type: 'template',
            value: this._string,
            body: this.StatementList()
        };
    }

    StatementList() {
        const statementList = [];
        while (this._lookahead !== null) {
            const statement=this.Statement()
            if(statement.value.trim()!==''){
                statementList.push(statement);
            }
            this._lookahead = this._tokenizer.getNextToken();
        }
        return statementList;
    }

    Statement() {
        switch (this._lookahead.type) {
            case 'VARIABLE':
                return {
                    type:'variable',
                    value: this._lookahead.value,
                }
            case 'STRING':
                return {
                    type: 'textStatement',
                    value: this._lookahead.value
                }
            default:
                throw new SyntaxError('Statement: unexpected statement Production');
        }
    }

}

module.exports = {
    Parser,
};