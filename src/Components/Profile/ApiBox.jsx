import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";

const ApiBox = () => {

    const [apiKey, setApiKey] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const savedApiKey = localStorage.getItem('gemini_api_key')
        const savedModel = localStorage.getItem('gemini_model')
        if(savedApiKey){
            setApiKey(savedApiKey)
        }
        if(savedModel){
            setSelectedModel(savedModel)
        }
    }, []);


    const handleApiKeyChange = (e) => {
        const newApiKey = e.target.value;
        setApiKey(newApiKey);

        if (newApiKey.trim()) {
            localStorage.setItem('gemini_api_key', newApiKey);
        } else {
            localStorage.removeItem('gemini_api_key');
        }
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
        localStorage.setItem('gemini_model', e.target.value);
    };
    return (
        <div
            className={`w-full sm:w-1/3 h-auto md:h-60 rounded-3xl p-4 sm:p-8 group hover:bg-lightGreen bg-zinc-200 transition ease-in-out duration-300`}>
            <h1 className={'text-2xl sm:text-3xl my-2'}>Gemini Key</h1>
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <TextField
                    value={apiKey}
                    type={'password'}
                    className={'w-full rounded-full'}
                    id="outlined-basic"
                    label="API Key"
                    variant="outlined"
                    onChange={handleApiKeyChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label="Model"
                        value={selectedModel}
                        onChange={handleModelChange}
                     variant='outlined'>
                        <MenuItem value="gemini-2.5-flash-preview">Gemini 2.5 Flash (Preview)</MenuItem>
                        <MenuItem value="gemini-2.0-flash">Gemini 2.0 Flash</MenuItem>
                        <MenuItem value="gemini-2.0-flash-lite">Gemini 2.0 Flash-Lite</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}
export default ApiBox;