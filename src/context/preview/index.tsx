import React, {PropsWithChildren, useCallback, useEffect} from "react";
type  IState ={zIndex:number,url:string}[]
type IAction = {
    type: 'change',
    value: IState
}
const  MODE_KEY='preview'

export const previewReducer: (state: IState, action: IAction) => IState = (state, action) => {
    if (action.type == 'change') {
        return action.value;
    } else{
        return  state
    }
};
export const previewDefaultValue: IState =[];
export const PreviewContext = React.createContext<{state:IState, dispatch: React.Dispatch<IAction>}>({
    state: previewDefaultValue, dispatch: () => {
        //
    },
});
export const PreviewProvider :React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    const [state, dispatch] = React.useReducer(previewReducer, previewDefaultValue);
    const value = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    return <PreviewContext.Provider value={value}>
        {children}
    </PreviewContext.Provider>
}
export default PreviewProvider;

export const usePreview:()=>[IState,(value:IState)=>void] = ()=>{
    const {state,dispatch} =React.useContext(PreviewContext);
    const set = useCallback((value:IState)=>{
        dispatch({
            type:'change',
            value:value
        })

    },[dispatch])
    return [state,set]
}
