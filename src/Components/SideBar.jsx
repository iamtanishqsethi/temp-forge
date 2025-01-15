import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {closeSideBar} from "../Utils/configSlice";
import SideBarTemplate from "./SideBarTemplate";
import WhatshotIcon from "@mui/icons-material/Whatshot";
const SideBar=()=>{
    const isSideBarOpen=useSelector(store=>store.config.isSidebarOpen)
    const dispatch = useDispatch();

    return (
        <div
            className={`z-20 p-5 fixed top-0 left-0 h-full w-72 border-r rounded-lg shadow-xl border-gray-300 bg-gradient-to-r from-zinc-800/60 to-zinc-900/60 backdrop-blur-2xl text-white transform ${isSideBarOpen?'translate-x-0':'-translate-x-full'} transition-transform duration-300 ease-in-out`}
        >
            <div className={'flex items-center justify-between my-2'}>
                <h1 className={'p-2 m-1'}><WhatshotIcon className={'text-amber-500'} sx={{fontSize:40}}/> </h1>
                <button onClick={() => dispatch(closeSideBar())} className={'p-2 m-1'}><CloseIcon sx={{fontSize:30}}/></button>
            </div>
            <div className={'flex flex-col items-center justify-between overflow-y-auto'}>
                <SideBarTemplate/>
                <SideBarTemplate/>
                <SideBarTemplate/>
                <SideBarTemplate/>
            </div>

        </div>
    )
}
export default SideBar;