import PreviousPrompts from "./PreviousPrompts";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHistory } from "../../Utils/configSlice";
import CurrentTemplate from "./CurrentTemplate";

const Createdtemplate = () => {
    const isShowHistory = useSelector(store => store.config.showHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    if(!templatesArr){
        navigate("/error")
        return;
    }

    const currentTemplate=templatesArr.find((item)=>item.id==id)

    if(!currentTemplate){
        navigate("/error")
        return;
    }

    const handleClick = () => {
        dispatch(toggleShowHistory());
    };

    return (
        <div className={'flex flex-col items-center justify-between w-full min-h-screen bg-white text-black font-inter '}>
            <div className={'flex items-center justify-center w-full min-h-screen px-8'}>
                <div className={'w-[30%] h-[98vh] flex flex-col items-center justify-center p-4'}>
                    <div className={'mb-3 mt-14 bg-custom-img bg-object-cover bg-object-center rounded-3xl w-full h-[28%] flex items-center justify-center'}>
                        <h1 className={'text-7xl text-white '}><span className={'text-8xl'}>02</span> step</h1>
                    </div>
                    <div className={'bg-lightGreen rounded-full w-full h-[10%] mb-3 flex items-center justify-between p-4'}>
                        <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12V24L32 28M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className={'text-2xl'}>Prompt History</h1>
                        {isShowHistory && <svg
                            onClick={handleClick}
                            className={'cursor-pointer'}
                            width="50" height="50" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 20.9998L39.6667 32.6665L16.3333 32.6665L28 20.9998Z" fill="#1D1B20"/>
                        </svg>}
                        {!isShowHistory && <svg
                            onClick={handleClick}
                            className={'cursor-pointer'}
                            width="50" height="50" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 34.9997L16.3333 23.333L39.6666 23.333L28 34.9997Z" fill="#1D1B20"/>
                        </svg>}
                    </div>
                    {
                        isShowHistory ? <PreviousPrompts /> :<CurrentTemplate template={currentTemplate?.templateStr} title={currentTemplate?.templateTitle}/>
                    }

                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Createdtemplate;
