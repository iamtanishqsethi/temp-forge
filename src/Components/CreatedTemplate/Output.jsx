const Output = ({value}) => {
    return (

        <div className={'w-full h-full border-2 border-black rounded-3xl p-6 flex flex-col '}>
            <div className={'flex space-x-4'}>
                <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6 35.9L14.8 22.1L2.9 29.4L7.45058e-08 24.9L12.4 17.6L0.4 10.4L3.3 6L14.7 13.1L14.6 -4.76837e-06H20L19.9 13L31.2 6L34.2 10.4L22.2 17.6L34.7 24.9L31.6 29.4L19.8 22.1L20 35.9H14.6Z" fill="#E9FA9C"/>
                </svg>
                <h1 className={'text-4xl'}>Output</h1>
            </div>
            <textarea
                className={' resize-none bg-transparent w-full h-4/5 p-4 outline-none border-2 border-zinc-200 rounded-3xl my-2 text-left text-lg'}
                placeholder={'output prompt will go here'}
                readOnly={true}
                value={value}

            >
            </textarea>
            <div className={'flex items-center justify-end'}>
                <button
                    onClick={()=>window.navigator.clipboard.writeText(value)}
                    className={'bg-black text-white px-7 py-2 rounded-full'}>Copy</button>
            </div>
        </div>

    );
};

export default Output;