import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, matchPath, useLocation, useNavigate} from "react-router-dom";
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
    const [isProfile,setIsProfile]=useState(false);
    const [showDialog,setShowDialog]=useState(false);

    useEffect(() => {
        if (path === '/login') {
            setHidden(true);
            setIsLanding(false);
            setIsProfile(false);
        } else if (path === '/' || path === '/welcome') {
            setIsLanding(true);
            setHidden(false);
            setIsProfile(false);
        } else if (matchPath("/profile/:id", path) || path === "/profile") {
            setIsProfile(true);
            setHidden(false);
            setIsLanding(false);
        } else {
            setHidden(false);
            setIsLanding(false);
            setIsProfile(false);
        }
    }, [path]);



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
                <div className={'flex items-center justify-between space-x-16'}>

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
                    {!isLanding && <>
                        <h1 className={' font-medium cursor-pointer'} onClick={()=>navigate("/welcome")}>Home</h1>
                        <h1 className={' font-medium cursor-pointer'} onClick={()=>navigate("/public")}>Explore Templates</h1>
                    </>}


                </div>
                {!user && <ul className={'flex items-center justify-center space-x-4 text-lg px-10'}>

                    <li><button className={'px-7 py-2 mx-2 text-sm bg-black text-white  rounded-full'} onClick={()=>navigate('/login')}>Sign in</button></li>
                </ul>
                }
                {userId && !isProfile && <div className={'flex items-center justify-center space-x-2 px-10'}>
                    <button className={'px-7 py-2 mx-2 text-sm bg-black text-white  rounded-full'} onClick={handleSignOut}>
                        Log Out
                    </button>
                    <div className={'relative'}>
                    <button
                        className={`  text-black bg-lightGreen  flex items-center justify-between p-1 rounded-full  space-x-2`}
                        // onClick={()=>navigate(`/profile/${userId}`)}
                        onClick={()=>setShowDialog(!showDialog)}
                    >
                        <img src={profileIMG} alt="" className={'h-9 w-9  rounded-full object-cover'}/>
                        <svg

                            width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15L7 10H17L12 15Z" fill="#1D1B20"/>
                        </svg>

                    </button>
                        <div className={`${showDialog ? 'absolute': 'hidden'}  w-52 right-0 bg-lightGreen rounded-2xl p-5 flex flex-col justify-center`}>
                            <div
                                className={'flex items-center space-x-4 w-full my-2 cursor-pointer'}
                                onClick={()=>{
                                    navigate(`/profile/${userId}`)
                                    setShowDialog(false)
                                }}>
                                <h1 className={'tex-gray-400 font-medium'}>Profile</h1>
                                <svg width="22" height="19" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div
                                className={'flex items-center space-x-4 w-full my-2 cursor-pointer'}
                                onClick={()=> {
                                    navigate(`/vault`)
                                    setShowDialog(false)
                                }}>
                                <h1 className={'tex-gray-400 font-medium'}>Vault</h1>
                                <svg width="22" height="19" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div
                                className={'flex items-center space-x-4 w-full my-2 cursor-pointer'}
                                onClick={()=> {
                                    navigate('/template/new')
                                    setShowDialog(false)
                                }}>
                                <h1 className={'tex-gray-400 font-medium'}>Create New</h1>
                                <svg width="22" height="19" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>

    )
}
export default Header