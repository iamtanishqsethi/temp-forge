import {collection,getDocs,onSnapshot} from "firebase/firestore";
import {database} from "../Utils/firebase-config";
import {useDispatch, useSelector} from "react-redux";
import {setTemplates} from "../Utils/templateSlice";
import {useCallback, useEffect} from "react";

const useFetchTemplates=()=>{

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user?.uid)

    // const getTemplates=useCallback(async ()=>{
    //     try {
    //         if(user){
    //             const querySnapshot=await getDocs(collection(database,user))
    //             const newData = querySnapshot.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id:doc.id
    //             }));
    //             dispatch(setTemplates(newData))
    //         }
    //         else{
    //             console.warn("User not authenticated or missing ID");
    //         }
    //     }
    //     catch(error){
    //         console.error("Error fetching templates:", error);
    //     }
    //
    // },[dispatch])




    useEffect(() => {
        if(user){
            const unsubscribe=onSnapshot(collection(database,user),(snapshot)=>{
                const newData=snapshot.docs.map((doc)=>({
                    ...doc.data(),
                    id:doc.id,
                }))
                dispatch(setTemplates(newData));
            })
            return ()=>unsubscribe()
        }
    }, [dispatch,user]);
}
export default useFetchTemplates;