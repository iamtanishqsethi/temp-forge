import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, matchPath, useLocation, useNavigate} from "react-router-dom";
import {auth} from "../Utils/firebase-config";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {addUser, removeUser} from "../Utils/userSlice";
import {reset} from "../Utils/editSlice";
import toast from "react-hot-toast";

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
        toast.success("Logged out successfully")
    }

    useEffect(() => {
        const unSubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                const {uid,email,displayName,photoURL} = auth.currentUser;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                navigate('/')
            }
            else {
                dispatch(removeUser());
                if (path !== '/') {
                    navigate('/login')
                }
            }
        });
        return ()=>unSubscribe()
    }, [])

    //if clicked outside the dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showDialog && !e.target.closest('.profile-menu')) {
                setShowDialog(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDialog]);

    return (
        <div className="w-screem flex flex-col items-center font-inter">
            <div className={`${hidden ? 'hidden' : 'fixed'} w-screen z-10 bg-white px-4 sm:px-6 md:px-10 py-3  flex items-center justify-between `}>
                <div className="flex items-center">
                    <Link to={"/"} className="mr-4 md:mr-8">
                        <svg width="54" height="27" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-14 md:h-14">
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

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-16">
                        {!isLanding && (
                            <>
                                <h1 className="font-medium cursor-pointer hover:text-gray-700" onClick={() => navigate("/")}>Home</h1>
                                <h1 className="font-medium cursor-pointer hover:text-gray-700" onClick={() => navigate("/public")}>Explore Templates</h1>
                            </>
                        )}
                    </div>
                </div>


                <div className="flex items-center">
                    {!user && (
                        <button
                            className="px-4 sm:px-7 py-1.5 sm:py-2 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </button>
                    )}

                    {userId && !isProfile && (
                        <div className="flex items-center space-x-2">
                            <button
                                className="hidden sm:block px-4 sm:px-7 py-1.5 sm:py-2 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                                onClick={handleSignOut}
                            >
                                Log Out
                            </button>

                            <div className="relative profile-menu">
                                <button
                                    className="text-black bg-lightGreen flex items-center justify-between p-1 rounded-full space-x-1"
                                    onClick={() => setShowDialog(!showDialog)}
                                >
                                    <img
                                        src={profileIMG}
                                        alt="Profile"
                                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                                    />
                                    <svg
                                        className="w-5 h-5 hidden sm:block"
                                        width="26"
                                        height="26"
                                        viewBox="0 0 26 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 15L7 10H17L12 15Z" fill="#1D1B20"/>
                                    </svg>
                                </button>

                                {showDialog && (
                                    <div className="absolute w-44 right-0 bg-lightGreen rounded-2xl p-4 flex flex-col justify-center shadow-2xl z-20">
                                        <div
                                            className="flex items-center space-x-3 w-full my-2 cursor-pointer text-sm hover:bg-black/5 p-1.5 rounded-lg transition-colors"
                                            onClick={() => {
                                                navigate(`/profile/${userId}`);
                                                setShowDialog(false);
                                            }}
                                        >
                                            <h1 className="tex-gray-800 font-medium">Profile</h1>
                                            <svg width="20" height="17" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                            </svg>
                                        </div>

                                        <div
                                            className="flex items-center space-x-3 w-full my-2 cursor-pointer text-sm hover:bg-black/5 p-1.5 rounded-lg transition-colors"
                                            onClick={() => {
                                                navigate(`/vault`);
                                                setShowDialog(false);
                                            }}
                                        >
                                            <h1 className="tex-gray-800 font-medium">Vault</h1>
                                            <svg width="20" height="17" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                            </svg>
                                        </div>

                                        <div
                                            className="flex items-center space-x-3 w-full my-2 cursor-pointer text-sm hover:bg-black/5 p-1.5 rounded-lg transition-colors"
                                            onClick={async () => {
                                                await dispatch(reset());
                                                navigate('/template/new');
                                                setShowDialog(false);
                                            }}
                                        >
                                            <h1 className="tex-gray-800 font-medium">Create New</h1>
                                            <svg width="20" height="17" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                            </svg>
                                        </div>

                                        <div className="sm:hidden border-t border-black/10 mt-2 pt-2">
                                            <div className="flex items-center space-x-3 w-full my-2 cursor-pointer text-sm hover:bg-black/5 p-1.5 rounded-lg transition-colors">
                                                <h1 className="tex-gray-800 font-medium">Explore</h1>
                                                <svg width="20" height="17" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.9185 2.88188C20.9868 2.29489 20.631 1.77119 20.1237 1.71215L11.8571 0.750165C11.3498 0.691132 10.8832 1.11912 10.8149 1.70611C10.7466 2.2931 11.1024 2.8168 11.6097 2.87583L18.9578 3.73094L17.9683 12.2336C17.9 12.8206 18.2559 13.3443 18.7632 13.4033C19.2705 13.4624 19.7371 13.0344 19.8054 12.4474L20.9185 2.88188ZM1.56203 21.0298L20.562 3.60211L19.438 1.94787L0.437972 19.3755L1.56203 21.0298Z" fill="currentColor"/>
                                                </svg>
                                            </div>

                                            <div
                                                className="flex items-center space-x-3 w-full my-2 cursor-pointer text-sm hover:bg-black/5 p-1.5 rounded-lg transition-colors"
                                                onClick={handleSignOut}
                                            >
                                                <h1 className="tex-gray-800 font-medium">Log Out</h1>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Header