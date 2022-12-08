import React, {useCallback, useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import {Modal} from "@/lib/react-component";
import {useEdit} from "@/components/preview/context/edit";
import {PreviewComponent, PreviewItem, usePreview} from "@/context/preview";
import Group from "@/components/preview/edit/group";
import {ITrait} from "@/services/trait";
import {downloadURL, generateImage} from "@/utils";

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
                        const nextImg:PreviewComponent = {
                            attributeId:img.attributeId,
                            attributeName:img.attributeName,
                            traitId:item.id,
                            traitName:item.name,
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
    const handleDownload = useCallback(()=>{
        generateImage(data.map(item=>`${process.env.NEXT_PUBLIC_FILE}${item.url}`)).then(res=>{
            if(res){
                downloadURL(res,`demo${value?.index||0}.png`)
            }
        })
    },[data, value?.index])
    return <>
        <Modal open={!!visible} onCancel={handleCancel} maxWidth={false} onOk={handleOk}>
            <Box display={"flex"} width={864} height={600}>
                <Box width={600} height={600} position={"relative"}>
                    {data.map((item, index) => {
                        return <Box key={index} width={600} height={600} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}/>
                    })}
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box width={240} marginLeft={3} height={480} flex={1} overflow={"auto"}>
                        <Group preview={data} onChange={handleChange}/>
                    </Box>
                    <Box marginTop={2}>
                        <Button variant={'contained'} onClick={handleDownload}>download</Button>
                    </Box>
                </Box>

            </Box>
        </Modal>
    </>
}
export default Edit;
