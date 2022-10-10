import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import {useAttributes} from "@/http/attribute";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckboxGroup from "@/components/preview/filter/checkboxGroup";


export const Filter:React.FC = ()=>{
    const {data, error, isValidating, mutate} = useAttributes()
    return <Box border={"1px solid #dde3e7"}>

        {data?.filter((item)=>item.id).map((item)=>{
            return <Accordion key={item.id} elevation={0} disableGutters={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CheckboxGroup attributeId={item.id}/>
                </AccordionDetails>
            </Accordion>
        })}
    </Box>
}
export default Filter
