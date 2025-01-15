import Suggestions from "./Suggestions";
import Template from "./Template";

const Newtemplate=()=>{

    return (
        <div
            className={'flex  items-center justify-around h-screen bg-gradient-to-tl from-zinc-900/80 via-zinc-900 to-zinc-950 text-white'}>
            <Suggestions/>
            <Template/>


        </div>
    )
}
export default Newtemplate;