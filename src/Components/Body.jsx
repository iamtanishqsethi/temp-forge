import Header from "./Header";
import SideBar from "./SideBar";
import {Outlet} from "react-router-dom";

const Body=()=>{
    return (
        <div>
            <Header/>
            <SideBar/>
            <Outlet/>
        </div>
    )
}
export default Body;