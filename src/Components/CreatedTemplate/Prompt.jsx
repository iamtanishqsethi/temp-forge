const Prompt=({prompt})=>{
    return (
        <div className={'bg-gradient-to-tr from-zinc-700 to-zinc-800 w-80 p-4 m-2 rounded-lg'}>
            <h2>{prompt?.value}</h2>

        </div>
    )
}
export default Prompt;