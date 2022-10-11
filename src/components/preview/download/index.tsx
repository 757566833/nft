import React, {useCallback} from "react";
import {Button} from "@mui/material";
import {generateImage} from "@/utils";
import {usePreview} from "@/context/preview";

export const Download:React.FC = ()=>{
    const [preview] = usePreview();
    const handleDownload = useCallback(()=>{
        for (let i = 0; i < preview.length; i++) {
            generateImage(preview[i].map(item=>`${process.env.NEXT_PUBLIC_FILE}${item.url}`),`demo${i}.png`)
        }

    },[preview])
    return  <Button variant={'contained'} onClick={handleDownload}>download</Button>
}
export default Download;
