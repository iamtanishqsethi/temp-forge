const SideBarTemplate=({templateData})=>{
    return (
        <div className={'bg-gradient-to-tr from-zinc-700 to-zinc-800 w-56 p-4 m-2 rounded-lg'}>
            <h2>{templateData.template}</h2>
            {/*<h3 className={'text-sm text-gray-400 '}>Date created : 1-1-2025</h3>*/}
        </div>
    )
}
export default SideBarTemplate;