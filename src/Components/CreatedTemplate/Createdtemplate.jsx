import PreviousPrompts from "./PreviousPrompts";
import {Outlet} from "react-router-dom";
import React from "react";

const Createdtemplate=()=>{

    return (
        <div className={'flex  items-center justify-between w-full h-screen bg-white text-black font-inter '}>
            <div className={'w-[35%] h-full  flex flex-col items-center justify-center p-4 '}>
                <div className={'mb-3 mt-12 bg-custom-img bg-object-cover bg-object-center rounded-3xl w-full h-[30%] flex items-center justify-center'}>
                    <h1 className={'text-7xl text-white '}>step 02</h1>
                </div>
                <div className={'bg-lightGreen rounded-3xl w-full h-[13%] mb-3 flex items-center justify-between p-4'}>
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12V24L32 28M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1 className={'text-3xl'}>Prompt History</h1>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 20.9998L39.6667 32.6665L16.3333 32.6665L28 20.9998Z" fill="#1D1B20"/>
                    </svg>

                </div>
                <PreviousPrompts/>
            </div>
            <Outlet/>

            {/*<PreviousPrompts/>*/}
            {/*<Outlet/>*/}
        </div>
    )
}
export default Createdtemplate;