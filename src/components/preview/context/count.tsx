import React, {PropsWithChildren, useCallback, useEffect} from "react";
type IAction = {
    type: 'change',
    count: Record<number, number>
}

export const countReducer: (state: Record<number, number>, action: IAction) => Record<number, number> = (state, action) => {
    if (action.type == 'change') {
        return action.count;
    } else{
        return  state
    }
};
export const countDefaultCount: Record<number, number> =[];
export const CountContext = React.createContext<{state:Record<number, number>, dispatch: React.Dispatch<IAction>}>({
    state: countDefaultCount, dispatch: () => {
        //
    },
});
export const CountProvider :React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    const [state, dispatch] = React.useReducer(countReducer, countDefaultCount);
    const count = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    return <CountContext.Provider value={count}>
        {children}
    </CountContext.Provider>
}
export default CountProvider;

export const useCountValue:()=>[Record<number, number>,(count:Record<number, number>)=>void] = ()=>{
    const {state,dispatch} =React.useContext(CountContext);
    const set = useCallback((count:Record<number, number>)=>{
        dispatch({
            type:'change',
            count:count
        })
    },[dispatch])
    return [state,set]
}
