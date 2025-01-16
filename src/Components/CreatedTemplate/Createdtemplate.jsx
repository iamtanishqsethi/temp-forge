import PreviousPrompts from "./PreviousPrompts";
import CurrentTemplate from "./CurrentTemplate";
import InputBox from "./InputBox";
import Output from "./Output";

const Createdtemplate=()=>{
    return (
        <div className={'flex  items-center justify-around h-screen bg-gradient-to-tl from-amber-900 via-zinc-900 to-zinc-950 text-white'}>
            <PreviousPrompts/>
            <div className={'flex flex-col items-center  justify-around h-4/5 w-[30%] mt-20 '}>
                <CurrentTemplate/>
                <InputBox/>
            </div>
            <Output/>

        </div>
    )
}
export default Createdtemplate;