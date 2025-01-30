import {useState,useRef} from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser} from "../Utils/userSlice";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth, googleProvider,githubProvider} from "../Utils/firebase-config";
import {checkValidData} from "../Utils/validate";
import { signInWithPopup } from "firebase/auth";


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
                        displayName: name.current.value
                    }).then(()=>{
                        const {uid} = auth.currentUser;
                        dispatch(addUser(uid));
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

    const handleGoogleSignin=async ()=>{
        try{
            const result=await signInWithPopup(auth, googleProvider);
            const user = result.user;
            dispatch(addUser(user.uid));
        }catch (error){
            setErrorMessage("Google Sign-In Error:"+ error);
        }

    }
    const handleGitHubSignin=async ()=>{
        try{
            const result=await signInWithPopup(auth, githubProvider);
            const user = result.user;
            dispatch(addUser(user.uid));
        }catch (error){
            setErrorMessage("GitHub Sign-In Error:"+ error);
        }
    }



    return (
        <div className={'bg-gradient-to-tl from-amber-700 via-zinc-900 to-zinc-950 text-white flex flex-col items-center justify-center h-screen'}>
            <div className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border-2 rounded-lg border-gray-500 backdrop-blur-xl h-[85%] w-[35%] p-8 mt-20'}>
                <form className={'flex flex-col  justify-center '}>
                    <h1 className={'text-4xl mx-2 my-3 font-bold'}>{isSigninForm ? ('Sign In') : ('Sign Up')}<WhatshotIcon sx={{ fontSize: 30 }} className={'text-amber-500 mx-2'}/></h1>
                    {!isSigninForm && (<div className={'w-full'}>
                        <h1 className={' text-xl m-2 text-gray-200'}>
                            Enter your Name :
                        </h1>
                        <input ref={name} type="text" placeholder={'Name'} className={'p-3 m-2 w-3/4 bg-zinc-700/10 border border-gray-500 rounded-md'}/>
                    </div>)
                    }
                    <h1 className={' text-xl m-2 text-gray-200'}>
                        Enter your email address :
                    </h1>
                    <input ref={email} type="email" placeholder={'Email'} className={'p-3 m-2 w-3/4 bg-zinc-700/10 border border-gray-500 rounded-md'}/>
                    <h1 className={' text-xl m-2 text-gray-200'}>
                        Enter your password :
                    </h1>
                    <input ref={password} type="password" placeholder={'Password'} className={'p-3 m-2 w-3/4 bg-zinc-700/10 border border-gray-500 rounded-md'}/>
                    <p className={"text-red-500 font-bold py-2 "}>{errorMessage}</p>
                    <button
                        className={'py-3 m-2 bg-blue-700 text-white text-xl font-medium rounded-md'}
                        onClick={handleClick}
                    >{isSigninForm ? ('Sign In') : ('Sign Up')}</button>
                    <p
                        className={'text-gray-500 font-bold cursor-pointer text-lg'}
                        onClick={() => setIsSigninForm(!isSigninForm)}
                    >{isSigninForm ? ('New User ? Sign Up') : ('Already a User ? Sign In')}</p>

                </form>
                <div className={'flex items-center justify-center'}>
                    <button
                        className={'p-3 m-2 bg-white text-black font-bold'}
                        onClick={handleGoogleSignin}
                    >Sign In with Google </button>
                    <button
                        className={'p-3 m-2 bg-black text-white'}
                        onClick={handleGitHubSignin}
                    >Sign In with GitHub</button>
                </div>

            </div>
        </div>
    )
}
export default Login