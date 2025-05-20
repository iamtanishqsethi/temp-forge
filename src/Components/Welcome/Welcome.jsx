import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../Footer";
import TransitionComp from "./TransitionComp";
import TickerComp from "./TickerComp";
import {reset} from "../../Utils/editSlice";
const Welcome=()=>{
    const navigate = useNavigate();
    const userId=useSelector((store)=>store.user)
    const dispatch = useDispatch();

    return (
        <div className="min-h-screen mt-20  flex flex-col items-center font-inter overflow-x-hidden">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                <div className="w-full lg:w-[70%] font-inter pt-4 md:pt-10 px-4 md:px-8">
                    <div className="w-full">
                        <div className="w-full">
                            <div className="text-[2.7rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-tight pl-2 md:pl-8 flex flex-wrap items-center">
                                <h1 className="inline mr-1">REVOLUTIONIZE</h1>
                                <div className="inline-flex items-center whitespace-nowrap">
                                    <h1 className="inline-block">Y</h1>
                                    <svg className="inline-block w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-0.5" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="30.5" stroke="black" strokeWidth="3" strokeDasharray="2 2"/>
                                    </svg>
                                    <h1 className="inline-block">UR</h1>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex w-full items-center flex-wrap pl-2 md:pl-8">
                                <h1 className="text-[2.7rem] sm:text-5xl md:text-7xl lg:text-[5.5rem]  leading-tight font-medium py-1">AI</h1>
                                <div className="border-2 border-black px-3 md:px-7 py-2 md:py-3.5 rounded-full mx-2">
                                    <img
                                        className="w-20 h-4 md:w-44 md:h-10"
                                        src="https://i.ibb.co/CpQL71d3/img.png"
                                        alt="img"
                                    />
                                </div>
                                <h1 className="text-[2.7rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-tight py-1">EXPERIENCE</h1>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center w-full space-x-2 md:space-x-5 pl-2 md:pl-8 mt-4">
                            <img
                                src="https://i.ibb.co/DDxftfWP/image.png"
                                alt="image"
                                className="w-full sm:w-auto sm:max-w-[90%] md:max-w-[80%] lg:max-w-[35rem]"
                            />
                            <div className="hidden lg:flex mt-4 md:mt-0 space-x-2 md:space-x-4 flex-wrap">
                                <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="86" height="86" rx="7" fill="black"/>
                                </svg>
                                <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                                </svg>
                                <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="86" height="86" rx="7" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="my-6  pl-2 md:pl-8 flex flex-wrap items-center w-full gap-2 md:gap-4">
                        {userId ? (
                            <button
                                className="bg-black rounded-full text-base md:text-lg text-white py-1 px-5 hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                    dispatch(reset());
                                    navigate('/template/new');
                                }}
                            >
                                Create <span className={'hidden md:inline'}>Template</span>
                            </button>
                        ) : (
                            <button
                                className="bg-black rounded-full text-base md:text-lg text-white py-1 px-5 md:px-8 hover:bg-gray-800 transition-colors"
                                onClick={() => navigate('/login')}
                            >
                                Get Started
                            </button>
                        )}
                        <button
                            className="bg-white rounded-full text-base md:text-lg text-black border border-black py-1 px-5 hover:bg-gray-100 transition-colors"
                            onClick={() => navigate("/public")}
                        >
                            Explore Templates
                        </button>
                        <div className="hidden lg:flex mt-4 lg:mt-0 space-x-2 md:space-x-4">
                            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black"/>
                            </svg>
                            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                            </svg>
                            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black"/>
                            </svg>
                            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[30%]  lg:mt-0 flex flex-col items-center justify-start px-4">
                    <div className="p-8 bg-custom-img bg-center bg-cover h-full w-full sm:w-[80%] lg:w-[75%] flex flex-col items-center justify-between rounded-3xl">
                        <div className="flex w-full justify-end">
                            <svg className="w-28 h-18 md:w-32 md:h-20" viewBox="0 0 170 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="82.5" y="20.5403" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 82.5 20.5403)" fill="white"/>
                                <rect x="123.919" y="20.5403" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 123.919 20.5403)" fill="white"/>
                                <rect x="82.5" y="61.9594" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 82.5 61.9594)" fill="white"/>
                                <rect x="123.919" y="61.9594" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 123.919 61.9594)" fill="white"/>
                                <rect y="20.5406" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 0 20.5406)" fill="white"/>
                                <rect x="41.4192" y="20.5406" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 41.4192 20.5406)" fill="white"/>
                                <rect y="61.9598" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 0 61.9598)" fill="white"/>
                                <rect x="41.4192" y="61.9598" width="29.0486" height="29.0486" rx="5" transform="rotate(-45 41.4192 61.9598)" fill="white"/>
                            </svg>
                        </div>
                        <p className="text-white font-extralight text-sm md:text-base lg:text-lg my-4">
                            <span className="text-lightGreen">OUR GOAL</span> is to make your AI experience better than ever,
                            by creating a system in which consumer of <span className="text-lightGreen">IDEAS</span> are producers of it too.
                            Where <span className="text-lightGreen">GOAL</span> of a person is a spark of VISION for other. We present <span className="text-lightGreen font-medium">TEMPFORGE.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center text-center px-4 lg:px-12 w-full  lg:mt-0">
                <TickerComp />
                <TransitionComp />
            </div>

            <Footer />
        </div>
    );
};

export default Welcome;