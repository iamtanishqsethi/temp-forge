import {useState} from "react";

const VaultItem=({templateData,handlePost,handleDelete,handleUse})=>{
    //post ,delete , use template
    const [isHover, setIsHover] = useState(false)
    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`col-span-1 ${isHover?'bg-lightGreen':'bg-zinc-200'} min-h-64 rounded-3xl p-6 transition ease-in-out duration-300 flex flex-col  justify-between`}>
            <div>
                <h1 className={'font-medium text-lg'}>{templateData.templateTitle}</h1>
                <h2 className={'text-sm font-light'}>{templateData.templateStr}</h2>
            </div>

            {isHover && <div className={'flex items-center justify-end my-2 space-x-4 '}>
                <button
                    onClick={handleUse}
                    className={'bg-black text-white text-sm px-4 py-1 rounded-full transition ease-in-out duration-300'}>Use</button>
                <button
                    onClick={handlePost}
                    className={'bg-black text-white text-sm px-4 py-1 rounded-full transition ease-in-out duration-300'}>Post Online</button>
                <button
                onClick={handleDelete}
                    className={'bg-black text-white text-sm px-4 py-1 rounded-full transition ease-in-out duration-300'}>Delete</button>
            </div>}

        </div>
    )
}
export default VaultItem