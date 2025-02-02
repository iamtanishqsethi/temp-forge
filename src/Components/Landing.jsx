import {useNavigate} from "react-router-dom";

const Landing=()=>{
    const navigate=useNavigate();
    return(
        <div className={'h-screen flex flex-col items-center justify-center font-inter'}>
            <h1 className={'text-7xl text-center text-orangeBg font-bold px-44'}>
                A VAULT FOR YOUR
                TEMPLATE AND PROMPTS.
            </h1>

            <button className={'p-3 m-2 bg-orangeBg text-white'} onClick={()=>navigate('/login')}>Get started</button>
        </div>
    )
}
export default Landing