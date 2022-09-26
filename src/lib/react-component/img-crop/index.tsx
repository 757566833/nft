import React, {PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ReactCrop,{Crop,centerCrop,makeAspectCrop} from 'react-image-crop';
import {PercentCrop, PixelCrop} from "react-image-crop/src/types";
import 'react-image-crop/dist/ReactCrop.css'

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
)  =>{
  return centerCrop(
      makeAspectCrop(
          {
            unit: '%',
            width: 600,
          },
          aspect,
          mediaWidth,
          mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
  )
}
const ImgCrop:React.FC<{file?:File,aspect:number}> = (props) => {
  const {file,aspect} = props;
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<Crop>()
  const handleChange = useCallback((_crop: PixelCrop, percentageCrop: PercentCrop)=>{
    setCrop(percentageCrop)
  },[])
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>)=>{
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  },[aspect])
  useEffect(()=>{
    if(file){
      const reader = new FileReader()
      reader.addEventListener('load', () =>
          setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(file)
    }

  },[file])
  return <>
    <ReactCrop
        crop={crop}
        ruleOfThirds={true}
        onChange={handleChange}
    >
      <img src={imgSrc}  onLoad={onImageLoad}/>
    </ReactCrop>
  </>;
};
export default ImgCrop;
