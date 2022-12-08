import {Box} from "@mui/material";
import React, {PropsWithChildren} from "react";
import {EllipsisProps} from "src/lib/react-component/ellipsis/interface";



export const Ellipsis: React.FC<PropsWithChildren<EllipsisProps>> = (props) => {
    const {ellipsisWidth = 100, ...others} = props
    return <Box
        style={{width: ellipsisWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} {...others}/>
}
export default Ellipsis
