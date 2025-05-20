import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer=()=>{
    return (
        <div className={'bg-black text-white p-4 md:p-8 lg:p-16 bottom-0 w-full mt-6 flex flex-col font-inter justify-center space-y-8 md:space-y-16'}>
            <div className={'flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:justify-between'}>
                <h1 className={'text-xl md:text-2xl text-center md:text-left'}>Unlock the full potential of AI</h1>
                <div className={'flex items-center justify-center text-xl space-x-6 md:space-x-8'}>
                    <button><XIcon/></button>
                    <button><LinkedInIcon/></button>
                    <button><InstagramIcon/></button>
                </div>
            </div>
            <div className={'flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:justify-between'}>
                <h1 className={'text-lightGreen text-xs sm:text-sm text-center md:text-left'}>
                    Designed By: Sumit Singh Bisht <span className={'hidden md:inline px-2'}>|</span>
                    <span className={'block md:inline'}> Developed By: Tanishq Sethi</span>
                </h1>
                <div className={'flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-8'}>
                    <svg width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
                        <circle cx="9" cy="9" r="8.5" stroke="#8C8C8C"/>
                        <circle cx="27" cy="9" r="8.5" stroke="#8C8C8C"/>
                        <circle cx="18" cy="9" r="8.5" stroke="#8C8C8C"/>
                    </svg>
                    <div className="flex space-x-4 text-xs">
                        <h1>2025</h1>
                        <h1>Copyright.inc</h1>
                        <h1>All rights reserved</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;