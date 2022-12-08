import {DialogProps} from '@mui/material/Dialog/Dialog';
import React from "react";

export interface ModalProps extends Omit<DialogProps, 'title'>{
    onOk?:()=>void
    onCancel?:()=>void
    okText?:string
    cancelText?:string
    title?:React.ReactNode,
    childrenType?:'string'|'node'
    loading?:boolean
}
