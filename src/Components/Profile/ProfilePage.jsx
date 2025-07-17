import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../Utils/firebase-config";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";
import HoverWrapper from "./HowerWrapper";
import {signOut} from "firebase/auth";
import {reset} from "../../Utils/editSlice";
import toast from "react-hot-toast";
import ApiBox from "./ApiBox";

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const email = useSelector((state) => state.user?.email);
    const profileIMG = useSelector((state) => state.user?.photoURL);
    const displayName = useSelector((state) => state.user?.displayName);

    const handleShowVault = () => {
        navigate('/vault')
    }
    const handleCreate = () => {
        dispatch(reset())
        navigate('/template/new')

    }
    const handleSignOut = () => {
        signOut(auth)
        navigate('/')
        toast.success("Successfully logged out")
    }

    return (
        <div>
            <div
                className={'min-h-screen flex flex-col items-center font-inter mx-4 sm:mx-10 mt-8 sm:mt-14 py-4 sm:py-6'}>
                <div
                    className={'bg-custom-img2 bg-object-cover bg-object-center rounded-3xl w-full h-[20vh] sm:h-[40vh]'}>
                </div>
                <div className={'rounded-b-3xl w-full h-auto sm:h-[60vh]'}>
                    <div
                        className={'flex flex-col sm:flex-row items-center sm:items-end justify-between w-full z-10 -mt-16 sm:-mt-24 px-2 sm:px-4'}>
                        <div
                            className="flex flex-col sm:flex-row items-center sm:items-end justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <img src={profileIMG} alt=""
                                 className={'h-32 w-32 sm:h-48 sm:w-48 m-2 rounded-full object-cover'}/>
                            <div className={'mb-4 sm:mb-7 text-center sm:text-left'}>
                                <h1 className={'text-2xl sm:text-4xl font-medium'}>{displayName}</h1>
                                <h1 className={'text-lg sm:text-xl'}>{email}</h1>
                            </div>
                        </div>

                    </div>
                    <div className={'flex items-center justify-center md:justify-start space-x-4 sm:space-x-8 px-4 sm:px-10 my-3'}>
                        <button
                            onClick={handleSignOut}
                            className={'px-5 sm:px-12 py-2 sm:py-2.5 bg-black text-white rounded-full text-sm sm:text-base'}>Log
                            Out
                        </button>
                    </div>
                    <div
                        className={'w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 my-4 sm:my-8'}>
                        <HoverWrapper title={'Show Vault'}
                                      desc={'Access your vault full of templates created, generated or saved by you.'}
                                      func={handleShowVault}/>
                        <HoverWrapper title={'Create New'} desc={'Create a new template specific to your needs'}
                                      func={handleCreate}/>
                        <ApiBox/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ProfilePage;