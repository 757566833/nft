import React, {PropsWithChildren, useCallback, useMemo} from "react";
import {useWallet} from "@/context/wallet";
import { useNetworkList} from "@/http/network";
export interface  IContract {
    erc721Factory: string
    robot: string
    erc1155: string
}

export const contractDefaultValue: IContract = {
    erc721Factory: '',
    robot: '',
    erc1155: '',
};
export const ContractContext = React.createContext<IContract>(contractDefaultValue);
export const ContractProvider :React.FC<PropsWithChildren> = (props) => {
    const {children} = props;
    const {data:network}= useNetworkList()
    const networkMap:Record<string, IContract> = useMemo(()=>{
        const map:Record<string, IContract> = {}
        if(network){
            for (let i = 0; i < network.length; i++) {
                map[network[i].chainId] = {
                    robot:network[i].robot,
                    erc721Factory:network[i].erc721Factory,
                    erc1155:network[i].erc1155
                }
            }
        }
        return map
    },[network])
    const [wallet] = useWallet()
    const {chainId} = wallet;
    const value = useMemo(()=>{
        return networkMap[chainId||'']
    },[chainId, networkMap])
    console.log(value)
    return <ContractContext.Provider value={value}>
        {children}
    </ContractContext.Provider>
}
export default ContractProvider;

export const useContract:()=>[IContract] = ()=>{
    return [React.useContext(ContractContext)];

}
