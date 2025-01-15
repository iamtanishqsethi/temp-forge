import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from "react-redux";
import {openSideBar} from "../Utils/configSlice";

const Header=()=>{
    const dispatch=useDispatch();
    return (
        <div className={'w-screen  bg-midnight fixed px-4 py-5 flex items-center'}>
            <button onClick={()=>dispatch(openSideBar())}><MenuIcon className={'text-white  cursor-pointer'} /></button>
            <h1
                className={'text-xl  font-bold text-white'}
            >Logo</h1>
        </div>
    )
}
export default Header