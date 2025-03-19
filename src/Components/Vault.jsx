import Footer from "./Footer";
import {useSelector} from "react-redux";
import useFetchTemplates from "../Hooks/useFetchTemplates";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {database} from "../Utils/firebase-config";
import VaultItem from "./VaultItem";
import {useNavigate} from "react-router-dom";

const Vault=()=>{
    const navigate = useNavigate();
    const userId=useSelector((state)=>state.user?.uid);
    const displayName=useSelector((state)=>state.user.displayName);
    const templatesArr=useSelector((store)=>store.templates.templatesArr)
    useFetchTemplates()

    const handleDelete = async (id)=>{
        await deleteDoc(doc(database,userId,id))
        // dispatch(setTemplates(templatesArr.filter((temp)=>temp.id!==id)))
    }
    const handleAddPublic=async (id)=>{
        const currentTemplate=templatesArr.find((item)=>item.id===id)
        const modifiedTemplate={
            ...currentTemplate,
            displayName
        }


        try{
            const docRef =await addDoc(collection(database,"public"),modifiedTemplate)
        }
        catch (error){
            console.log('error adding to public database')
        }
    }
    const handleUse=(route)=>{
        navigate(route);
    }

    return (
        <div className="">
            <div className={'min-h-screen flex flex-col items-center  font-inter  mx-10 mt-14 py-6'}>
                <div className={'bg-custom-img2  bg-object-cover bg-object-center rounded-t-3xl w-full h-[30vh]'}>

                </div>
                <div className={'rounded-b-3xl w-full min-h-[80vh] flex flex-col items-center'}>
                    <div className={'flex items-center justify-start w-full space-x-4 m-3'}>
                        <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="black"/>
                        </svg>
                        <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                        </svg>
                        <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="86" height="86" rx="7" fill="black"/>
                        </svg>
                        <h1 className={'text-6xl font-bold  p-2'}>My Vault</h1>
                    </div>
                    <div className={'h-[75vh] w-full my-3 mx-1 grid grid-cols-4 gap-4 overflow-y-auto'}>
                        {templatesArr.length > 0 ? (
                            templatesArr.map((item, index) => (
                                <VaultItem
                                    handleUse={()=>handleUse(`/template/created/${item.id}/new`)}
                                    handleDelete={()=>handleDelete(item.id)}
                                    handlePost={()=>handleAddPublic(item.id)}
                                    templateData={item} key={index} />
                            ))
                        ) : (
                            <div>No templates found</div>
                        )}
                    </div>

                </div>


            </div>
            <Footer/>
        </div>
    )
}
export default Vault;