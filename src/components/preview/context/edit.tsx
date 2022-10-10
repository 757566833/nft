import React, {PropsWithChildren, useCallback} from "react";
import {PreviewItem} from "@/context/preview";
type IState={
    visible:boolean,
    data:PreviewItem
}
type IAction = {
    type: 'change',
    value: IState
}

export const editReducer: (state: IState, action: IAction) => IState = (state, action) => {
    if (action.type == 'change') {
        return {
            ...state,
            ...action.value
        }
    } else{
        return  state
    }
};
export const editDefaultValue: IState = {visible:false,data:[]};
export const EditContext = React.createContext<{state:IState, dispatch: React.Dispatch<IAction>}>({
    state: editDefaultValue, dispatch: () => {
        //
    },
});
export const EditProvider :React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    const [state, dispatch] = React.useReducer(editReducer, editDefaultValue);
    const edit = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    return <EditContext.Provider value={edit}>
        {children}
    </EditContext.Provider>
}
export default EditProvider;

export const useEditValue:()=>[PreviewItem,(edit:PreviewItem)=>void] = ()=>{
    const {state,dispatch} =React.useContext(EditContext);
    const set = useCallback((edit:PreviewItem)=>{
        dispatch({
            type:'change',
            value: {
                ...state,
                data:edit
            }
        })
    },[dispatch, state])
    return [state.data,set]
}
export const useEditVisible:()=>[boolean,(visible:boolean)=>void] = ()=>{
    const {state,dispatch} =React.useContext(EditContext);
    const set = useCallback((visible:boolean)=>{
        dispatch({
            type:'change',
            value: {
                ...state,
                visible
            }
        })
    },[dispatch, state])
    return [state.visible,set]
}
