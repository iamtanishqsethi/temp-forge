import CountUp from "react-countup";

const TickerComp = () => {
    return (
        <div className="w-full lg:w-[49.5%] flex flex-col items-center justify-center gap-4 my-4 lg:my-0">
            <div className="h-48 md:h-72 w-full relative rounded-3xl flex flex-col md:flex-row items-center justify-between overflow-hidden group">
                <div
                    className="absolute inset-0 bg-brain-img bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
                ></div>
                <div className="relative z-10 w-full md:w-[45%] p-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center md:text-left text-white group-hover:scale-105 transition-transform duration-300">
                        prompt+
                    </h1>
                </div>
                <div className="relative z-10 w-full md:w-[45%] p-4">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-light text-center md:text-right text-white group-hover:scale-105 transition-transform duration-300">
                        EVERY INCREASING USER
                    </h1>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-between w-full font-light gap-4">
                <div className="p-5 md:p-8 text-xl md:text-2xl rounded-3xl w-full md:w-[49.5%] bg-zinc-200 text-black flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl hover:scale-110 transition-transform ease-in-out duration-300">
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

                <div className="p-5 md:p-8 text-xl md:text-2xl rounded-3xl w-full md:w-[49.5%] bg-black text-white flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl hover:scale-110 transition-transform ease-in-out duration-300">
                        <CountUp
                            start={0}
                            end={1000}
                            duration={2.5}
                            separator=""
                            enableScrollSpy
                            scrollSpyDelay={150}
                        />
                        +
                    </h1>
                    <h1 className="text-center">Templates To choose from</h1>
                </div>
            </div>
        </div>
    );
};

export default TickerComp;