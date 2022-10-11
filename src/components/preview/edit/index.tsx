import React, {useCallback, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {Modal} from "@/lib/react-component";
import {useEdit} from "@/components/preview/context/edit";
import {PreviewItem, usePreview} from "@/context/preview";
import Group from "@/components/preview/edit/group";
import {ITrait} from "@/services";

export const Edit: React.FC = () => {
    const [edit, setEdit] = useEdit()
    const {visible, value} = edit || {}
    const [preview,setPreview] = usePreview();
    const [data,setData ] = useState<PreviewItem>([])
    const handleCancel = useCallback(() => {
        setEdit({
            visible: false
        })
    }, [setEdit])
    useEffect(()=>{
        if(value?.data){
            setData(JSON.parse(JSON.stringify(value.data)))
        }else{
            setData([])
        }
    },[value?.data])
    // const handleChange = useCallback((attributeId:number,item:ITrait)=>{
    //     if(value){
    //         const current   = preview[value.index]
    //         for (let i = 0; i < current.length; i++) {
    //             const img = current[i];
    //             if(img.attributeId==attributeId){
    //                 if(img.url!=item.url){
    //                     const nextImg:{attributeId:number,traitId:number,url:string,zIndex:number} = {
    //                         attributeId:img.attributeId,
    //                         traitId:item.id,
    //                         url:item.url,
    //                         zIndex:img.zIndex
    //                     }
    //                     const nextCurrent = [...current]
    //                     nextCurrent[i] = nextImg
    //                     const nextPreview = [...preview]
    //                     nextPreview[value.index] = nextCurrent
    //                     setPreview(nextPreview)
    //                 }
    //             }
    //         }
    //     }
    //
    // },[preview, setPreview, value])
    const handleOk = useCallback(()=>{
        if(value){
            const nextPreview = [...preview]
            nextPreview[value.index] = data;
            setPreview(nextPreview)
            setEdit({
                visible:false,
                value:undefined
            })
        }

    },[data, preview, setEdit, setPreview, value])
    const handleChange = useCallback((attributeId:number,item:ITrait)=>{
        if(value){
            for (let i = 0; i < data.length; i++) {
                const img = data[i];
                if(img.attributeId==attributeId){
                    if(img.url!=item.url){
                        const nextImg:{attributeId:number,traitId:number,url:string,zIndex:number} = {
                            attributeId:img.attributeId,
                            traitId:item.id,
                            url:item.url,
                            zIndex:img.zIndex
                        }
                        const nextData = [...data]
                        nextData[i] = nextImg
                        setData(nextData)
                    }
                }
            }
        }

    },[data, value])
    return <>
        <Modal open={!!visible} onCancel={handleCancel} maxWidth={false} onOk={handleOk}>
            <Box display={"flex"} width={864}>
                <Box width={600} height={600} position={"relative"}>
                    {data.map((item, index) => {
                        return <Box key={index} width={600} height={600} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    })}
                </Box>

                <Box width={240} marginLeft={3} height={600} overflow={"auto"}>
                    <Group preview={data} onChange={handleChange}/>
                </Box>
            </Box>
        </Modal>
    </>
}
export default Edit;
