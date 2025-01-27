import PreviousPrompts from "./PreviousPrompts";
import {Outlet} from "react-router-dom";

const Createdtemplate=()=>{

    return (
        <div className={'flex  items-center justify-around h-screen bg-gradient-to-tl from-amber-900 via-zinc-900 to-zinc-950 text-white'}>
            <PreviousPrompts/>
            <Outlet/>
        </div>
    )
}
export default Createdtemplate;