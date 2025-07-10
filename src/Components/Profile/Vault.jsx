import Footer from "../Footer";
import {useSelector} from "react-redux";
import useFetchTemplates from "../../Hooks/useFetchTemplates";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {database} from "../../Utils/firebase-config";
import VaultItem from "./VaultItem";
import {useNavigate} from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import {useEffect, useState} from "react";

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
            <div
                className="min-h-screen flex flex-col items-center font-inter mx-4 sm:mx-10 mt-8 sm:mt-14 py-4 sm:py-6">
                <div
                    className="bg-custom-img2 bg-object-cover bg-object-center rounded-t-3xl w-full h-[20vh] sm:h-[30vh]"></div>
                <div className="rounded-b-3xl w-full min-h-[80vh] flex flex-col items-center">
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 m-3">
                        <div
                            className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 sm:space-x-4">
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" viewBox="0 0 86 86" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black"/>
                            </svg>
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" viewBox="0 0 86 86" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="#E9FA9C"/>
                            </svg>
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" viewBox="0 0 86 86" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="86" height="86" rx="7" fill="black"/>
                            </svg>
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold p-2">My Vault</h1>
                        </div>
                        <div className={'flex items-center w-full md:w-3/5 lg:w-[45%] xl:w-[40%] order-2 lg:order-2'}>
                            <button className={'pl-2 py-1.5 sm:py-2 border-black border-2 rounded-l-3xl border-r-0 flex-shrink-0'}>
                                <svg width="32" height="24"  viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.3654 18.4276L14.6625 13.0568C14.1305 13.3978 13.5187 13.6678 12.8271 13.8667C12.1355 14.0656 11.3996 14.1651 10.6194 14.1651C8.68652 14.1651 7.05067 13.6287 5.71185 12.556C4.37303 11.4832 3.70361 10.1725 3.70361 8.62379C3.70361 7.07507 4.37303 5.76435 5.71185 4.69162C7.05067 3.61889 8.68652 3.08252 10.6194 3.08252C12.5523 3.08252 14.1881 3.61889 15.5269 4.69162C16.8658 5.76435 17.5352 7.07507 17.5352 8.62379C17.5352 9.24895 17.411 9.8386 17.1628 10.3927C16.9145 10.9469 16.5776 11.437 16.152 11.8633L22.855 17.2341L21.3654 18.4276ZM10.6194 12.46C11.9493 12.46 13.0798 12.0871 14.0108 11.3411C14.9418 10.5952 15.4072 9.68941 15.4072 8.62379C15.4072 7.55816 14.9418 6.65237 14.0108 5.90643C13.0798 5.16049 11.9493 4.78752 10.6194 4.78752C9.28943 4.78752 8.15897 5.16049 7.228 5.90643C6.29703 6.65237 5.83155 7.55816 5.83155 8.62379C5.83155 9.68941 6.29703 10.5952 7.228 11.3411C8.15897 12.0871 9.28943 12.46 10.6194 12.46Z" fill="#E9FA9C"/>
                                </svg>
                            </button>
                            <input type="text"
                                   placeholder={'Search'}
                                   className="w-full bg-transparent border-2 border-black border-l-0 border-r-0 focus:outline-none py-2 px-4 text-sm sm:text-base placeholder-gray-500 focus:placeholder-opacity-50"
                                   onChange={handleSearch}
                            />
                            <button
                                className={'pr-2 py-1.5 sm:py-2 border-black border-2 rounded-r-3xl border-l-0 flex-shrink-0'}
                                onClick={() => {
                                    const searchInput = document.querySelector('input[type="text"]');
                                    if (searchInput) {
                                        searchInput.value = '';
                                        setFilteredTemplatesArr(templatesArr);
                                    }
                                }}
                            >
                                <svg width="23" height="24" viewBox="0 0 16 17" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4.05005L4 12.05M4 4.05005L12 12.05" stroke="#1E1E1E" strokeWidth="1.6"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="min-h-[75vh] w-full my-3 mx-1">
                        {filteredTemplatesArr.length > 0 ? (
                            <Masonry columns={{xs: 1, sm: 2, md: 3, lg: 4}} spacing={2}>
                                {filteredTemplatesArr.map((item, index) => (
                                    <VaultItem
                                        key={index}
                                        templateData={item}
                                        handleUse={() => handleUse(`/template/created/${item.id}/new`)}
                                        handleDelete={() => handleDelete(item.id)}
                                        handlePost={() => handleAddPublic(item.id)}
                                    />
                                ))}
                            </Masonry>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-2xl sm:text-4xl w-full">
                                No templates found
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Vault;