import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import  {useState} from "react";
import useTemplateExecute from "../../Hooks/useTemplateExecute";
import {useNavigate} from "react-router-dom";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Footer from "../Footer";
import  {initializeGeminiAI} from "../../Utils/gemini";
import {useDispatch, useSelector} from "react-redux";
import {reset} from "../../Utils/editSlice";
import toast from "react-hot-toast";

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
    const dispatch = useDispatch()

    useFetchTemplates()

    const handlePrompt = async () => {

        if (!prompt || !prompt.trim()) {
            toast.error("Please enter a valid prompt.");
            return;
        }

        if (!templateTitle || !templateTitle.trim()) {
            toast.error("Please enter a valid template title.");
            return;
        }

        setIsProcessing(true);

        try {

            const model = initializeGeminiAI()
            const message = `Act as a ai prompt template generator and generate a prompt template for ${prompt.trim()} the variables in the prompt must be enclosed in "{{ }}" . Only give the template and the template should be well structured `;

            const result = await Promise.race([
                model.generateContent(message),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timeout')), 30000)
                )
            ])

            if (!result || !result.response) {
                throw new Error('Invalid response from Gemini API');
            }

            const responseText = result.response.text()

            if (!responseText || !responseText.trim()) {
                throw new Error('Empty response from Gemini API');
            }

            const templateId = await processTemplate(responseText, templateTitle.trim());

            if (!templateId) {
                throw new Error('Failed to process template - invalid template generated');
            }

            navigate(`/template/created/${templateId}/new`);

        } catch (error) {
            console.error('Error in handlePrompt:', error);

            if (error.message.includes('API key')) {
                toast.error("API key not configured. Please check your settings.");
            } else if (error.message.includes('timeout')) {
                toast.error("Request timed out. Please try again.");
            } else if (error.message.includes('quota') || error.message.includes('limit')) {
                toast.error("API quota exceeded. Please try again later.");
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                toast.error("Network error. Please check your connection and try again.");
            } else if (error.message.includes('Invalid response') || error.message.includes('Empty response')) {
                toast.error("Invalid response from AI service. Please try again.");
            } else if (error.message.includes('Failed to process template')) {
                toast.error("Failed to process the template. Please enter a valid template.");
            } else {

                toast.error("An unexpected error occurred. Please try again.");
            }


        } finally {
            setIsProcessing(false);
        }
    };

    const handleExecute = async () => {
        if (!template.trim()) {
            toast.error("Please enter a valid template.")
            return
        }
        if (!template.includes('{{') || !template.includes('}}')) {
            toast.error("Template must contain at least one variable enclosed in {{ }}.")
            return
        }
        setIsProcessing(true)
        try {
            const templateId = await processTemplate(template, templateTitle);
            if (templateId) {
                navigate(`/template/created/${templateId}/new`)
            } else {
                toast.error("Failed to process the template. Please try again.")
            }
        } catch (error) {
            toast.error("Failed to process the template. Please try again.")
        } finally {
            setIsProcessing(false)
        }
    };

    return (
        <div className='flex flex-col items-center w-full min-h-screen bg-white text-black font-inter'>
            <div className='flex flex-col xl:flex-row w-full items-center justify-center mt-4 sm:mt-6 lg:mt-10  px-4 sm:px-6 lg:px-7 gap-4 xl:gap-0'>
                <div className='w-full xl:w-[30%] xl:h-[97vh] flex flex-col items-center justify-center p-2 sm:p-4 order-2 xl:order-1'>
                    <div className='mb-4 sm:mb-5 mt-4 sm:mt-8 xl:mt-12 bg-custom-img bg-object-cover bg-object-center rounded-2xl sm:rounded-3xl w-full h-32 sm:h-40 xl:h-[35%] flex items-center justify-center'>
                        <h1 className='text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white'>
                            <span className='text-4xl sm:text-6xl lg:text-7xl xl:text-8xl'>01</span> step
                        </h1>
                    </div>
                    <div className='bg-lightGreen rounded-2xl sm:rounded-3xl w-full flex-1 xl:h-[60%] relative p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]'>
                        <div className='flex flex-wrap items-center justify-start gap-2 sm:gap-3 mb-4'>
                            <button
                                onClick={()=>setSideBarMsg("tRules")}
                                className={`text-xs sm:text-sm ${sideBarMsg==="tRules"?"bg-black text-lightGreen":"border-2 border-black"} rounded-full px-2 sm:px-3.5 py-1.5 sm:py-2 whitespace-nowrap`}>
                                Template Rules
                            </button>
                            <button
                                onClick={()=>setSideBarMsg("pTips")}
                                className={`text-xs sm:text-sm ${sideBarMsg==="pTips"?"bg-black text-lightGreen":"border-2 border-black"} rounded-full px-2 sm:px-3.5 py-1.5 sm:py-2 whitespace-nowrap`}>
                                Prompt Rules
                            </button>
                            <button
                                onClick={()=>{
                                    setSideBarMsg("ai")
                                    setTemplate('')
                                    dispatch(reset())
                                }}
                                className={`text-xs sm:text-sm ${sideBarMsg==="ai"?"bg-gradient-to-br from-purple-700 via-violet-600 to-cyan-500 text-white font-medium":"border-2 border-black"} rounded-full px-2 sm:px-3.5 py-1.5 sm:py-2 flex items-center gap-1 whitespace-nowrap`}>
                                AI <AutoAwesomeIcon className="w-3 h-3 sm:w-4 sm:h-4"/>
                            </button>
                        </div>

                        <div className='text-sm sm:text-base my-2'>
                            {sideBarMsg==="ai" && (
                                <div>
                                    <h1 className='text-lg sm:text-xl lg:text-2xl font-medium mb-2'>
                                        Having trouble figuring out the Template needs?
                                    </h1>
                                    <p className='text-base sm:text-lg py-2 sm:py-3'>
                                        Use Gemini for creating the perfect template for your needs
                                    </p>
                                </div>
                            )}

                            {sideBarMsg==="pTips" && (
                                <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
                                    <li>
                                        Be <span className="text-blue-700 font-semibold">specific</span> and provide{" "}
                                        <span className="text-blue-700 font-semibold">context</span>.
                                    </li>
                                    <li>
                                        Use examples, e.g.,{" "}
                                        <blockquote className="bg-zinc-800 text-white px-2 sm:px-3 py-1 rounded italic mt-1 text-xs sm:text-sm">
                                            "Rewrite: 'Can't attend' → 'I will be unable to attend.'"
                                        </blockquote>
                                    </li>
                                    <li>Break down tasks into simple steps.</li>
                                    <li>Refine prompts by rephrasing or adding constraints.</li>
                                </ul>
                            )}

                            {sideBarMsg==="tRules" && (
                                <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
                                    <li>
                                        Enclose variables in{" "}
                                        <span className="text-blue-800 font-mono">{"{{ }}"}</span>, e.g.,{" "}
                                        <span className="bg-zinc-600 text-zinc-200 px-1 sm:px-2 py-1 rounded font-mono text-xs sm:text-sm">
                                            {"{{username}}"}
                                        </span>.
                                    </li>
                                    <li>
                                        Use clear variable names like{" "}
                                        <span className="bg-zinc-600 text-zinc-200 px-1 sm:px-2 py-1 rounded font-mono text-xs sm:text-sm">
                                            {"{{product_name}}"}
                                        </span>.
                                    </li>
                                    <li>Document required variables for clarity.</li>
                                </ul>
                            )}
                        </div>

                        <svg className='absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-[105px] xl:h-[108px] hidden sm:block' viewBox="0 0 105 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M43.8 107.7L44.4 66.3L8.7 88.2L2.23517e-07 74.7L37.2 52.8L1.2 31.2L9.9 18L44.1 39.3L43.8 -1.43051e-05H60L59.7 39L93.6 18L102.6 31.2L66.6 52.8L104.1 74.7L94.8 88.2L59.4 66.3L60 107.7H43.8Z" fill="white"/>
                        </svg>
                    </div>
                </div>

                <div className='w-full xl:w-[70%] xl:h-[90vh] flex flex-col items-center justify-center p-2 sm:p-4 order-1 xl:order-2'>

                    <div className='mt-12 w-full h-auto xl:h-[25%] flex flex-col sm:flex-row items-center justify-start mb-4 sm:mb-6'>

                        <div className=' bg-lightGreen rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-[6%] xl:h-28 mr-0 sm:mr-2 mb-4 sm:mb-0 p-2 hidden md:flex flex-col space-y-1 sm:space-y-2 items-center justify-center flex-shrink-0'>
                            <svg width="42" height="42"  viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                            </svg>
                            <svg width="42" height="42"  viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                            </svg>
                        </div>

                        <div className='flex flex-col justify-center text-center sm:text-left'>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-light text-black'>
                                Get started with
                            </h1>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-light text-black flex items-center justify-center sm:justify-start'>
                                creating y
                                <svg className='inline w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-[45px] xl:h-[45px] mx-1' viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="22.5" cy="22.5" r="21" stroke="black" strokeWidth="3" strokeDasharray="2 2"/>
                                </svg>
                                ur template
                            </h1>
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

                        <div className='h-[3px] w-full bg-zinc-300 rounded-lg my-2'></div>
                        {sideBarMsg==="ai" ? (
                            <>
                                <input
                                    type="text"
                                    className='text-black font-bold placeholder:font-bold placeholder:text-black w-full mx-2 outline-none p-2 text-sm sm:text-base'
                                    placeholder='Enter Template Title'
                                    onChange={(e)=>setTemplateTitle(e.target.value)}
                                />
                                <div className='h-[3px] w-full bg-zinc-300 rounded-lg my-2'></div>
                                <textarea
                                    className="text-black  w-full m-2 h-3/5 outline-none p-2"
                                    placeholder="Enter the Prompt here"
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <div className={'w-full flex items-center justify-end'}>
                                    <button
                                        className="bg-custom-img bg-object-cover  text-white px-4 py-2.5 m-2 rounded-full text-sm"
                                        onClick={handlePrompt}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing?'Processing...':'Create Template '}<AutoAwesomeIcon/>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={templateTitle}
                                    className='text-black font-bold placeholder:font-bold placeholder:text-black w-full mx-2 outline-none p-2 text-sm sm:text-base'
                                    placeholder='Enter Template Title'
                                    onChange={(e)=>setTemplateTitle(e.target.value)}
                                />
                                <div className='h-[3px] w-full bg-zinc-300 rounded-lg my-2'></div>
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
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
export default NewTemplate;