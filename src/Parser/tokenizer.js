const Spec = [
    [/^{{\s*([^}]+)\s*}}/, 'VARIABLE'],
    [/^[^{}]+/, 'STRING'],
];
class Tokenizer{
    init(string){
        this._string = string
        this._cursor=0;
    }
    hasMoreTokens(){
        return this._cursor<this._string.length;
    }
    getNextToken(){
        if(!this.hasMoreTokens()){
            return null
        }
        const string=this._string.slice(this._cursor)

        for(const [regex,tokenType] of Spec){
            const tokenValue=this._matched(regex,string,tokenType)
            if(tokenValue===null){
                continue;
            }
            console.log(tokenType)
            console.log(tokenValue)
            return {
                type:tokenType,
                value:tokenType==='VARIABLE'?tokenValue.trim():tokenValue,
            }
        }
        throw new SyntaxError(`Unexpected token: ${string[0]}`);

    }
    _matched(regex,string,tokenType){
        const matched=regex.exec(string);
        if(matched===null){
            return null;
        }
        console.log(matched)
        this._cursor+=matched[0].length
        return tokenType==='VARIABLE'?matched[1]:matched[0]
    }

}
module.exports={
    Tokenizer,
}