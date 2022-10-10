import {AttributesRefValue} from "@/components/manage/attributes";

/**
 * 引用传递，会改变传进来的数组
 * @param arr
 */
const shuffle:<T>(arr:T[])=>T[] = (array)=>{
    const length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = [...array]
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
    }
    return result
}
export const sum = (arr: (number | null)[]) => {
    let sum = 0;
    for (const num of arr) {
        sum += num || 0
    }
    return sum
}
const total = 100;

export const func:(source:AttributesRefValue)=>{url:string,zIndex:number}[][] = (source)=>{
    const result:{url:string,zIndex:number}[][] = new Array(total)
    for (const sourceElement of source) {
        const traits = sourceElement.traits||[]

        let currentArray:{attributeId: number, traitId: number, url: string}[] = [];
        for (const trait of traits) {
            if(trait.value){
                currentArray = [...currentArray,...new Array(trait.value).fill({attributeId:trait.attributeId,traitId:trait.traitId, url: trait.url})]
            }

        }
        while (currentArray.length<total){
            currentArray = [...currentArray,...currentArray]
        }
        shuffle(currentArray)
        for (let i = 0; i < 100; i++) {
            if(result[i]){
                result[i].push({
                    ...currentArray[i],
                    zIndex:sourceElement.zIndex
                })
            }else{
                result[i]=[{
                    ...currentArray[i],
                    zIndex:sourceElement.zIndex
                }]
            }

        }

    }
    return result
}

