import  { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import Footer from "./Footer";
import Masonry from '@mui/lab/Masonry';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addEdit} from "../Utils/editSlice";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";

const PublicTemplates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [publicTemplates, setPublicTemplates] = useState([]);
    const [filteredPublicTemplates, setFilteredPublicTemplates] = useState([]);
    const userId=useSelector((state)=>state.user?.uid);

    const getPublicTemplates = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "public"));
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPublicTemplates(newData);
            setFilteredPublicTemplates(newData)
        } catch (error) {
            toast.error("error fetching public templates", error);
        }
    };

    useEffect(() => {
        getPublicTemplates();
    }, []);

    const handleClick = (title,template) => {
        dispatch(addEdit({title,template}));
        navigate('/template/new')
        toast.success("Template added to edit queue");
    }

    return (
        <div>
            <div className={'min-h-[15vh] sm:min-h-[18vh] lg:min-h-[20vh] w-full mt-20 lg:mt-14 flex flex-col lg:flex-row items-center lg:justify-between px-4 sm:px-6 md:px-8 lg:px-12 gap-2 lg:gap-0'}>
                <div className={'flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 lg:space-x-5 w-full lg:w-[45%] order-1 lg:order-1 my-2 md:my-0'}>
                    <div className="flex space-x-1 sm:space-x-2 md:space-x-3">
                        <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="black"/>
                        </svg>
                        <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                        </svg>
                        <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="black"/>
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium">Explore</h1>
                </div>


                <div className={'flex items-center w-full md:w-3/5 lg:w-[45%] xl:w-[40%] order-2 lg:order-2'}>
                    <button className={'pl-2 py-1.5 sm:py-2 border-black border-2 rounded-l-3xl border-r-0 flex-shrink-0'}>
                        <svg width="32" height="24"  viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.3654 18.4276L14.6625 13.0568C14.1305 13.3978 13.5187 13.6678 12.8271 13.8667C12.1355 14.0656 11.3996 14.1651 10.6194 14.1651C8.68652 14.1651 7.05067 13.6287 5.71185 12.556C4.37303 11.4832 3.70361 10.1725 3.70361 8.62379C3.70361 7.07507 4.37303 5.76435 5.71185 4.69162C7.05067 3.61889 8.68652 3.08252 10.6194 3.08252C12.5523 3.08252 14.1881 3.61889 15.5269 4.69162C16.8658 5.76435 17.5352 7.07507 17.5352 8.62379C17.5352 9.24895 17.411 9.8386 17.1628 10.3927C16.9145 10.9469 16.5776 11.437 16.152 11.8633L22.855 17.2341L21.3654 18.4276ZM10.6194 12.46C11.9493 12.46 13.0798 12.0871 14.0108 11.3411C14.9418 10.5952 15.4072 9.68941 15.4072 8.62379C15.4072 7.55816 14.9418 6.65237 14.0108 5.90643C13.0798 5.16049 11.9493 4.78752 10.6194 4.78752C9.28943 4.78752 8.15897 5.16049 7.228 5.90643C6.29703 6.65237 5.83155 7.55816 5.83155 8.62379C5.83155 9.68941 6.29703 10.5952 7.228 11.3411C8.15897 12.0871 9.28943 12.46 10.6194 12.46Z" fill="#E9FA9C"/>
                        </svg>
                    </button>
                    <input type="text"
                           placeholder={'Search'}
                           className="w-full bg-transparent border-2 border-black border-l-0 border-r-0 focus:outline-none py-2 px-4 text-sm sm:text-base placeholder-gray-500 focus:placeholder-opacity-50"
                           onChange={(e) => {
                               const searchTerm = e.target.value.toLowerCase();
                               const filtered = publicTemplates.filter((item) =>
                                   item.templateStr.toLowerCase().includes(searchTerm) ||
                                   item.templateTitle.toLowerCase().includes(searchTerm)
                               );
                               setFilteredPublicTemplates(filtered);
                           }}
                    />
                    <button className={'pr-2 py-1.5 sm:py-2 border-black border-2 rounded-r-3xl border-l-0 flex-shrink-0'}
                            onClick={() => {
                                const searchInput = document.querySelector('input[type="text"]');
                                if (searchInput) {
                                    searchInput.value = '';
                                    setFilteredPublicTemplates(publicTemplates);
                                }
                            }}
                    >
                        <svg width="23" height="24"  viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.05005L4 12.05M4 4.05005L12 12.05" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>


            <div className="min-h-screen p-4 sm:p-6 lg:px-12">
                <Masonry
                    columns={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4
                    }}
                    spacing={{
                        xs: 1,
                        sm: 1.5,
                        md: 2,
                        lg: 2
                    }}
                >
                    {filteredPublicTemplates.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-100 group hover:bg-lightGreen rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow hover:shadow-lg transition-all flex flex-col items-center justify-center relative min-h-[200px] sm:min-h-[240px]"
                        >

                            <button
                                onClick={()=>{
                                    window.navigator.clipboard.writeText(item.templateStr)
                                    toast.success("Copied to clipboard");
                                }}
                                className={'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1 hover:bg-gray-200 rounded'}
                                title={'Copy Template'}
                            >
                                <ContentCopyIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <div className={'mb-4 sm:mb-6 lg:mb-7 flex-grow'}>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-2 sm:mb-3 text-left line-clamp-2">
                                    {item.templateTitle}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-700 line-clamp-4 sm:line-clamp-6">
                                    {item.templateStr}
                                </p>
                            </div>
                            <div className="w-full relative flex items-center justify-between mt-auto pt-2">
                                <h2
                                    className="text-xs sm:text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 truncate flex-1 mr-2"
                                >
                                    @{item.displayName}
                                </h2>
                                <button
                                    className="bg-custom-img bg-object-cover text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1 whitespace-nowrap flex-shrink-0"
                                    onClick={()=>handleClick(item.templateTitle,item.templateStr)}
                                    disabled={!userId|| userId===undefined}
                                    title={!userId && "Login to edit this template"}
                                >
                                    <span className="hidden sm:inline">Edit Template</span>
                                    <span className="sm:hidden">Edit</span>
                                    <ModeEditOutlineIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </div>
            <Footer />
        </div>
    );
};

export default PublicTemplates;