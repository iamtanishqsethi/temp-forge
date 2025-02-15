import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer=()=>{
    return (
        <div className={'bg-black text-white p-16 bottom-0 w-full mt-6 flex flex-col font-inter justify-center space-y-16'}>
            <div className={'flex  items-center justify-between'}>
                <h1 className={'text-2xl '}>Unlock the full potential of AI</h1>
                <div className={'flex items-center justify-center text-xl space-x-8'}>
                    <button><XIcon/></button>
                    <button><LinkedInIcon/></button>
                    <button><InstagramIcon/></button>
                </div>
            </div>
            <div className={'flex  items-center justify-between'}>
                <h1 className={'text-lightGreen text-sm'}>Designed By : Sumit Singh Bisht <span className={'px-2'}></span>  Developed By : Tanishq Sethi</h1>
                <div className={'flex items-center justify-center text-xl space-x-8'}>
                    <svg width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="8.5" stroke="#8C8C8C"/>
                        <circle cx="27" cy="9" r="8.5" stroke="#8C8C8C"/>
                        <circle cx="18" cy="9" r="8.5" stroke="#8C8C8C"/>
                    </svg>
                    <h1 className={'text-xs'}>2025</h1>
                    <h1 className={'text-xs'}>Copyright.inc</h1>
                    <h1 className={'text-xs'}>All rights reserved</h1>
                </div>
            </div>
        </div>
    )
}
export default Footer;