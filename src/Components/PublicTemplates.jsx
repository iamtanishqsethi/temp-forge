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
    const userId=useSelector((state)=>state.user?.uid);

    const getPublicTemplates = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "public"));
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPublicTemplates(newData);
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
            <div className="min-h-screen p-8 px-12 mt-14">
                <Masonry columns={4} spacing={2}>
                    {publicTemplates.map((item, index) => (
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
