import React, {useCallback, useRef, useState} from "react";
import {Box, Button, Stack, Typography,CircularProgress} from "@mui/material";
import {generateImage} from "@/utils";
import {usePreview} from "@/context/preview";
import {Modal} from "@/lib/react-component";

export const Download: React.FC = () => {
    const [preview] = usePreview();
    const [visible, setVisible] = useState(false);
    const [timer,setTimer] = useState< NodeJS.Timer|undefined>(undefined)
    const handleStart = useCallback(()=>{
        let index=0;
        const _timer = setInterval(()=>{
            if(preview[index]){
                generateImage(preview[index].map(item=>`${process.env.NEXT_PUBLIC_FILE}${item.url}`),`demo${index}.png`)
                index++
            }else {
                clearInterval(timer)
                setTimer(undefined)
            }

        },500)
        setTimer(_timer)
    },[preview, timer])
    const handleCancel = useCallback(()=>{
       setVisible(false)
    },[])
    const handleStop = useCallback(()=>{
        clearInterval(timer)
        setTimer(undefined)
    },[timer])
    const handleDownload = useCallback(() => {
        setVisible(true)

    }, [])
    return <>
        <Modal open={visible} title={"Important reminder"} maxWidth={false} noFooter={true}>
            <Box width={600} height={440}>
                <Stack spacing={2}>

                    <Box>
                        <Typography variant={'h4'}>
                            1. Do nothing while downloading
                        </Typography>
                        <Typography variant={'body1'}>
                            File generation relies on web page cache data, any operation will cause incalculable errors
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={'h4'}>
                            {`2. Don't close the page`}
                        </Typography>
                        <Typography variant={'body1'}>
                            The data is randomly generated. download will interrupted after closing. the last operation
                            cannot be continued the next time you enter the webpage
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={'h4'}>
                            3. Download path
                        </Typography>
                        <Typography variant={'body1'}>
                            default download path is system setting
                        </Typography>
                        <Typography variant={'body1'}>
                            chrome in windows :C:\Users\{`<user>`}\Downloads
                        </Typography>
                        <Typography variant={'body1'}>
                            chrome in Mac : /Users/{`<user>`}/Downloads/
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        {!timer&& <Button variant={"contained"} onClick={handleStart}>start</Button>}
                        {!timer&&<Button variant={"outlined"} onClick={handleCancel}>cancel</Button>}
                        {timer&&<Button variant={'outlined'} startIcon={<CircularProgress size={12} />} onClick={handleStop}>cancel</Button>}
                    </Stack>
                </Stack>
            </Box>
        </Modal>
        <Box hidden={preview.length==0}>
            <Button variant={'contained'} onClick={handleDownload}>download</Button>
        </Box>

    </>
}
export default Download;
