import CurrentTemplate from "./CurrentTemplate";
import InputBox from "./InputBox";
import Output from "./Output";

const ExistingPrompt=()=>{
    return (
        <div className={'flex items-center justify-center h-full w-[65%] '}>
            <div className={'flex flex-col items-center  justify-around h-full w-[40%]   '}>
                <CurrentTemplate/>
                <InputBox/>
            </div>
            <Output/>
        </div>
    )
}
export default ExistingPrompt;