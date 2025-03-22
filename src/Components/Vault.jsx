import Footer from "./Footer";
import { useSelector } from "react-redux";
import useFetchTemplates from "../Hooks/useFetchTemplates";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import VaultItem from "./VaultItem";
import { useNavigate } from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState } from "react";

const Vault = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user?.uid);
    const displayName = useSelector((state) => state.user.displayName);
    const templatesArr = useSelector((store) => store.templates.templatesArr);
    useFetchTemplates();

    const [filteredTemplatesArr, setFilteredTemplatesArr] = useState([]);

    useEffect(() => {
        setFilteredTemplatesArr(templatesArr);
    }, [templatesArr]);

    const handleDelete = async (id) => {
        await deleteDoc(doc(database, userId, id));
    };

    const handleAddPublic = async (id) => {
        const currentTemplate = templatesArr.find((item) => item.id === id);
        const modifiedTemplate = {
            ...currentTemplate,
            displayName,
        };

        try {
            await addDoc(collection(database, "public"), modifiedTemplate);
        } catch (error) {
            console.log("error adding to public database");
        }
    };

    const handleUse = (route) => {
        navigate(route);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = templatesArr.filter((item) =>
            item.templateStr.toLowerCase().includes(searchTerm) ||
            item.templateTitle.toLowerCase().includes(searchTerm)
        );
        setFilteredTemplatesArr(filtered);
    };

    return (
        <div className="">
            <div className="min-h-screen flex flex-col items-center font-inter mx-10 mt-14 py-6">
                <div className="bg-custom-img2 bg-object-cover bg-object-center rounded-t-3xl w-full h-[30vh]"></div>
                <div className="rounded-b-3xl w-full min-h-[80vh] flex flex-col items-center">
                    <div className="flex items-center justify-between w-full space-x-4 m-3">
                        <div className="flex items-center space-x-4">
                            <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black" />
                            </svg>
                            <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="#E9FA9C" />
                            </svg>
                            <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black" />
                            </svg>
                            <h1 className="text-6xl font-bold p-2">My Vault</h1>
                        </div>
                        <div className="w-[40%]">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full rounded-full bg-gray-200 border border-black focus:outline-none py-1.5 px-4 transition-all duration-300 ease-in-out
               focus:scale-105  focus:shadow-lg placeholder-gray-500 focus:placeholder-opacity-50"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="min-h-[75vh] w-full my-3 mx-1">
                        <Masonry columns={4} spacing={2}>
                            {filteredTemplatesArr.length > 0 ? (
                                filteredTemplatesArr.map((item, index) => (
                                    <VaultItem
                                        key={index}
                                        templateData={item}
                                        handleUse={() => handleUse(`/template/created/${item.id}/new`)}
                                        handleDelete={() => handleDelete(item.id)}
                                        handlePost={() => handleAddPublic(item.id)}
                                    />
                                ))
                            ) : (
                                <div>No templates found</div>
                            )}
                        </Masonry>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Vault;
