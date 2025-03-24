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
            setFilteredPublicTemplates(newData);
            console.log(newData);
        } catch (error) {
            console.log("error fetching public templates", error);
        }
    };

    useEffect(() => {
        getPublicTemplates();
    }, []);

    const handleClick = (title,template) => {
        dispatch(addEdit({title,template}));
        navigate('/template/new')
    }

    return (
        <div>
            <div className={'h-[20vh] w-full  mt-14 flex items-center justify-between px-12'}>
                <div className={'flex items-center space-x-5 w-[40%] h-[80%]'}>
                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="86" height="86" rx="7" fill="black" />
                    </svg>
                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="86" height="86" rx="7" fill="#E9FA9C" />
                    </svg>
                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="86" height="86" rx="7" fill="black" />
                    </svg>
                    <h1 className="text-6xl font-medium p-2">Explore</h1>
                </div>
                <div className={'flex items-center  h-[80%] w-[40%]'}>
                    <button className={'pl-2 py-1.5 border-black border-2 rounded-l-3xl border-r-0'}>
                        <svg width="32" height="24" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.3654 18.4276L14.6625 13.0568C14.1305 13.3978 13.5187 13.6678 12.8271 13.8667C12.1355 14.0656 11.3996 14.1651 10.6194 14.1651C8.68652 14.1651 7.05067 13.6287 5.71185 12.556C4.37303 11.4832 3.70361 10.1725 3.70361 8.62379C3.70361 7.07507 4.37303 5.76435 5.71185 4.69162C7.05067 3.61889 8.68652 3.08252 10.6194 3.08252C12.5523 3.08252 14.1881 3.61889 15.5269 4.69162C16.8658 5.76435 17.5352 7.07507 17.5352 8.62379C17.5352 9.24895 17.411 9.8386 17.1628 10.3927C16.9145 10.9469 16.5776 11.437 16.152 11.8633L22.855 17.2341L21.3654 18.4276ZM10.6194 12.46C11.9493 12.46 13.0798 12.0871 14.0108 11.3411C14.9418 10.5952 15.4072 9.68941 15.4072 8.62379C15.4072 7.55816 14.9418 6.65237 14.0108 5.90643C13.0798 5.16049 11.9493 4.78752 10.6194 4.78752C9.28943 4.78752 8.15897 5.16049 7.228 5.90643C6.29703 6.65237 5.83155 7.55816 5.83155 8.62379C5.83155 9.68941 6.29703 10.5952 7.228 11.3411C8.15897 12.0871 9.28943 12.46 10.6194 12.46Z" fill="#E9FA9C"/>
                        </svg>
                    </button>
                    <input type="text"
                           placeholder={'Search'}
                           className="w-full  bg-transparent border-2 border-black border-l-0 border-r-0 focus:outline-none py-1.5 px-4
                placeholder-gray-500 focus:placeholder-opacity-50"
                           onChange={(e) => {
                               const searchTerm = e.target.value.toLowerCase();
                               const filtered = publicTemplates.filter((item) =>
                                   item.templateStr.toLowerCase().includes(searchTerm) ||
                                   item.templateTitle.toLowerCase().includes(searchTerm)
                               );
                               setFilteredPublicTemplates(filtered);
                           }}
                    />
                    <button className={'pr-2 py-1.5 border-black border-2 rounded-r-3xl border-l-0'}>
                        <svg width="23" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.05005L4 12.05M4 4.05005L12 12.05" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                </div>

            </div>
            <div className="min-h-screen p-6 px-12 ">

                <Masonry columns={4} spacing={2}>
                    {filteredPublicTemplates.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-100 group hover:bg-lightGreen rounded-2xl p-6  shadow hover:shadow-lg transition-all flex flex-col  items-center justify-center relative"
                        >
                            <button
                                    onClick={()=>window.navigator.clipboard.writeText(item.templateStr)}
                                className={'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 '}
                                    title={'Copy Template'}
                            ><ContentCopyIcon/></button>
                            <div className={'mb-7'}>
                                <h1 className="text-3xl font-medium mb-3 text-left">{item.templateTitle}</h1>
                                <p className="text-base">{item.templateStr}</p>
                            </div>


                            <div className="h-1/3 p-2 m-1 w-full relative flex items-center justify-center">
                                <h2
                                    className=" font-medium  absolute bottom-2 left-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                                >
                                    @{item.displayName}
                                </h2>
                                <button
                                    className="bg-custom-img bg-object-cover  text-white px-3 py-1.5  rounded-full text-sm absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                                    onClick={()=>handleClick(item.templateTitle,item.templateStr)}
                                    disabled={!userId|| userId===undefined}
                                    title={!userId && "Login to edit this template"}
                                >
                                    Edit Template <ModeEditOutlineIcon />
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
