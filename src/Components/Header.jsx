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
    const user = useSelector((store) => store.user?.uid)
    const profileIMG=useSelector((state)=>state.user?.photoURL);

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
                const {uid,email,displayName,photoURL} = auth.currentUser;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
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
            <div className={`${hidden?'hidden':'fixed'} w-screen z-10 bg-white  px-10 py-4  flex items-center justify-between`}>
                <div className={'flex items-center'}>

                    <Link to={userId?("/welcome"):("/")}>
                        <svg width="74" height="37" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="37" y="9.21204" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 37 9.21204)" fill="black"/>
                            <rect x="55.5759" y="9.21204" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 55.5759 9.21204)" fill="black"/>
                            <rect x="37" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 37 27.7878)" fill="black"/>
                            <rect x="55.5759" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 55.5759 27.7878)" fill="black"/>
                            <rect y="9.21216" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 0 9.21216)" fill="black"/>
                            <rect x="18.5759" y="9.21216" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 18.5759 9.21216)" fill="black"/>
                            <rect y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 0 27.7878)" fill="black"/>
                            <rect x="18.5759" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 18.5759 27.7878)" fill="black"/>
                        </svg>

                    </Link>
                </div>
                {isLanding && <ul className={'flex items-center justify-center space-x-4 text-lg px-10'}>

                    <li><button className={'px-7 py-2 mx-2 text-sm bg-black text-white  rounded-full'} onClick={()=>navigate('/login')}>Sign in</button></li>
                </ul>
                }
                {userId && <div className={'flex items-center justify-center space-x-2 px-10'}>
                    {/*<Link to={'/public'}><h1>Templates</h1></Link>*/}
                    <button className={'px-7 py-2 mx-2 text-sm bg-black text-white  rounded-full'} onClick={handleSignOut}>
                        Log Out
                    </button>
                    <button className={'  text-black rounded'} onClick={()=>navigate(`/profile/${userId}`)}><img src={profileIMG} alt="" className={'h-11 w-11  rounded-full object-cover'}/></button>
                </div>}
            </div>
        </div>

    )
}
export default Header