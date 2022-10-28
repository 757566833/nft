import {AttributesRefValue} from "@/components/manage/attributes";
import {PreviewList} from "@/context/preview";

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
    for (const sourceElement of source) {
        const traits = sourceElement.traits || []

        let currentArray: { attributeId: number, traitId: number, url: string }[] = [];
        for (const trait of traits) {
            if (trait.value) {
                currentArray = [...currentArray, ...new Array(trait.value).fill({
                    attributeId: trait.attributeId,
                    traitId: trait.traitId,
                    url: trait.url
                })]
            }

        }
        while (currentArray.length < count) {
            currentArray = [...currentArray, ...currentArray]
        }
        shuffle(currentArray)
        for (let i = 0; i < count; i++) {
            if (result[i]) {
                result[i].push({
                    ...currentArray[i],
                    zIndex: sourceElement.zIndex
                })
            } else {
                result[i] = [{
                    ...currentArray[i],
                    zIndex: sourceElement.zIndex
                }]
            }

        }

    }
    return result
}
export const intersection: <T>(array1: T[], array2: T[]) => T[] = (array1, array2) => {
    return array1.filter(value => array2.includes(value));
}

export const generateImage = (images: string[],name:string) => {

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
        // 两张图片都加载完成后绘制于Canva中
        let drawAllImg = Promise.all(loadList).then((res) => {
            for (let i = 0; i < imageList.length; i++) {
                ctx?.drawImage(imageList[i], 0, 0, 600, 600);
            }
        });
        drawAllImg.then(() => {
            let outputImg = new Image();
            outputImg.src = ctx?.canvas.toDataURL() || '';
            let link = document.createElement("a");
            link.download = name;
            link.href = outputImg.src;
            link.click();
        });
    }

}
