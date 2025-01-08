import {useState} from "react";

const Template=()=>{
    const [template,setTemplate]=useState('')
    const [templateArray,setTemplateArray]=useState([])
    const [parsed,setParsed]=useState(false)
    const [data,setData]=useState({});

    const reg = /{{\s*([^}]+)\s*}}/gm;

    const handleExecute=()=>{
        parseTemplate(template)
        setParsed(true)

    }
    const handleDataChange=(key,value)=>{
        setData((prevData)=>({
            ...prevData,[key]:value
        }))
    }


    const parseTemplate=(template)=>{
        const matches=[...template.matchAll(reg)]
        const arr=[]
        let lastIndex=0;
        matches.forEach((match)=>{
            const [placeHolder,key]=match
            const firstIndex=match.index
            if(firstIndex>lastIndex){
                arr.push(template.substring(lastIndex,firstIndex))
            }
            arr.push(placeHolder)
            lastIndex=firstIndex+placeHolder.length

            setData((prevData)=>({
                ...prevData,[key.trim()]:"",
            }))
        })
        if(lastIndex<template.length){
            arr.push(template.substring(lastIndex))
        }
        setTemplateArray(arr)

    }
    const renderTemplate=()=>{
        return templateArray.map(item=>{
            if(item.startsWith('{{') && item.endsWith('}}')){
                const key=item.slice(2,-2).trim()
                return data[key] || ""
            }
            return item
        }).join("")
    }

    return(
        <div>
            <h1>Enter template</h1>
            <input type="text"
                   placeholder={'enter template...'}
                   value={template}
                   onChange={
                (e)=>setTemplate(e.target.value)}
            />
            <button onClick={handleExecute}>
                execute
            </button>
            {parsed &&
                <div>
                    {Object.keys(data).map(key=>(
                        <div>
                            <label>{key}</label>
                            <input type="text"
                                    value={data[key]}
                                   placeholder={`enter value for ${key}:`}
                                   onChange={(e)=>handleDataChange(key,e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            }
            <h2>Rendered Output</h2>
            <div>{renderTemplate()}</div>


        </div>
    )
}
export default Template