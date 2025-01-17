import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";

import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {compiler} from "../../Compiler/compiler";
import {addNewPrompt} from "../../Utils/promptSlice";

const generatePromptId = () => {
    return `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const NewInput = ({ data }) => {
    const [updatedData, setUpdatedData] = useState({});
    const { id } = useParams();
    const templateArray=useSelector((store)=>store.prompt.templateArray)
    const template=templateArray.find((item)=>item.id===id)
    const [promptId,setPromptId]=useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const compileTemplate=()=>{
        if (!template) {
            console.error(`Template with id "${id}" not found.`);
            return;
        }

        const {AST} = template;
        const output=compiler(AST,updatedData)
        const proId=generatePromptId()
        setPromptId(proId)
        dispatch(addNewPrompt({templateId:id,prompt:{
                promptId:proId,
                outputStr:output,
                data:updatedData,
            }})
        )
        return output;

    }


    // const promptId = useTemplateRender({ id, updatedData });

    const handleInput = (key, value) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleRender = () => {
        compileTemplate()
        if (promptId) {
            console.log("Prompt ID:", promptId);
            navigate(`created/${id}/${promptId}`);
        } else {
            console.log("Prompt ID not generated yet.");
        }
    };

    return (
        <div className={"flex flex-col justify-center items-center h-1/2 w-full"}>
            <div
                className={
                    "bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border-2 border-red-700 backdrop-blur-xl  rounded-lg shadow-lg w-full h-2/3 "
                }
            >
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center">
                        <h1 className="text-white text-lg font-medium flex items-center p-2 mx-2 my-1">
                            <DoubleArrowIcon
                                sx={{ fontSize: 30 }}
                                className={"text-red-700 mr-1"}
                            />
                            Input
                        </h1>
                    </div>

                    <button
                        className="text-white  bg-red-700 rounded px-5 py-2 text-sm font-medium m-2"
                        onClick={handleRender}
                    >
                        Render
                    </button>
                </div>
                <div className={"h-1 w-1/2 rounded-lg px-2 mx-2 bg-red-700"}></div>
                <div
                    className={
                        "flex flex-col items-center overflow-y-auto justify-normal"
                    }
                >
                    {data?.length === 0 ? (
                        <p>No variables found</p>
                    ) : (
                        Object.keys(data).map((key) => (
                            <div key={key} className={"m-2 p-2 text-lg"}>
                                <label className={"p-2 uppercase"}>{key} :</label>
                                <input
                                    type="text"
                                    value={updatedData?.[key] || ""}
                                    placeholder={`Enter value for ${key}`}
                                    className={
                                        "p-2 bg-transparent border-2 border-zinc-600 outline-none rounded-lg"
                                    }
                                    onChange={(e) => handleInput(key, e.target.value)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default NewInput;
