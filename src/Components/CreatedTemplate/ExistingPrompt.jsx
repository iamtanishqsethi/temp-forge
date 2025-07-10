import CurrentTemplate from "./CurrentTemplate";
import InputBox from "./InputBox";
import Output from "./Output";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";


const ExistingPrompt = () => {
    const isShowHistory = useSelector(store => store.config.showHistory);
    const {id, promptId} = useParams();
    const navigate = useNavigate();

    const templatesArr = useSelector((store) => store.templates.templatesArr)
    if (!templatesArr) {
        navigate("/error")
        return;
    }
    const currentTemplate = templatesArr.find((item) => item.id == id)

    if (!currentTemplate) {
        navigate("/error")
        return;
    }
    const currentPrompt = currentTemplate?.prompts.find((item) => item.id == promptId)
    console.log(currentPrompt)

    return (
        <div className={'w-full md:w-[70%] h-[98vh] flex flex-col items-center justify-between p-4'}>
            <div className={'mb-5 mt-14 w-full h-[20%] flex items-center justify-center'}>
                <div className={'flex items-center justify-start w-full'}>
                    <div className=' bg-lightGreen rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-[6%] xl:h-28 mr-0 sm:mr-2 mb-4 sm:mb-0 p-2 hidden md:flex flex-col space-y-1 sm:space-y-2 items-center justify-center flex-shrink-0'>
                        <svg width="42" height="42"  viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                        </svg>
                        <svg width="42" height="42"  viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="24.299" y="-2" width="37.1923" height="37.1923" rx="5" transform="rotate(45 24.299 -2)" fill="white"/>
                        </svg>
                    </div>
                    <div className={'w-[90%] md:w-[94%]'}>
                        <h1 className={'text-4xl md:text-7xl/[0.8] font-light text-black '}>
                            To
                            get the <svg className={'inline w-[50px] h-[52px] md:w-[70px] md:h-[72px]'}
                                         viewBox="0 0 70 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.2 71.8L29.6 44.2L5.8 58.8L1.49012e-07 49.8L24.8 35.2L0.8 20.8L6.6 12L29.4 26.2L29.2 -9.53674e-06H40L39.8 26L62.4 12L68.4 20.8L44.4 35.2L69.4 49.8L63.2 58.8L39.6 44.2L40 71.8H29.2Z"
                                fill="black"/>
                        </svg>
                        </h1>
                        <div className={'w-[92%] text-4xl md:text-7xl/[0.8] font-light text-black'}>
                            <span className={'font-medium'}>Prompt </span>
                            enter <svg className={'inline w-[35px] h-[35px] md:w-[48px] md:h-[48px]'}
                                       viewBox="0 0 55 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M54.9986 7.11625C55.0628 4.35557 52.8769 2.06555 50.1162 2.00135L5.12841 0.955123C2.36773 0.890921 0.0777162 3.07685 0.0135145 5.83752C-0.0506873 8.5982 2.13524 10.8882 4.89592 10.9524L44.8851 11.8824L43.9551 51.8716C43.8909 54.6323 46.0768 56.9223 48.8375 56.9865C51.5982 57.0507 53.8882 54.8648 53.9524 52.1041L54.9986 7.11625ZM9.45238 52.6168L53.4524 10.6168L46.5476 3.38322L2.54762 45.3832L9.45238 52.6168Z"
                                fill="black"/>
                        </svg><span className={'font-medium'}> Input</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col md:flex-row justify-between w-full h-[70%] space-y-4 md:space-y-0'}>
                <div className={'w-full md:w-[49%] h-full flex flex-col items-center justify-between'}>
                    <InputBox data={currentPrompt?.data}/>
                    {isShowHistory && <CurrentTemplate template={currentTemplate?.templateStr}
                                                       title={currentTemplate?.templateTitle}/>}
                </div>
                <div className={'w-full md:w-[49%] h-full'}>
                    <Output value={currentPrompt?.value}/>
                </div>
            </div>
        </div>
    )
}
export default ExistingPrompt;