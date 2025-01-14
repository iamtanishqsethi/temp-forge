import {useState} from "react";
import {compiler} from "./Compiler/compiler";
const {Parser}=require('./Parser/parser')
const {Evaluator}=require('./Evaluator/evaluator')
const Template=()=>{
    const [templateStr,setTemplateStr]=useState("")
    const [AST, setAST] = useState(null);
    const [data,setData]=useState({})
    const [isParsed,setIsParsed]=useState(false)
    const [output,setOutput]=useState("")
    const [renderd,setRendered]=useState(false)



    const parser = new Parser();

    const handleExecute = () => {
        const parsedAST = parser.parse(templateStr);
        setAST(parsedAST);
        setData(Evaluator(parsedAST));
        setIsParsed(true);
    }


    const handleDataChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleRender=()=>{

        setRendered(true)
        setOutput(compiler(AST,data))
    }

    return(
        <div>
            <h1>Enter Template</h1>
            <input type="text" onChange={(e)=>{
                setTemplateStr(e.target.value)
            }}/>
            <button onClick={handleExecute}>Execute</button>

            {isParsed &&
                <div>
                    {Object.keys(data).map((key) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input
                                type="text"
                                value={data[key]}
                                placeholder={`Enter value for ${key}`}
                                onChange={(e) => handleDataChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            }

            <h2>Rendered Output</h2>
            <div>
                <button
                    disabled={!isParsed}
                    onClick={handleRender}
                >Render final output</button>
                {renderd && (
                    <h3>{output}</h3>
                )}
            </div>
        </div>
    )
}
export default Template