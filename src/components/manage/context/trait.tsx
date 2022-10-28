import React, {PropsWithChildren, useCallback, useEffect} from "react";
type  IState = {
    addVisible:boolean,
    addAttribute?:string,
    addAttributeId?:number
    type?:'single'|'batch'
}
type IAction = {
    type: 'change',
    value: IState
}

export const traitReducer: (state: IState, action: IAction) => IState = (state, action) => {
    if (action.type == 'change') {
        return {
            ...state,
            ...action.value
        };
    } else{
        return  state
    }
};
export const traitDefaultValue: IState = {addVisible:false};
export const TraitContext = React.createContext<{state:IState, dispatch: React.Dispatch<IAction>}>({
    state: traitDefaultValue, dispatch: () => {
        //
    },
});
export const TraitProvider :React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    const [state, dispatch] = React.useReducer(traitReducer, traitDefaultValue);
    const value = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    return <TraitContext.Provider value={value}>
        {children}
    </TraitContext.Provider>
}
export default TraitProvider;

export const useTrait:()=>[IState,(state:IState)=>void] = ()=>{
    const {state,dispatch} =React.useContext(TraitContext);
    const toggle = useCallback((state:IState)=>{
        dispatch({
            type:'change',
            value:state
        })
    },[dispatch])
    return [state,toggle]
}
