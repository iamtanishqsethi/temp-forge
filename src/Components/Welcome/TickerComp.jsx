import CountUp from "react-countup";

const TickerComp=()=>{
    return  (
        <div className={'h-[75vh] w-[49.5%] flex flex-col items-center  justify-center'}>
            <div className="h-[50%] w-full relative rounded-3xl m-2 flex items-center justify-between overflow-hidden group">
                <div
                    className="absolute inset-0 bg-brain-img bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
                ></div>
                <div className="relative z-10">
                    <h1 className="text-5xl p-2 mx-4 font-light text-left text-white w-[45%] group-hover:scale-105 transition-transform duration-300">
                        prompt+
                    </h1>
                </div>
                <div className="relative z-10 text-5xl p-2 mx-4 font-light text-right text-white w-[45%] group-hover:scale-105 transition-transform duration-300">
                    EVERY INCREASING USER
                </div>
            </div>
            <div className={'h-[50%] flex items-center justify-between w-full font-light'}>
                <div className={'p-8 text-2xl h-full m-2 rounded-3xl w-[49.5%] bg-zinc-200 text-black flex flex-col items-center justify-center'}>
                    <h1 className={'text-6xl hover:scale-110 transition-transform ease-in-out duration-300'}>
                        <CountUp
                            start={0}
                            end={10000}
                            duration={2.5}
                            separator=""
                            enableScrollSpy
                            scrollSpyDelay={150}
                        />
                        +
                    </h1>
                    <h1>Ideas</h1>
                </div>
                <div className={'p-8 text-2xl h-full m-2 rounded-3xl w-[49.5%] bg-black text-white flex flex-col items-center justify-center'}>
                    <h1 className={'text-6xl hover:scale-110 transition-transform ease-in-out duration-300'}><CountUp
                        start={0}
                        end={1000}
                        duration={2.5}
                        separator=""
                        enableScrollSpy
                        scrollSpyDelay={150}
                    />+</h1>
                    <h1>Templates To choose from</h1>
                </div>
            </div>
        </div>
    )
}
export default TickerComp