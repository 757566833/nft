import React, {PropsWithChildren, useCallback} from "react";
export type PreviewComponent = {
    attributeId:number,
    attributeName:string
    traitId:number,
    traitName:string,
    url:string,
    zIndex:number
}
export type  PreviewItem =PreviewComponent[]
export type  PreviewList =PreviewItem[]
type IAction = {
    type: 'change',
    value: PreviewList
}

export const previewReducer: (state: PreviewList, action: IAction) => PreviewList = (state, action) => {
    if (action.type == 'change') {
        return action.value;
    } else{
        return  state
    }
};
export const previewDefaultValue: PreviewList =[];
export const PreviewContext = React.createContext<{state:PreviewList, dispatch: React.Dispatch<IAction>}>({
    state: previewDefaultValue, dispatch: () => {
        //
    },
});
export const PreviewProvider :React.FC<PropsWithChildren> = (props) => {
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

export const usePreview:()=>[PreviewList,(value:PreviewList)=>void] = ()=>{
    const {state,dispatch} =React.useContext(PreviewContext);
    const set = useCallback((value:PreviewList)=>{
        dispatch({
            type:'change',
            value:value
        })

    },[dispatch])
    return [state,set]
}
