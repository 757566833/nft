import React, {PropsWithChildren, useCallback} from "react";
import {PreviewItem} from "@/context/preview";
type IState={
    visible:boolean,
    value?:{
        data:PreviewItem,
        index:number
    }
}
type IAction = {
    type: 'change',
    value: IState
}

export const editReducer: (state: IState, action: IAction) => IState = (state, action) => {
    console.log(action)
    if (action.type == 'change') {
        return {
            ...state,
            ...action.value
        }
    } else{
        return  state
    }
};
export const editDefaultValue: IState = {visible:false};
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

export const useEdit:()=>[IState|undefined,(value:IState)=>void] = ()=>{
    const {state,dispatch} =React.useContext(EditContext);
    const set = useCallback((value:IState)=>{
        dispatch({
            type:'change',
            value: value
        })
    },[dispatch])
    return [state,set]
}
