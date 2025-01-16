import CurrentTemplate from "./CurrentTemplate";
import NewInput from "./NewInput";
import EmptyOutput from "./EmptyOutput";

const NewPrompt=()=>{
    return (
        <div className={'flex items-center justify-center h-full w-[65%] '}>
            <div className={'flex flex-col items-center  justify-around h-full w-[40%]   '}>
                <CurrentTemplate/>
                <NewInput/>
            </div>
            <EmptyOutput/>
        </div>
    )
}
export default NewPrompt;