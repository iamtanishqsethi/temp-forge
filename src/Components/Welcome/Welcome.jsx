const Welcome=()=>{
    return (
        <div className={'flex flex-col items-center justify-center h-screen bg-gray-600 text-white'}>
            <h1 className={'text-2xl font-bold'}>
                Welcome Page
            </h1>
            <button className={'bg-cyan rounded-lg font-bold text-white p-2 m-2 '}>Get started</button>
        </div>
    )
}
export default Welcome;