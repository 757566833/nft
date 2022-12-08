import {CardProps} from "@mui/material/Card/Card";
import * as React from "react";

export interface CollapseCardProps extends CardProps{
    actions?:React.ReactNode,
    collapse?:React.ReactNode,
}
