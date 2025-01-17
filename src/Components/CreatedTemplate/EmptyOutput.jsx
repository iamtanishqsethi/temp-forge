import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const EmptyOutput = () => {
    return (
        <div className={'flex flex-col justify-center items-center h-full w-[60%]'}>
            <div
                className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border-2 border-yellow-500 backdrop-blur-xl rounded-lg shadow-lg w-4/5 h-4/5 mt-20'}>
                <div className="flex justify-between items-center px-2">

                    <div className="flex items-center">
                        <h1 className="text-white text-lg font-medium flex items-center p-2 mx-2 my-1">
                            <ElectricBoltIcon sx={{ fontSize: 30 }} className={'text-yellow-500 mr-1'} />
                            Output
                        </h1>
                    </div>


                </div>


                <div className={'h-1 w-1/2 rounded-lg px-2 mx-2 bg-yellow-500'}></div>

                <textarea
                    className={' bg-transparent w-full h-4/5 p-4 outline-none text-zinc-300 text-center text-lg'}
                    placeholder={'output prompt will go here'}
                    readOnly={true}
                    value={"Click on Render to generate Prompt"}
                >
        </textarea>
            </div>
        </div>
    );
};

export default EmptyOutput;