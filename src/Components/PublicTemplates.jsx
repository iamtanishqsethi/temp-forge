import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import Footer from "./Footer";
import Masonry from '@mui/lab/Masonry';
import CallMadeIcon from "@mui/icons-material/CallMade";

const PublicTemplates = () => {
    const [publicTemplates, setPublicTemplates] = useState([]);

    const getPublicTemplates = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "public"));
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPublicTemplates(newData);
            console.log(newData);
        } catch (error) {
            console.log("error fetching public templates", error);
        }
    };

    useEffect(() => {
        getPublicTemplates();
    }, []);

    return (
        <div>
            <div className="min-h-screen p-8 px-12 mt-14">
                <Masonry columns={4} spacing={2}>
                    {publicTemplates.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-100 group hover:bg-lightGreen rounded-xl p-6  shadow hover:shadow-lg transition-all flex flex-col  items-center justify-center relative"
                        >
                            <div className={'mb-7'}>
                                <h1 className="text-2xl font-medium mb-2 text-left">{item.templateTitle}</h1>
                                <p className="text-base">{item.templateStr}</p>
                            </div>


                            <div className="h-1/3 p-2 m-1 w-full relative flex items-center justify-center">
                                <h2
                                    className=" font-medium  absolute bottom-2 left-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                                >
                                    @{item.displayName}
                                </h2>
                                <button
                                    className="bg-custom-img bg-object-cover  text-white px-3 py-1.5  rounded-full text-sm absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"

                                >
                                    Edit Template <CallMadeIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </Masonry>

            </div>
            <Footer />
        </div>


    );
};

export default PublicTemplates;
