import * as React from 'react';
import {PropsWithChildren, useCallback, useEffect} from 'react';
import Provider from "@/instance/provider";
import {ACCOUNTS_CHANGED, CHAIN_CHANGED} from "@/constant";
import {ethers} from "ethers";
import {useMount} from "@/lib/react-hook";

type  IState ={
    address?:string,
    chainId?:number,
    isConnected?:boolean
    url?:string
    isEIP1559?:boolean
}
type IAction = {
    type: 'change',
    value: IState
}
export const walletReducer: (state: IState, action: IAction) => IState = (state, action) => {
    if (action.type == 'change') {
        return {...state, ...action.value};
    } else{
        return  state
    }
};
export const walletDefaultValue: IState = ({isConnected:false});
export const WalletContext = React.createContext<{state:IState, dispatch: React.Dispatch<IAction>}>({
    state: walletDefaultValue, dispatch: () => {
        //
    },
});

export const WalletProvider: React.FC<PropsWithChildren<unknown>> = (props) => {
    const [state, dispatch] = React.useReducer(walletReducer, walletDefaultValue);
    const handleChange = useCallback(async (provider:ethers.providers.JsonRpcProvider)=>{
        const signer = provider.getSigner();
        let address
        try {
             address = await signer.getAddress();
        }catch (e) {
            address =  await Provider.getAddress()
        }
        const [chainId,latest] =  await Promise.all([signer.getChainId(),provider.getBlock("latest")])
        const {baseFeePerGas} = latest
        dispatch({
            type:'change',
            value:{address,chainId:chainId,url:provider.network?.name,isEIP1559:baseFeePerGas?true:false}
        })
    },[])
    const initData = useCallback(async ()=>{

        const isLink = await Provider.isLinked();

        if(isLink){
            const provider = await Provider.getInstance() as ethers.providers.Web3Provider;
            if(provider){
                const signer = provider.getSigner();
                let address
                try {
                    address = await signer.getAddress();
                }catch (e) {
                    address =  await Provider.getAddress()
                }
                const [chainId,latest] =  await Promise.all([signer.getChainId(),provider.getBlock("latest")])
                const {baseFeePerGas} = latest
                dispatch({
                    type:'change',
                    value:{address,chainId:chainId,url:provider.network?.name,isEIP1559:baseFeePerGas?true:false}
                })
            }

        }

    },[])
    useEffect(()=>{
        /**
         * 同key 替换，所以不需要清除
         */

        Provider.subscribers(CHAIN_CHANGED,"context",handleChange)
        Provider.subscribers(ACCOUNTS_CHANGED,"context",handleChange);
        initData().then()
    },[handleChange, initData])
    const value = React.useMemo(()=>({
        state,
        dispatch,
    }), [state]);
    const init = useCallback(async ()=>{
        const bool = await Provider.isLinked();
        dispatch({
            type:'change',
            value:{isConnected: bool}
        })
    },[])
    useMount(()=>{

     init().then();
    })
    return <WalletContext.Provider value={value}>{props.children}</WalletContext.Provider>;
};
export default WalletProvider;

export const useWallet:()=>[IState,(value:IState)=>void]= () => {
    const {state,dispatch} =   React.useContext(WalletContext);
    const set = useCallback((value:IState)=>{
        dispatch({
            type:'change',
            value
        })
    },[dispatch])
    return [state,set]
};

