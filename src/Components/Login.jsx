import {useState,useRef} from "react";
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser} from "../Utils/userSlice";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth, googleProvider,githubProvider} from "../Utils/firebase-config";
import {checkValidData} from "../Utils/validate";
import { signInWithPopup } from "firebase/auth";
import {PROFILE_URL} from "../Utils/constants";


const Login=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSigninForm, setIsSigninForm] = useState(true);
    const [errorMessage,setErrorMessage]=useState(null);

    const email=useRef(null)
    const password=useRef(null)
    const name=useRef(null)


    const handleClick=(e)=>{
        e.preventDefault();
        const message =checkValidData(email.current.value,password.current.value)
        setErrorMessage(message)

        if(message) return;
        console.log('VALID')

        if(isSigninForm){//sign in existing user
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });

        }
        else{
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user)
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: PROFILE_URL
                    }).then(()=>{
                        const {uid,email,displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                        navigate('/welcome')
                    })


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });
        }




    }

    const handleGoogleSignin=async (e)=>{
        e.preventDefault()
        try{
            const result=await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        }catch (error){
            setErrorMessage("Google Sign-In Error:"+ error);
        }

    }
    const handleGitHubSignin=async (e)=>{
        e.preventDefault()
        try{
            const result=await signInWithPopup(auth, githubProvider);
            const user = result.user;
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        }catch (error){
            setErrorMessage("GitHub Sign-In Error:"+ error);
        }
    }



    return (
        <div className={'bg-white  text-black font-inter flex items-center justify-between h-screen'}>
            <div className={'  h-full w-[47%] flex flex-col items-center  justify-center'}>
                <div className={'bg-custom-img  object-center object-cover h-[98%] w-[94%] flex flex-col items-center  justify-center m-2 rounded-3xl'}>
                    <svg width="300" height="170" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="37" y="9.21204" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 37 9.21204)" fill="white"/>
                        <rect x="55.5759" y="9.21204" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 55.5759 9.21204)" fill="white"/>
                        <rect x="37" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 37 27.7878)" fill="white"/>
                        <rect x="55.5759" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 55.5759 27.7878)" fill="white"/>
                        <rect y="9.21216" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 0 9.21216)" fill="white"/>
                        <rect x="18.5759" y="9.21216" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 18.5759 9.21216)" fill="white"/>
                        <rect y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 0 27.7878)" fill="white"/>
                        <rect x="18.5759" y="27.7878" width="13.0278" height="13.0278" rx="2" transform="rotate(-45 18.5759 27.7878)" fill="white"/>
                    </svg>
                    <h1 className={'text-6xl font-bold text-white my-2'}>TEMPFORGE</h1>

                </div>

            </div>
            <div className={'bg-white h-full w-[54%] flex flex-col items-center p-20'}>
                <h1 className={'font-light text-7xl my-1'}>{isSigninForm?'SIGN IN':'SIGN UP'}</h1>
                <h1 className={'text-2xl font-extralight my-1'}>{isSigninForm?`Welcome back, your vault of prompts await you`:'Welcome User, your vault of prompts await you'}</h1>
                <form className={'flex flex-col items-center justify-center my-12  w-full'}>
                    {!isSigninForm && <input ref={name} type="text" placeholder={'Name'}
                                             className={'w-full border-2 border-gray-400 rounded-2xl p-2.5 my-3 placeholder:text-xl text-xl'}/>}

                    <input type="email" ref={email} placeholder={'Email'}
                           className={'w-full border-2 border-gray-400 rounded-2xl p-2.5 my-3 placeholder:text-xl text-xl'}/>
                    <input type="password" ref={password} placeholder={"Password"}
                           className={'w-full border-2 border-gray-400 rounded-2xl p-2.5 my-3 placeholder:text-xl text-xl'}/>
                    <button
                        onClick={handleClick}
                        className={'bg-blue-800 rounded-3xl w-full  p-3.5 my-5 text-white font-bold text-xl'}>{isSigninForm?'SIGN IN':'SIGN UP'}</button>
                    {isSigninForm && <><div className={'flex items-center justify-between w-full'}>
                        <div className={'h-[1.5px] w-[45%] bg-zinc-700'}></div>
                        <span className={'text-lg text-zinc-800'}>or</span>
                        <div className={'h-[1.5px] w-[45%] bg-zinc-700'}></div>
                    </div>
                     <div className={'flex items-center justify-center'}>
                        <button
                            className={'p-2.5 flex m-2 bg-white text-black  border border-zinc-500 rounded-lg'}
                            onClick={handleGoogleSignin}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                                 viewBox="0 0 48 48">
                                <path fill="#FFC107"
                                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00"
                                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50"
                                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2"
                                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span className={'m-1'}>Google</span></button>
                        <button
                            className={'p-2.5 flex m-2 bg-white text-black  border border-zinc-500 rounded-lg'}
                            onClick={handleGitHubSignin}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                                 viewBox="0 0 64 64">
                                <path
                                    d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                            </svg>
                            <span className={'m-1'}>GitHub</span></button>
                    </div>
                    </>}
                    <p className={'cursor-pointer bg-red-600 my-2'}>{errorMessage}</p>
                    <p className={'cursor-pointer text-zinc-600 hover:text-zinc-800 my-2'} onClick={() => setIsSigninForm(!isSigninForm)}>{isSigninForm?'Don’t have an account? Sign up':'Already have an account? Sign In'}</p>
                </form>


            </div>
        </div>
    )
}
export default Login