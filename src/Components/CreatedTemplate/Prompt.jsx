const Prompt=({prompt})=>{
    return (
        <div className={'border-2 border-black w-full p-4 mb-2 rounded-3xl'}>
            <h2>{prompt?.value}</h2>
        </div>
    )
}
export default Prompt;