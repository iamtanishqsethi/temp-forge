import {collection,getDocs} from "firebase/firestore";
import {database} from "../Utils/firebase-config";
import {useDispatch, useSelector} from "react-redux";
import {setTemplates} from "../Utils/templateSlice";
import {useEffect} from "react";

const useFetchTemplates=()=>{
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const getTemplates=async ()=>{
        try {
            if(user){
                const querySnapshot=await getDocs(collection(database,user))
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id:doc.id
                }));
                dispatch(setTemplates(newData))
            }
            else{
                console.warn("User not authenticated or missing ID");
            }
        }
        catch(error){
            console.error("Error fetching templates:", error);
        }

    }




    useEffect(() => {
        if(user){
            getTemplates()
        }
    }, [user]);
}
export default useFetchTemplates;