import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openSideBar} from "../Utils/configSlice";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {auth} from "../Utils/firebase-config";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {addUser, removeUser} from "../Utils/userSlice";

const Header=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const user = useSelector((store) => store.user)

    const[hidden,setHidden]=useState(false);
    const [isLanding,setIsLanding]=useState(false);
    useEffect(()=>{
        if(path==='/login'){
            setHidden(true);
        }
        else if(path==='/' || (!user && path==='/public')){
            setIsLanding(true);
        }
        else{
            setHidden(false);
            setIsLanding(false);
        }
    },[path])


    const userId=useSelector((state)=>state.user);

    const handleSignOut=()=>{
        signOut(auth)
        navigate('/')
    }

    useEffect(() => {
        const unSubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                const {uid} = auth.currentUser;
                dispatch(addUser(uid));
                navigate('/welcome')
            }
            else {
                dispatch(removeUser());
                if (path !== '/') {
                    navigate('/login')
                }
            }
        });
        return ()=> unSubscribe()
    },[])

    return (
        <div className={'w-screen flex flex-col items-center font-inter'}>
            <div className={`${hidden?'hidden':'fixed'} w-[98%] bg-zinc-50 border-zinc-900 rounded-lg border px-4 py-5 m-3 flex items-center justify-between`}>
                <div className={'flex items-center'}>
                    {userId && <button onClick={() => dispatch(openSideBar())}><MenuIcon className={'  cursor-pointer'}/>
                    </button>}
                    <Link to={userId?("/welcome"):("/")}>
                        <h1
                            className={'text-xl px-2 mx-2 font-bold '}
                        >Template Forge <WhatshotIcon className={'text-amber-500'}/></h1>
                    </Link>
                </div>
                {isLanding && <ul className={'flex items-center justify-center space-x-4 text-lg'}>
                    <li>Create</li>
                    <div className={'w-0.5 h-5 bg-orangeBg'}></div>
                    <Link to={'/public'}><li>Templates</li></Link>
                    <div className={'w-0.5 h-5 bg-orangeBg rounded-xl'}></div>
                    <li><button className={'px-2 py-1 border-2 text-orangeBg border-orangeBg rounded-lg'} onClick={()=>navigate('/login')}>Sign in</button></li>
                </ul>
                }
                {userId && <div className={'flex items-center justify-center space-x-2'}>
                    <Link to={'/public'}><h1>Templates</h1></Link>
                    <button className={'bg-red-900 hover:bg-red-600 p-2 text-white rounded'} onClick={handleSignOut}>
                        Sign Out
                    </button>
                    <button className={'bg-blue-900 hover:bg-blue-600 p-2 text-white rounded'} onClick={()=>navigate(`/profile/${userId}`)}>Profile</button>
                </div>}
            </div>
        </div>

    )
}
export default Header