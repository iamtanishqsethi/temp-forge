import {useEffect, useState} from "react";
import error from "./Error";
import {collection, getDocs} from "firebase/firestore";
import {database} from "../Utils/firebase-config";
import {Link} from "react-router-dom";
import SideBarTemplate from "./SideBarTemplate";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PublicTemplateBox from "./PublicTemplateBox";

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
        <div className={'flex flex-col items-center justify-center font-inter h-screen'}>
            Public templates
            <div className={'flex flex-wrap items-center '}>
                {
                    publicTemplates.length>0?(
                        publicTemplates.map((item,index)=>(
                            <div className={'flex flex-wrap items-center justify-center '}>
                                <PublicTemplateBox key={index} templateData={item} />
                            </div>

                        ))
                    ):(
                        <div>No templates available</div>
                    )
                }


            </div>
        </div>
    )
}
export default PublicTemplates