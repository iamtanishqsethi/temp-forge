import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {closeSideBar} from "../Utils/configSlice";
import SideBarTemplate from "./SideBarTemplate";
const SideBar=()=>{
    const isSideBarOpen=useSelector(store=>store.config.isSidebarOpen)
    const dispatch = useDispatch();

    return (
        <div
            className={` p-5 fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSideBarOpen?'translate-x-0':'-translate-x-full'} transition-transform duration-300 ease-in-out`}
        >
            <div className={'flex items-center justify-between my-2'}>
                <h1>Sidebar</h1>
                <button onClick={() => dispatch(closeSideBar())}><CloseIcon/></button>
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