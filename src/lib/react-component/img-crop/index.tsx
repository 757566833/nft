import React, {
    ForwardRefRenderFunction,
    PropsWithChildren,
    ReactElement,
    useCallback,
    useEffect, useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';
import ReactCrop, {Crop, centerCrop, makeAspectCrop} from 'react-image-crop';
import {PixelCrop} from "react-image-crop/src/types";
import 'react-image-crop/dist/ReactCrop.css'
import {asyncCanvas2Blob} from "@/lib/util";
import {Box} from "@mui/material";

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: 600,
                height: 600,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}
const getCroppedImg: (image: HTMLImageElement, crop: Required<Pick<Crop, 'width' | 'height' | 'x' | 'y'>>) => Promise<Blob> = (image, crop) => {
        if (!crop.width || !crop.height) {
            throw Error('宽或高不存在');
        }
        if (crop.x == undefined || crop.y == undefined) {
            throw Error('位置不存在');
        }
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        return asyncCanvas2Blob(canvas);
    }
;
const makeClientCrop = async (imageRef: HTMLImageElement | undefined, crop: Crop,scroll:{scrollTop:number,scrollLeft:number}) => {
    console.log(crop)
    if (!crop.width || !crop.height) {

        throw Error('宽或高不存在');
    }
    if (crop.x == undefined || crop.y == undefined) {
        throw Error('位置不存在');
    }
    if (!imageRef) {
        throw Error('图片加载失败');
    }
    const requiredCrop: Required<Pick<Crop, 'width' | 'height' | 'x' | 'y'>> = {
        width: crop.width,
        height: crop.height,
        x: crop.x+scroll.scrollLeft,
        y: crop.y+scroll.scrollTop,
    };
    const croppedImageUrl: Blob = await getCroppedImg(
        imageRef,
        requiredCrop,
    );
    // downloadLocationBlob(croppedImageUrl, 'test.jpg');
    return croppedImageUrl;
};
const ImgCrop: ForwardRefRenderFunction<{ getBlob: () => Promise<Blob | undefined> | undefined }, { file?: File, aspect: number }> = (props, ref) => {
    const {file, aspect} = props;
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
    const [width,setWidth] = useState(600)
    const [height,setHeight] = useState(600)
    const [crop, setCrop] = useState<PixelCrop>({
        unit: 'px', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 600,
        height: 600
    })
    const handleChange = useCallback((_crop: PixelCrop) => {
        setCrop(_crop)
    }, [])
    // const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    //     if (aspect) {
    //         setCrop(centerAspectCrop(700, 700, aspect))
    //     }
    // }, [aspect])
    useEffect(() => {
        if (file) {

            const reader = new FileReader()
            reader.addEventListener('load', (e) => {
                    setImgSrc(reader.result?.toString() || '')
                    const image = new Image();
                    image.src = e.target?.result?.toString()||'';
                    image.onload = ()=>{
                        console.log(image.height,image.width)
                        setWidth(image.width)
                        setHeight(image.height)
                    }
                }
            )
            reader.readAsDataURL(file)
        }

    }, [file])
    const boxRef = useRef<HTMLDivElement>()
    const getBlob = useCallback(async () => {
        const img = imageRef.current
        const {scrollLeft,scrollTop} = boxRef.current||{}
        if (img) {
            return await makeClientCrop(img, crop,{scrollTop:scrollTop||0,scrollLeft:scrollLeft||0})
        }

    }, [crop])
    useImperativeHandle(ref, () => ({
        getBlob,
    }), [getBlob])
    console.log(width)
    return <>
        <ReactCrop
            crop={crop}
            ruleOfThirds={true}
            onChange={handleChange}
            aspect={aspect}
            locked={true}
        >
            <Box width={width>700?700:width} height={height>700?700:height} ref={boxRef} overflow={"auto"}>
                <Box width={width} height={height}>
                    <img src={imgSrc} ref={imageRef}  />
                </Box>

            </Box>

        </ReactCrop>
    </>;
};
export default React.forwardRef(ImgCrop);
