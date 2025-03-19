import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const VaultItem = ({ templateData, handlePost, handleDelete, handleUse }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="bg-zinc-100 group hover:bg-lightGreen rounded-2xl p-6 shadow hover:shadow-lg transition-all flex flex-col justify-between relative"
        >

            <button
                onClick={() => window.navigator.clipboard.writeText(templateData.templateStr)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Copy Template"
            >
                <ContentCopyIcon />
            </button>


            <div className="mb-12">
                <h1 className="text-3xl font-medium mb-3 text-left">{templateData.templateTitle}</h1>
                <p className="text-base">{templateData.templateStr}</p>
            </div>


            {isHover && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-end items-center space-x-4">
                    <button
                        onClick={handleUse}
                        className="bg-black text-white text-sm px-4 py-1.5 rounded-full transition-all duration-300"
                    >
                        Use
                    </button>
                    <button
                        onClick={handlePost}
                        className="bg-black text-white text-sm px-4 py-1.5 rounded-full transition-all duration-300"
                    >
                        Post
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-black text-white text-sm px-4 py-1.5 rounded-full transition-all duration-300"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default VaultItem;
