import React, {useCallback} from "react";
import {useTraits} from "@/http/trait";
import {Checkbox, FormControlLabel, FormGroup, Typography,Stack} from "@mui/material";
import {useFilterValue} from "@/components/preview/context/filter";
import {useCountValue} from "@/components/preview/context/count";
import {useWallet} from "@/context/wallet";

export const CheckboxGroup:React.FC<{attributeId: number}> = (props)=>{
    const {attributeId} = props;
    const [wallet] = useWallet()
    const {chainId} = wallet;
    const {data} = useTraits({attributeId,chainId:chainId?.toString()})
    const [filterValue,setFilterValue] = useFilterValue()
    const [countValue] = useCountValue();
    const handleChange= useCallback((id:number,checked:boolean)=>{
        if(checked){
            if (!filterValue.includes(id)){
                setFilterValue([...filterValue,id])
            }
        }else{
            const index = filterValue.indexOf(id)
            if(index>-1){
                setFilterValue([...filterValue.slice(0,index),...filterValue.slice(index+1)])
            }

        }
    },[filterValue, setFilterValue])
    return<FormGroup>
        {data?.map(item=>{
            return  <FormControlLabel
                sx={{justifyContent:'space-between'}}
                key={item.id}
                onChange={(e,checked)=>handleChange(item.id,checked)}
                control={<Checkbox checked={filterValue.includes(item.id)} />}
                label={<Stack direction={"row"} spacing={1}><Typography variant={"body1"}>{item.name}</Typography><Typography variant={"body1"} color={"#b5b5b5"}>{countValue[item.id]||'0'}</Typography></Stack>}
                labelPlacement={"start"}
            />
        })}
    </FormGroup>
}
export default CheckboxGroup;
