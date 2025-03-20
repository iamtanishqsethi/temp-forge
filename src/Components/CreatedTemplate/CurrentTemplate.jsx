import {useSelector} from "react-redux";

const CurrentTemplate=({template,title})=>{
    const isShowHistory = useSelector(store => store.config.showHistory);
    return(

        <div className={`${!isShowHistory?'h-[50vh]':'h-[48%]'} w-full rounded-3xl border-2 border-black p-6 flex flex-col`}>
            <div className={'flex space-x-4'}>
                <svg width="44" height="25" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 19.7607 5.31982)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 29.3283 5.31982)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 19.7607 14.8496)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 29.3283 14.8496)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 0.703583 5.31982)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 10.2712 5.31982)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 0.703583 14.8496)" fill="black"/>
                    <rect width="6.69708" height="6.69708" rx="2" transform="matrix(0.70848 -0.70573 0.70848 0.70573 10.2712 14.8496)" fill="black"/>
                </svg>
                <h1 className={'text-xl'}>TEMPLATE</h1>
            </div>
            <div className={'border border-zinc-200 rounded-xl h-[90%]'}>
                <input type="text"
                       readOnly={true}
                       value={title}
                       className={'w-full  mx-1 p-1  outline-none text-lg font-medium'}
                />
                <textarea className={'w-full h-[80%] m-1 p-1  outline-none '}
                          required={true}
                          value={template}
                ></textarea>
            </div>

        </div>

    )
}
export default CurrentTemplate;