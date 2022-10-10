import React, {PropsWithChildren, useCallback, useEffect} from "react";
type IAction = {
    type: 'change',
    value: number[]
}

export const filterReducer: (state: number[], action: IAction) => number[] = (state, action) => {
    if (action.type == 'change') {
        return action.value;
    } else{
        return  state
    }
};
export const filterDefaultFilter: number[] =[];
export const FilterContext = React.createContext<{state:number[], dispatch: React.Dispatch<IAction>}>({
    state: filterDefaultFilter, dispatch: () => {
        //
    },
});
export const FilterProvider :React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    const [state, dispatch] = React.useReducer(filterReducer, filterDefaultFilter);
    const filter = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    return <FilterContext.Provider value={filter}>
        {children}
    </FilterContext.Provider>
}
export default FilterProvider;

export const useFilterValue:()=>[number[],(filter:number[])=>void] = ()=>{
    const {state,dispatch} =React.useContext(FilterContext);
    const set = useCallback((value:number[])=>{
        dispatch({
            type:'change',
            value:value
        })
    },[dispatch])
    return [state,set]
}
