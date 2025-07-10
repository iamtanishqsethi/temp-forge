import Header from "./Header";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const Body=()=>{
    return (
        <div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <Header/>
            <Outlet/>
        </div>
    )
}
export default Body;