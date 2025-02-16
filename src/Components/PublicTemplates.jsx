import {useEffect, useState} from "react";
import error from "./Error";
import {collection, getDocs} from "firebase/firestore";
import {database} from "../Utils/firebase-config";
import {Link} from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PublicTemplateBox from "./PublicTemplateBox";
import Footer from "./Footer";

const PublicTemplates=()=>{

    const [publicTemplates,setPublicTemplates]=useState([])

    const getPublicTemplates=async ()=>{
        try{
            const querySnapshot=await getDocs(collection(database,"public"))
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id
            }));
            setPublicTemplates(newData);
        }
        catch (error) {
            console.log('error fetching public templates',error);
        }
    }
    useEffect(()=>{
        getPublicTemplates()
    },[])
    return(
        <div>
            <div className="grid grid-cols-4 gap-2 min-h-screen p-4 px-10 mt-14 items-start">
                {publicTemplates.map((item, index) => {
                    if(index===3){
                        return(
                            <div className=" top-14 right-4 p-7 bg-custom-img bg-center bg-cover w-full col-span-1 flex flex-col items-center justify-between m-2 rounded-3xl min-h-[400px]">
                                <div className="flex w-full justify-end">
                                    <svg width="195" height="73" viewBox="0 0 145 83" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                                <p className="text-white font-extralight">
                                    <span className="text-lightGreen">OUR GOAL</span> is to make your AI experience better than ever,
                                    by creating a system in which consumers of <span className="text-lightGreen">IDEAS</span> are producers of it too.
                                    Where <span className="text-lightGreen">GOAL</span> of a person is a spark of VISION for others. We present
                                    <span className="text-lightGreen font-medium"> TEMPFORGE.</span>
                                </p>
                            </div>
                        )
                    }
                    else{
                        return (
                            <div key={index} className={`bg-zinc-100 m-2 min-h-60 rounded-3xl w-full row-span-${(index % 3) + 1} p-6 `}>
                                <h1 className={'text-2xl font-medium'}>{item.templateTitle}</h1>
                                <h2 className={'text-lg'}>{item.templateStr}</h2>
                            </div>
                        )
                    }
                }


                )}

            </div>
            <Footer />
        </div>

    )
}
export default PublicTemplates