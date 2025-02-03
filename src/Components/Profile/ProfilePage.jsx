import {useSelector} from "react-redux";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {database} from "../../Utils/firebase-config";
import {Link, useNavigate} from "react-router-dom";
import SideBarTemplate from "../SideBarTemplate";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

const ProfilePage=()=>{
    const navigate = useNavigate()
    const userId=useSelector((state)=>state.user?.uid);
    const profileIMG=useSelector((state)=>state.user?.photoURL);
    const displayName=useSelector((state)=>state.user?.displayName);
    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    useFetchTemplates()

    const handleDelete = async (id)=>{
        await deleteDoc(doc(database,userId,id))
        // dispatch(setTemplates(templatesArr.filter((temp)=>temp.id!==id)))
    }
    const handleAddPublic=async (id)=>{
        const currentTemplate=templatesArr.find((item)=>item.id===id)

        try{
            const docRef =await addDoc(collection(database,"public"),currentTemplate)
        }
        catch (error){
            console.log('error adding to public database')
        }
    }

    return(
        <div className={'h-screen flex flex-col items-center justify-center font-inter'}>
            <h1 className={'text-2xl'}>Profile Page</h1>
            <img src={profileIMG} alt="" className={'h-24 w-24 m-2 rounded-full object-cover'}/>
            <h1 className="text-lg">{displayName}</h1>
            <h2 className="text-xl my-5">Templates</h2>
            <button  className={'bg-blue-700 px-6 py-2 rounded-lg font-medium '}
                    onClick={()=>navigate("/template/new")}>
            Create New</button>
            <div className={'flex flex-wrap items-center '}>
                {
                    templatesArr.length>0?(
                        templatesArr.map((item,index)=>(
                            <div className={'flex'}>
                                <Link to={`/template/created/${item.id}/new`}><SideBarTemplate key={index} templateData={item} /></Link>
                                <button
                                    className={'bg-red-600 text-white my-2  px-1 border-l-2 border-gray-500 bg-gradient-to-tl from-zinc-700 to-zinc-800 hover:from-red-600 hover:to-red-700 hover:bg-gradient-to-r transition-colors ease-in-out'}
                                    onClick={()=>handleDelete(item.id)}>
                                    <DeleteIcon/>
                                </button>
                                <button
                                    className={' text-white my-2 rounded-r-lg px-1 border-l-2 border-gray-500 bg-gradient-to-tl from-zinc-700 to-zinc-800 hover:from-blue-600 hover:to-blue-700 hover:bg-gradient-to-r transition-colors ease-in-out'}
                                    onClick={()=>handleAddPublic(item.id)}>
                                    <AddIcon/>
                                </button>
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
export default ProfilePage;