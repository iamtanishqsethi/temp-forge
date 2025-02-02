const PublicTemplateBox=({templateData})=>{
    return (
        <div>
            <div className={'bg-gradient-to-tr from-zinc-300 to-zinc-400 w-56 h-60 p-4 m-2 rounded '}>
                <h2>{templateData.templateStr}</h2>
            </div>
        </div>
    )
}
export default PublicTemplateBox