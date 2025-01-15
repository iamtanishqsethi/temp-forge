import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from "react-redux";
import {openSideBar} from "../Utils/configSlice";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {Link} from "react-router-dom";

const Header=()=>{
    const dispatch=useDispatch();
    return (
        <div className={'w-screen bg-gradient-to-tl from-zinc-900/80 via-zinc-900 to-zinc-950 fixed px-4 py-5 flex items-center'}>
            <button onClick={()=>dispatch(openSideBar())}><MenuIcon className={'text-white  cursor-pointer'} /></button>
            <Link to={"/"}>
                <h1
                    className={'text-xl px-2 mx-2 font-bold text-white'}
                >Template Forge <WhatshotIcon className={'text-amber-500'}/></h1>
            </Link>
        </div>
    )
}
export default Header