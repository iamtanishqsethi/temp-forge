import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import useTemplateRender from "../../Hooks/useTemplateRender";


const NewInput = ({ data ,AST}) => {
    const [updatedData, setUpdatedData] = useState(null);
    const { id } = useParams();
    const compileTemplate = useTemplateRender(id);
    const navigate = useNavigate();

    useFetchTemplates()

    const handleInput = (key, value) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleRender = async () => {

        try{
            const promptId=await compileTemplate(updatedData)
            // console.log(promptId)
            if(promptId){
                navigate(`/template/created/${id}/${promptId}`)
            }
            else{
                alert("Failed to process the template. Please try again.")
            }
        }catch(error){
            console.log('error rendering template')
            throw error;
        }
    };

    return (
        <div className={'h-[58%] w-full rounded-3xl border-2 border-black p-6 flex flex-col'}>
            <div className={'flex space-x-4'}>
                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.4994 3.05318C28.5288 1.67278 27.4336 0.529938 26.0532 0.500565L3.55827 0.0219512C2.17787 -0.00741894 1.03503 1.08781 1.00566 2.46821C0.976285 3.84861 2.07151 4.99145 3.45191 5.02082L23.4474 5.44626L23.0219 25.4417C22.9926 26.8221 24.0878 27.965 25.4682 27.9943C26.8486 28.0237 27.9914 26.9285 28.0208 25.5481L28.4994 3.05318ZM3.72976 27.805L27.7298 4.80497L24.2702 1.19503L0.270237 24.195L3.72976 27.805Z" fill="#E9FA9C"/>
                </svg>
                <h1 className={'text-3xl'}>Input</h1>
            </div>
            <div className={'border-2 border-zinc-200 rounded-3xl my-2 overflow-y-auto overflow-x-hidden h-[75%] w-full flex flex-col items-center'}>
                {data?.length === 0 ? (
                                    <p>No variables found</p>
                                ) : (
                                    Object.keys(data).map((key) => (
                                        <div key={key} className={"mb-2 p-2 text-lg flex flex-col w-full justify-center "}>
                                            <label className={"p-2 uppercase font-inter"}>{key} :</label>
                                            <input
                                                type="text"
                                                value={updatedData?.[key] || ""}
                                                placeholder={`Enter value for ${key}`}
                                                className={
                                                    "py-1 px-3 bg-transparent border-2 border-zinc-200 outline-none rounded-full"
                                                }
                                                onChange={(e) => handleInput(key, e.target.value)}
                                            />
                                        </div>
                                    ))
                                )}
            </div>
            <button
                onClick={handleRender}
                className={'bg-lightGreen py-1 px-5 rounded-full font-medium text-black'}>
                Get The Prompt
            </button>
        </div>
    );
};
export default NewInput;
