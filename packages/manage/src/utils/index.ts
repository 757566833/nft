import {AttributesRefValue} from "@/components/manage/attributes";
import {PreviewItem, PreviewList} from "@/context/preview";
import {batch_shuffle} from 'wasm'

/**
 * 引用传递，会改变传进来的数组
 * @param arr
 */
const shuffle: <T>(arr: T[]) => void = (array) => {
    const length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    let index = -1
    const lastIndex = length - 1
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = array[rand]
        array[rand] = array[index]
        array[index] = value
    }
}
export const sum = (arr: (number | null)[]) => {
    let sum = 0;
    for (const num of arr) {
        sum += num || 0
    }
    return sum
}

export const func: (source: AttributesRefValue,count:number) => PreviewList = (source,count) => {
    const result: PreviewList = []
    const indexList :number[][] = []
    for (let i1 = 0; i1 < source.length; i1++) {
        const traits = source[i1].traits || []
        let currentArray:number[] = [];
        for (let i2 = 0; i2 < traits.length; i2++) {
            const value = traits[i2].value
            if(value){
                currentArray = [...currentArray,...new Array(value).fill(i2)]
            }
        }
        while (currentArray.length < count) {
            currentArray = [...currentArray, ...currentArray]
        }
        indexList[i1] = currentArray
    }
    const params = JSON.stringify(indexList)
    const res = batch_shuffle(params)
    const s:number[][] = JSON.parse(res)

    for (let i1 = 0; i1 < source.length; i1++) {
        const element = source[i1];

        for (let i2 = 0; i2 < count; i2++) {
            const trait = element.traits?.[s[i1][i2]]
            if(trait){
                if (result[i2]) {
                    result[i2].push({
                        attributeId: trait.attributeId,
                        attributeName:trait.attributeName,
                        traitId: trait.traitId,
                        traitName: trait.name,
                        url: trait.url,
                        zIndex: element.zIndex
                    })
                } else {
                    result[i2] = [{
                        attributeId: trait.attributeId,
                        attributeName:trait.attributeName,
                        traitId: trait.traitId,
                        traitName: trait.name,
                        url: trait.url,
                        zIndex: element.zIndex
                    }]
                }
            }


        }
    }
    //
    // for (const sourceElement of source) {
    //     const traits = sourceElement.traits || []
    //
    //     let currentArray:PreviewItem = [];
    //     for (const trait of traits) {
    //         if (trait.value) {
    //             currentArray = [...currentArray, ...new Array(trait.value).fill({
    //                 attributeId: trait.attributeId,
    //                 attributeName:trait.attributeName,
    //                 traitId: trait.traitId,
    //                 traitName: trait.name,
    //                 url: trait.url
    //             })]
    //         }
    //
    //     }
    //     while (currentArray.length < count) {
    //         currentArray = [...currentArray, ...currentArray]
    //     }
    //     shuffle(currentArray)
    //     for (let i = 0; i < count; i++) {
    //         if (result[i]) {
    //             result[i].push({
    //                 ...currentArray[i],
    //                 zIndex: sourceElement.zIndex
    //             })
    //         } else {
    //             result[i] = [{
    //                 ...currentArray[i],
    //                 zIndex: sourceElement.zIndex
    //             }]
    //         }
    //
    //     }
    //
    // }
    return result
}
export const intersection: <T>(array1: T[], array2: T[]) => T[] = (array1, array2) => {
    return array1.filter(value => array2.includes(value));
}

export const generateImage = async (images: string[])=> {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    const imageList: HTMLImageElement[] = []
    for (let i = 0; i < images.length; i++) {
        const img = new Image()
        img.src = images[i]
        img.setAttribute("crossOrigin", 'Anonymous')
        imageList.push(img)
    }
    const loadList = []
    for (let i = 0; i < imageList.length; i++) {
        loadList.push(new Promise<void>((res, rej) => {
            imageList[i].onload = () => {
                res();
            }
        }))
    }
    if (ctx) {
        await  Promise.all(loadList)
        for (let i = 0; i < imageList.length; i++) {
            ctx?.drawImage(imageList[i], 0, 0, 600, 600);
        }
        return ctx?.canvas.toDataURL()
    }

}

export const downloadURL = (dataURL :string , name:string)=>{
    let outputImg = new Image();
    outputImg.src = dataURL || '';
    let link = document.createElement("a");
    link.download = name;
    link.href = outputImg.src;
    link.click();
}

export const omitEmpty = (params?:Record<string, any>)=>{
    if(!params){
        return {}
    }
    const _map:Record<string, any> = {}
    for (const mapKey in params) {
        if(params.hasOwnProperty(mapKey)&&params[mapKey]){
            _map[mapKey] = params[mapKey]
        }
    }
    return  _map
}

export const strToFloat = (s:string)=>Number.parseFloat(s)
export const strToInt = (s:string)=>Number.parseInt(s)
