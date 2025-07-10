import PreviousPrompts from "./PreviousPrompts";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import Footer from "../Footer";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowHistory} from "../../Utils/configSlice";
import CurrentTemplate from "./CurrentTemplate";

const CreatedTemplate = () => {
    const isShowHistory = useSelector(store => store.config.showHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const templatesArr = useSelector((store) => store.templates.templatesArr)
    if (!templatesArr) {
        navigate("/error")
        return;
    }

    const currentTemplate = templatesArr.find((item) => item.id == id)

    if (!currentTemplate) {
        navigate("/error")
        return;
    }

    const handleClick = () => {
        dispatch(toggleShowHistory());
    };

    return (
        <div
            className={'flex flex-col items-center justify-between w-full min-h-screen bg-white text-black font-inter '}>
            <div className={'flex flex-col-reverse md:flex-row items-center justify-center w-full min-h-screen px-4 md:px-8'}>
                <div className={'w-full md:w-[30%] h-[70dvh] md:h-[98dvh] flex flex-col items-center md:justify-center p-2 md:p-4'}>
                    <div
                        className={'mb-3 mt-5 md:mt-14 bg-custom-img bg-object-cover bg-object-center rounded-3xl w-full h-32 sm:h-40 xl:h-[35%] flex items-center justify-center'}>
                        <h1 className={'text-4xl md:text-7xl text-white '}><span
                            className={'text-5xl md:text-8xl'}>02</span> step</h1>
                    </div>
                    <div
                        className={'bg-lightGreen rounded-full w-full h-[10%] mb-3 flex items-center justify-between p-2 md:p-4'}>
                        <svg width="24" height="24" className="md:w-[38px] md:h-[38px]" viewBox="0 0 48 48" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24 12V24L32 28M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
                                stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className={'text-lg md:text-2xl'}>Prompt History</h1>
                        {isShowHistory && <svg
                            onClick={handleClick}
                            className={'cursor-pointer w-8 h-8 md:w-[50px] md:h-[50px]'}
                            viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 20.9998L39.6667 32.6665L16.3333 32.6665L28 20.9998Z" fill="#1D1B20"/>
                        </svg>}
                        {!isShowHistory && <svg
                            onClick={handleClick}
                            className={'cursor-pointer w-8 h-8 md:w-[50px] md:h-[50px]'}
                            viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 34.9997L16.3333 23.333L39.6666 23.333L28 34.9997Z" fill="#1D1B20"/>
                        </svg>}
                    </div>
                    {
                        isShowHistory ?
                            <PreviousPrompts/> :
                            <CurrentTemplate
                                template={currentTemplate?.templateStr}
                                title={currentTemplate?.templateTitle}
                            />
                    }

                </div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default CreatedTemplate;