import {useSelector} from "react-redux";
import {auth, database} from "../../Utils/firebase-config";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../Footer";
import HoverWrapper from "../HowerWrapper";
import {signOut} from "firebase/auth";

const ProfilePage=()=>{
    const navigate = useNavigate()
    const userId=useSelector((state)=>state.user?.uid);
    const email = useSelector((state)=>state.user?.email);
    const profileIMG=useSelector((state)=>state.user?.photoURL);
    const displayName=useSelector((state)=>state.user?.displayName);

    const handleShowVault=()=>{
        navigate('/vault')
    }
    const handleCreate=()=>{
        navigate('/template/new')
    }
    const handleSignOut=()=>{
        signOut(auth)
        navigate('/')
    }

    return(
        <div>
            <div className={'min-h-screen flex flex-col items-center  font-inter  mx-10 mt-14 py-6'}>
                <div className={'bg-custom-img2  bg-object-cover bg-object-center rounded-t-3xl w-full h-[40vh]'}>

                </div>
                <div className={' rounded-b-3xl w-full h-[60vh] '}>
                    <div className={'flex items-center justify-between w-full z-10 -mt-24 px-4'}>
                        <div className="flex items-end justify-center space-x-4">
                            <img src={profileIMG} alt="" className={'h-48 w-48 m-2 rounded-full object-cover'}/>
                            <div className={'mb-7'}>
                                <h1 className={'text-4xl font-medium'}>{displayName}</h1>
                                <h1 className={' text-xl'}>{email}</h1>
                            </div>

                        </div>
                        <div className={'flex items-end justify-center space-x-16 text-zinc-500 text-lg pt-14 pr-6'}>
                            <h1>Templates : 22</h1>
                            <h1>Saved By : 22</h1>
                            <h1>Templates : 22</h1>
                        </div>
                    </div>
                    <div className={'flex items-center justify-start space-x-8 px-6 my-3'}>
                        <button className={'px-7 py-2.5 bg-black text-white rounded-full '}>Edit Profile</button>
                        <button
                            onClick={handleSignOut}
                            className={'px-7 py-2.5 bg-black text-white rounded-full '}>Log Out</button>
                    </div>
                    <div className={'w-full flex items-center justify-center space-x-4 mx-4 my-8'}>
                        <HoverWrapper title={'Show Vault'} desc={'Access your vault full of templates created, generated or saved by you.'} func={handleShowVault}/>
                        <HoverWrapper title={'Create New'} desc={'Create a new template specific to your needs'} func={handleCreate}/>
                        <HoverWrapper title={'Show Vault'} desc={'Access your vault full of templates created, generated or saved by you.'} func={handleShowVault}/>

                    </div>
                </div>

            </div>
            <Footer/>
        </div>

    )
}
export default ProfilePage;