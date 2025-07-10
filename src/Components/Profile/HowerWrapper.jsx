import {useState} from "react";

const HoverWrapper = ({title, desc, func}) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`w-full sm:w-1/3 h-44 md:h-60 rounded-3xl p-4 sm:p-8 ${isHover ? "bg-lightGreen" : 'bg-zinc-200'} transition ease-in-out duration-300`}>
            <h1 className={'text-2xl sm:text-3xl my-2'}>{title}</h1>
            <p className={'text-base sm:text-lg'}>{desc}</p>
            <div className="flex items-center justify-end">
                <button
                    onClick={func}
                    className={`transition ease-in-out duration-300 m-2 ${!isHover && 'sm:hidden'}`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_521_350)">
                            <path
                                d="M24.175 19L18.575 13.4L20 12L28 20L20 28L18.575 26.6L24.175 21L12 21L12 19L24.175 19Z"
                                fill="black"/>
                        </g>
                        <rect x="39" y="39" width="38" height="38" rx="19" transform="rotate(-180 39 39)" stroke="black"
                              stroke-width="2"/>
                        <defs>
                            <clipPath id="clip0_521_350">
                                <rect x="40" y="40" width="40" height="40" rx="20" transform="rotate(-180 40 40)"
                                      fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default HoverWrapper;