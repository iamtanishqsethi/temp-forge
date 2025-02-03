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
            <div className={'bg-orangeBg h-full w-[50%] flex flex-col items-center  justify-start'}>
                    <svg width="90%" height="80%" viewBox="0 0 1000 900" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <path d="M434.505 175.794L428 311.687L553.462 320L555.321 265.504C555.63 271.662 560.153 283.792 575.766 283.053C591.379 282.315 598.69 266.621 599 258.924C599 238.603 584.13 232.252 573.908 232.252C565.729 232.252 559.967 239.025 558.109 242.412L559.967 183.298L510.712 180.527C518.89 175.354 522.174 164.824 522.793 160.206C523.537 143.211 506.995 137.73 498.63 137.115C479.3 135.637 472.609 148.814 471.679 155.588C470.936 165.933 478.185 174.677 481.902 177.756L434.505 175.794Z" fill="black" stroke="black"/>
                        <path d="M600.924 694.656C606.845 670.973 557.752 635.448 532.465 620.646H446.428L427 657.651L452.904 678.929C562.439 718.894 597.224 706.066 600.924 694.656Z" fill="black"/>
                        <path d="M488.984 409.717C494.226 402.933 504.526 394.545 503.786 415.268C503.046 435.991 493.61 420.202 488.984 409.717Z" fill="#EB4F05" stroke="black"/>
                        <path d="M451.979 419.894C413.494 400.651 425.898 422.357 437 435C448.41 443.943 479.178 462.82 510.262 471.701C541.346 480.582 527.839 460.599 513.962 455.973C521.363 396.765 474.182 407.559 451.979 419.894Z" fill="#EB4F05" stroke="black"/>
                        <path d="M649.031 287.6C636.449 303.883 643.788 340.024 649.031 356.06L658.282 369.011C660.749 369.628 667.718 367.901 675.859 356.06C684.001 344.218 683.569 315.354 682.335 302.402C674.934 305.363 671.234 322.755 670.309 331.081L665.683 293.151L649.031 287.6Z" fill="#EB4F05" stroke="black"/>
                        <path d="M513.962 509.631L471.406 647.475C647.551 619.351 681.719 443.947 676.785 359.76C663.463 348.659 649.647 352.051 644.405 355.135C642.925 438.026 599.999 468.617 578.721 473.551C539.496 480.212 519.205 500.38 513.962 509.631Z" fill="white" stroke="black"/>
                        <ellipse cx="601.849" cy="500.379" rx="9.25126" ry="10.1764" fill="#EB4F05"/>
                        <path d="M609.25 475.401C597.409 478.362 594.448 470.775 594.448 467.075C604.81 461.154 619.427 442.713 624.052 437.471C633.674 529.243 617.268 503.463 609.25 475.401Z" fill="#EB4F05" stroke="black"/>
                        <path d="M568.545 609.544C569.161 588.883 581.682 547.746 626.828 548.486C618.193 562.671 594.448 594.742 568.545 609.544Z" fill="#EB4F05"/>
                        <path d="M555.593 490.203C550.967 529.675 546.157 593.632 563.919 533.684C565.461 527.208 571.135 515.181 581.497 518.882" stroke="black"/>
                        <path d="M641.63 390.29C645.33 387.514 657.542 384.739 676.785 395.84" stroke="black"/>
                        <path d="M650.881 351.434C653.348 358.527 656.802 375.858 650.881 388.439" stroke="black"/>
                        <path d="M663.833 353.284C666.3 360.377 669.754 377.708 663.833 390.289" stroke="black"/>
                        <path d="M402.947 252.446C260.108 365.681 282.372 485.886 311.36 531.834L419.599 483.727C411.458 434.881 398.938 402.933 393.696 393.065C361.872 344.958 397.705 294.076 419.599 274.649C421.08 254.666 409.115 251.52 402.947 252.446Z" fill="white" stroke="black"/>
                        <path d="M341.889 394.915C327.827 382.333 355.766 353.284 380.744 347.734C379.819 369.011 384.445 381.963 393.696 393.065C378.894 398.986 373.343 392.448 373.343 387.514C354.1 398.616 344.356 397.074 341.889 394.915Z" fill="#EB4F05" stroke="black"/>
                        <circle cx="365.017" cy="312.579" r="6.90101" fill="#EB4F05" stroke="black"/>
                        <path d="M292.857 425.444C305.809 435.929 323.941 462.079 292.857 482.802C290.39 470.159 286.936 440.986 292.857 425.444Z" fill="#EB4F05" stroke="black"/>
                        <path d="M340.038 440.246C350.832 435.312 374.083 428.405 380.744 440.246C381.978 443.022 377.784 452.088 351.14 466.15C324.496 480.212 344.356 481.26 357.616 480.027" stroke="black"/>
                        <path d="M385.37 266.322C389.893 267.433 400.295 273.427 405.723 288.525" stroke="black"/>
                        <path d="M392.771 270.023C397.413 265.089 407.982 255.221 413.124 255.221" stroke="black"/>
                        <path d="M400.172 276.499C404.797 271.565 414.974 262.252 418.674 264.472" stroke="black"/>
                        <path d="M435.327 207.114C431.626 202.489 407.573 236.41 399.247 256.146C406.648 252.446 417.132 265.089 421.45 271.873C480.658 201.564 452.904 220.375 431.626 238.569C425.705 229.688 430.393 213.59 435.327 207.114Z" fill="#EB4F05" stroke="black"/>
                        <path d="M415.5 444.5C412.5 461.5 396 469 358 488C336 499 291.007 515.859 285.456 521.718L244 598.503V639L285.456 689.166C335 715.5 377.352 714.452 423.3 704.893C444.023 692.311 464.716 666.143 471.5 653.5C480.381 625.376 487.442 604.363 490.834 598.503C518.958 574.82 532.326 564 523.214 538.37C511.372 505.066 513.346 471.701 514.887 455.974C500.085 392.14 433.5 422.5 415.5 444.5Z" fill="#EB7705"/>
                        <path d="M516 507C513.2 507.4 513.167 484.5 513.5 473C514 471 514.833 461.667 514.5 456C510.5 434.5 496.5 424.333 490.5 421.5C482.333 417.667 460.239 412.775 435 429C428 433.5 427.5 448.5 413 451.5" stroke="black"/>
                        <path d="M476 444C464.667 459.333 452 482 443 505C436.171 522.453 424 584 396 587" stroke="black"/>
                        <path d="M615.592 189.544L560.435 184L556.758 242.215C564.112 230.387 575.144 229.895 579.74 231.127C598.126 238.519 598.432 253.304 596.287 259.772C596.287 279.732 580.966 284.105 573.305 283.797C563.744 283.797 558.29 276.405 556.758 272.709L554 320.759L673.507 330L677.184 272.709C680.862 285.276 692.2 287.186 697.409 286.57C711.382 285.83 716.101 272.093 716.714 265.316C718.92 244.618 707.827 236.363 702.005 234.823C690.238 231.866 682.394 242.215 680.862 246.835L685.458 196.937L634.897 193.241C646.664 200.633 645.929 211.722 645.009 215.418C641.792 228.354 633.978 231.127 622.027 231.127C605.112 231.127 599.045 217.266 599.045 209.873C599.045 196.937 608.851 191.7 615.592 189.544Z" fill="white" stroke="black"/>
                        <path d="M462 433.5C453.167 439.5 445 460 425.5 481C406 502 371.5 542 307.5 549.5C291.333 553.167 259.1 572 259.5 618" stroke="black"/>
                        <path d="M491 458C481.667 467 473.4 492.8 471 528C467.333 572.333 438.4 663.2 352 672" stroke="black"/>
                    </svg>
                <div className={'flex flex-col items-center font-inter text-white -mt-16 px-6 text-center pb-12'}>
                    <h1 className={'text-5xl font-medium'}>
                        MAKING YOUR IDEAS ORGANISED.
                    </h1>
                    <p className={'text-sm px-16 m-2'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In ex ante, tempus at ornare ut, tincidunt ut diam.
                        Phasellus consequat mi et ipsum sollicitudin fringilla.
                        Sed sem orci, dapibus id venenatis eget, vehicula varius dui.
                    </p>
                </div>



            </div>
            <div className={'bg-white h-full w-[50%] flex flex-col items-center p-20'}>
                <h1 className={'font-light text-5xl my-1'}>{isSigninForm?'SIGN IN':'SIGN UP'}</h1>
                <h1 className={'text-xl font-extralight my-1'}>{isSigninForm?`Welcome back, your vault of prompts await you`:'Welcome User, your vault of prompts await you'}</h1>
                <form className={'flex flex-col items-center justify-center my-12  w-full'}>
                    {!isSigninForm && <input ref={name} type="text" placeholder={'Name'}
                                             className={'w-full border-2 border-gray-400 rounded-lg p-2.5 my-3 placeholder:text-xl text-xl'}/>}

                    <input type="email" ref={email} placeholder={'Email'}
                           className={'w-full border-2 border-gray-400 rounded-lg p-2.5 my-3 placeholder:text-xl text-xl'}/>
                    <input type="password" ref={password} placeholder={"Password"}
                           className={'w-full border-2 border-gray-400 rounded-lg p-2.5 my-3 placeholder:text-xl text-xl'}/>
                    <button
                        onClick={handleClick}
                        className={'bg-blue-800 rounded-lg w-full  p-2.5 my-5 text-white font-bold text-xl'}>{isSigninForm?'LOG IN':'SIGN UP'}</button>
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