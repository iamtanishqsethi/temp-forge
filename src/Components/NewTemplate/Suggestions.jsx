
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const Suggestions = () => {
    return (
        <div className={'flex flex-col justify-center items-center h-full w-[35%]'}>
            <div
                className={'bg-gradient-to-br from-zinc-950/10 to-zinc-800/10 border border-red-700 backdrop-blur-xl rounded-lg shadow-lg w-full h-full my-6'}>
                <div className="flex flex-col justify-between items-start">
                    <h1 className="text-white text-lg font-medium p-2 mx-2 my-1">
                        <DoubleArrowIcon sx={{ fontSize: 30 }} className={'text-red-700'} /> Suggestions
                    </h1>
                    <div className={'h-1 w-1/2 rounded-lg px-2 mx-2 bg-red-700'}></div>
                </div>
                <div className="text-white bg-transparent w-full h-4/5 p-4 overflow-y-auto space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-green-600 mb-2">
                            Template Rules
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>
                                Enclose variables in{" "}
                                <span className="text-green-600 font-mono">{"{{ }}"}</span>, e.g.,{" "}
                                <span className="bg-gray-800 px-2 py-1 rounded font-mono">
                  {"{{username}}"}
                </span>.
                            </li>
                            <li>
                                Use clear variable names like{" "}
                                <span className="bg-gray-800 px-2 py-1 rounded font-mono">
                  {"{{product_name}}"}
                </span>.
                            </li>
                            <li>Document required variables for clarity.</li>
                        </ul>
                    </div>

                    {/* Prompt Tips */}
                    <div>
                        <h2 className="text-lg font-semibold text-blue-500 mb-2">
                            Prompt Tips
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>
                                Be <span className="text-blue-500 font-semibold">specific</span> and provide{" "}
                                <span className="text-blue-500 font-semibold">context</span>.
                            </li>
                            <li>
                                Use examples, e.g.,{" "}
                                <blockquote className="bg-gray-800 px-3 py-1 rounded italic mt-1">
                                    "Rewrite: 'Can't attend' → 'I will be unable to attend.'"
                                </blockquote>
                            </li>
                            <li>Break down tasks into simple steps.</li>
                            <li>
                                Refine prompts by rephrasing or adding constraints.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Suggestions;