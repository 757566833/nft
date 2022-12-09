import {AttributesRefValue} from "@/components/manage/attributes";
import {func} from "@/utils";

globalThis.addEventListener('message', (event: MessageEvent<string>) => {
    const json:{value:AttributesRefValue,count:number} = JSON.parse(event.data);
    const res = func(json.value,json.count)
    postMessage(JSON.stringify(res))
})
