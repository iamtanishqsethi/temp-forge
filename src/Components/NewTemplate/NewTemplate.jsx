import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React, {useState} from "react";
import useTemplateExecute from "../../Hooks/useTemplateExecute";
import {useNavigate} from "react-router-dom";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Footer from "../Footer";
import model from "../../Utils/gemini";
import {useSelector} from "react-redux";


const NewTemplate=()=>{

    const templateT=useSelector(store=>store.edit.title)
    const templateS=useSelector(store=>store.edit.template)

    const [prompt, setPrompt] = useState("")
    const [templateTitle,setTemplateTitle] = useState(templateT)
    const [template, setTemplate] = useState(templateS)
    const [isProcessing, setIsProcessing] = useState(false)
    const [sideBarMsg,setSideBarMsg] = useState("tRules")
    const processTemplate = useTemplateExecute()
    const navigate = useNavigate()

    useFetchTemplates()

    const handelPrompt=async ()=>{
        if (!prompt.trim()) {
            alert("Please enter a valid prompt.")
            return
        }
        setIsProcessing(true)
        try {
            const message = `Act as a ai prompt template generator and generate a prompt template for ${prompt} the variables in the prompt must be enclosed in "{{ }}" . Only give the template and the template should be well structured `;
            const result = await model.generateContent(message);
            const templateId = await processTemplate(result.response.text(),templateTitle);
            if (templateId) {
                navigate(`/template/created/${templateId}/new`)
            } else {
                alert("Failed to process the template. Please try again.")
            }
        } catch (error) {
            alert("Failed to process the template. Please try again.")
        }
        finally {
            setIsProcessing(false)
        }
    }

    const handleExecute = async () => {
        if (!template.trim()) {
            alert("Please enter a valid template.")
            return
        }
        setIsProcessing(true)
        try {
            const templateId = await processTemplate(template,templateTitle);
            if (templateId) {
                navigate(`/template/created/${templateId}/new`)
            } else {
                alert("Failed to process the template. Please try again.")
            }
        } catch (error) {
            alert("Failed to process the template. Please try again.")
        }
        finally {
            setIsProcessing(false)
        }
    };
    return (
        <div
            className={' flex flex-col items-center  w-full min-h-screen bg-white text-black font-inter '}>
            <div className={'flex w-full  items-center justify-center mt-8 px-7'}>
                <div className={'w-[30%] h-[96vh]  flex flex-col items-center justify-center p-4 '}>
                    <div className={'mb-5 mt-12 bg-custom-img bg-object-cover bg-object-center rounded-3xl w-full h-[28%] flex items-center justify-center'}>
                        <h1 className={'text-7xl text-white '}><span className={'text-8xl'}>01</span> step</h1>
                    </div>
                    <div className={'bg-lightGreen rounded-3xl w-full h-[60%] relative p-6'}
                    >
                        <div className={'flex items-center justify-start space-x-4'}>
                            <button
                                onClick={()=>setSideBarMsg("tRules")}
                                className={`text-sm  ${sideBarMsg==="tRules"?"bg-black text-lightGreen":"border-2 border-black"} rounded-full px-3.5 py-2`}>Template Rules</button>
                            <button onClick={()=>setSideBarMsg("pTips")}
                                    className={`text-sm  ${sideBarMsg==="pTips"?"bg-black text-lightGreen":"border-2 border-black"} rounded-full px-3.5 py-2`}>Prompt Rules</button>
                            <button onClick={()=>setSideBarMsg("ai")}
                                    className={`text-sm  ${sideBarMsg==="ai"?"bg-gradient-to-br from-purple-700 via-violet-600 to-cyan-500 text-white font-medium":"border-2 border-black"} rounded-full px-3.5 py-2`}>AI <span ><AutoAwesomeIcon /></span></button>
                        </div>
                        <p className={'p-6 my-2 '}>
                            {
                                sideBarMsg==="ai"?
                                    <div>
                                        <h1 className={'text-2xl font-medium'}>Having trouble figuring out the Template needs ? </h1>
                                        <p className={'text-lg py-3'}>Use Gemini for creating the perfect template for your needs</p>

                                    </div>

                                    :""
                            }
                            {
                                sideBarMsg==="pTips"?<ul className="list-disc list-inside  space-y-3">
                                    <li>
                                        Be <span className="text-blue-700 font-semibold">specific</span> and provide{" "}
                                        <span className="text-blue-700 font-semibold">context</span>.
                                    </li>
                                    <li>
                                        Use examples, e.g.,{" "}
                                        <blockquote className="bg-zinc-800 text-white px-3 py-1 rounded italic mt-1">
                                            "Rewrite: 'Can't attend' → 'I will be unable to attend.'"
                                        </blockquote>
                                    </li>
                                    <li>Break down tasks into simple steps.</li>
                                    <li>
                                        Refine prompts by rephrasing or adding constraints.
                                    </li>
                                </ul>:""
                            }
                            {
                                sideBarMsg==="tRules"?<ul className="list-disc list-inside  space-y-3">
                                    <li>
                                        Enclose variables in{" "}
                                        <span className="text-blue-800 font-mono">{"{{ }}"}</span>, e.g.,{" "}
                                        <span className="bg-zinc-600 text-zinc-200 px-2 py-1 rounded font-mono">
                  {"{{username}}"}
                </span>.
                                    </li>
                                    <li>
                                        Use clear variable names like{" "}
                                        <span className="bg-zinc-600 text-zinc-200 px-2 py-1 rounded font-mono">
                  {"{{product_name}}"}
                </span>.
                                    </li>
                                    <li>Document required variables for clarity.</li>
                                </ul>:""
                            }
                        </p>
                        <svg className={'absolute bottom-4 right-4 '} width="105" height="108" viewBox="0 0 105 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M43.8 107.7L44.4 66.3L8.7 88.2L2.23517e-07 74.7L37.2 52.8L1.2 31.2L9.9 18L44.1 39.3L43.8 -1.43051e-05H60L59.7 39L93.6 18L102.6 31.2L66.6 52.8L104.1 74.7L94.8 88.2L59.4 66.3L60 107.7H43.8Z" fill="white"/>
                        </svg>

                    </div>
                </div>
                <div className={'w-[70%] h-[96vh]  flex flex-col items-center justify-center p-4'}>
                    <div className={'  mt-12 w-full h-[25%] flex items-center justify-start'}>
                        <div className={'bg-lightGreen rounded-full w-[6%] h-28 mr-2 p-2 flex flex-col space-y-2 items-center justify-center'}>
                            <svg width="42" height="42" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                            </svg>
                            <svg width="42" height="42" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                            </svg>
                        </div>
                        <div className={'flex flex-col  justify-center'}>
                            <h1 className={'text-7xl/[0.8] font-light text-black '}>
                                Get started with
                            </h1>
                            <h1 className={'text-7xl/[0.8] font-light text-black '}>creating y<svg className={'inline'} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="22.5" cy="22.5" r="21" stroke="black" stroke-width="3" stroke-dasharray="2 2"/>
                            </svg>
                                ur template</h1>
                        </div>


                    </div>
                    <div className={'border-2 border-black rounded-3xl my-2 flex flex-col w-full h-[65%] p-6'}>
                        <h1 className={'text-4xl text-black '}><svg className={'inline mr-2'} width="98" height="50" viewBox="0 0 98 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 49 12.449)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 73.6004 12.449)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 49 37.5513)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 73.6004 37.5513)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 0 12.449)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 24.6003 12.449)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 0 37.5513)" fill="black"/>
                            <rect width="17.4301" height="17.4301" rx="2" transform="matrix(0.699927 -0.714215 0.699927 0.714215 24.6003 37.5513)" fill="black"/>
                        </svg>
                            TEMPLATE
                        </h1>
                        <div className={'h-[3px] w-full bg-zinc-300 rounded-lg my-2'}></div>
                        {sideBarMsg==="ai"?
                            <>
                                <input type="text"
                                       className={'text-black font-bold placeholder:font-bold placeholder:text-black  w-full mx-2  outline-none p-2'}
                                       placeholder={'Enter Template Title'}
                                       onChange={(e)=>setTemplateTitle(e.target.value)}
                                />
                                <div className={'h-[3px] w-full bg-zinc-300 rounded-lg my-2'}></div>
                                <textarea
                                    className="text-black  w-full m-2 h-3/5 outline-none p-2"
                                    placeholder="Enter the Prompt here"
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <div className={'w-full flex items-center justify-end'}>
                                    <button
                                        className="bg-custom-img bg-object-cover  text-white px-4 py-2.5 m-2 rounded-full text-sm"
                                        onClick={handelPrompt}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing?'Processing...':'Create Template '}<AutoAwesomeIcon/>
                                    </button>
                                </div>
                            </>
                            :<>
                                <input type="text"
                                       value={templateTitle}
                                       className={'text-black font-bold placeholder:font-bold placeholder:text-black  w-full mx-2  outline-none p-2'}
                                       placeholder={'Enter Template Title'}
                                       onChange={(e)=>setTemplateTitle(e.target.value)}
                                />
                                <div className={'h-[3px] w-full bg-zinc-300 rounded-lg my-2'}></div>
                                <textarea
                                    value={template}
                                    className="text-black  w-full m-2 h-3/5 outline-none p-2"
                                    placeholder="Enter the template here"
                                    onChange={(e) => setTemplate(e.target.value)}
                                />
                                <div className={'w-full flex items-center justify-end'}>
                                    <button
                                        className="bg-custom-img bg-object-cover  text-white px-4 py-2.5 m-2 rounded-full text-sm"
                                        onClick={handleExecute}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing?'Processing...':'Create Template '}<CallMadeIcon />
                                    </button>
                                </div>
                            </>}


                    </div>
                </div>
            </div>



            <Footer/>
        </div>
    )
}
export default NewTemplate;