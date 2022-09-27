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
const makeClientCrop = async (imageRef: HTMLImageElement | undefined, crop: Crop) => {
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
        x: crop.x,
        y: crop.y,
    };
    const croppedImageUrl: Blob = await getCroppedImg(
        imageRef,
        requiredCrop,
    );
    // downloadLocationBlob(croppedImageUrl, 'test.jpg');
    return croppedImageUrl;
};
const ImgCrop:  ForwardRefRenderFunction<{ getBlob:()=>Promise<Blob|undefined>|undefined }, { file?: File, aspect: number }> = (props,ref) => {
    const {file, aspect} = props;
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [imgSrc, setImgSrc] = useState('')
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
    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const {width, height} = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }, [aspect])
    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(file)
        }

    }, [file])
    const getBlob = useCallback(() => {
        const img = imageRef.current
        if (img) {
            return makeClientCrop(img, crop)
        }

    }, [crop])
    useImperativeHandle(ref,()=>({
        getBlob,
    }),[getBlob])
    return <>
        <ReactCrop
            crop={crop}
            ruleOfThirds={true}
            onChange={handleChange}
            aspect={aspect}
        >
            <img src={imgSrc} ref={imageRef} onLoad={onImageLoad}/>
        </ReactCrop>
    </>;
};
export default React.forwardRef(ImgCrop);
