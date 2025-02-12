import Suggestions from "./Suggestions";
import TemplateBox from "./TemplateBox";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import React, {useState} from "react";
import useTemplateExecute from "../../Hooks/useTemplateExecute";
import {useNavigate} from "react-router-dom";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import CallMadeIcon from "@mui/icons-material/CallMade";
const NewTemplate=()=>{
    const [template, setTemplate] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const processTemplate = useTemplateExecute()
    const navigate = useNavigate()

    useFetchTemplates()

    const handleExecute = async () => {
        if (!template.trim()) {
            alert("Please enter a valid template.")
            return
        }
        setIsProcessing(true)
        try {
            const templateId = await processTemplate(template);
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
            className={'flex  items-center justify-between w-full h-screen bg-white text-black font-inter '}>
                <div className={'w-[35%] h-full  flex flex-col items-center justify-center p-4 '}>
                    <div className={'mb-5 mt-12 bg-custom-img bg-object-cover bg-object-center rounded-3xl w-full h-[30%] flex items-center justify-center'}>
                        <h1 className={'text-7xl text-white '}>step 01</h1>
                    </div>
                    <div className={'bg-zinc-200 rounded-3xl w-full h-[55%]'}>

                    </div>
                </div>
                <div className={'w-[65%] h-full  flex flex-col items-center justify-center p-4'}>
                    <div className={' mb-5 mt-12 w-full h-[30%]'}>
                        <h1 className={'text-7xl font-light text-black '}>
                            Get started with <svg className={'inline'} width="163" height="82" viewBox="0 0 163 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="81.5" y="20.2915" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 81.5 20.2915)" fill="black"/>
                            <rect x="122.417" y="20.2915" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 122.417 20.2915)" fill="black"/>
                            <rect x="81.5" y="61.208" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 81.5 61.208)" fill="black"/>
                            <rect x="122.417" y="61.208" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 122.417 61.208)" fill="black"/>
                            <rect x="0.000106812" y="20.2915" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 0.000106812 20.2915)" fill="black"/>
                            <rect x="40.9172" y="20.2915" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 40.9172 20.2915)" fill="black"/>
                            <rect x="0.000106812" y="61.208" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 0.000106812 61.208)" fill="black"/>
                            <rect x="40.9172" y="61.208" width="28.6964" height="28.6964" rx="2" transform="rotate(-45 40.9172 61.208)" fill="black"/>
                        </svg>
                        </h1>
                        <div className={'flex items-center justify-between'}>
                            <div className={'bg-lightGreen rounded-full w-[6%] h-28 mr-2 p-2 flex flex-col space-y-2 items-center justify-center'}>
                                <svg width="42" height="42" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                                </svg>
                                <svg width="42" height="42" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                                </svg>


                            </div>
                            <div className={'w-[94%]'}>
                                <h1 className={'text-7xl font-light text-black '}>creating y<svg className={'inline'} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="22.5" cy="22.5" r="21" stroke="black" stroke-width="3" stroke-dasharray="2 2"/>
                                </svg>
                                    ur template</h1>
                                <p className={'m-1 p-2'}><span className={'font-bold'}>FOLLOW</span> the given steps to create your  <span className={'font-bold'}>TEMPLATE</span>  </p>
                            </div>

                        </div>

                    </div>
                    <div className={'border-2 border-black rounded-3xl my-2 flex flex-col w-full h-[55%] p-6'}>
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
                        <textarea
                            className="text-black bg-transparent w-full my-4 mx-2 h-3/5 outline-none p-4"
                            placeholder="Enter the template here"
                            onChange={(e) => setTemplate(e.target.value)}
                        />
                        <button
                            className="bg-custom-img bg-object-cover bg-object-center text-white px-5 py-3 m-4 rounded-full"
                            onClick={handleExecute}
                            disabled={isProcessing}
                        >
                            {isProcessing?'Processing...':'Create Template '}<CallMadeIcon />
                        </button>
                    </div>
                </div>



        </div>
    )
}
export default NewTemplate;