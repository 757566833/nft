import useSWR from "swr";
import {getCollections, ICollection} from "@/services/collection";
import {Http} from "@/services";
import {createChain, getChainList, IChain} from "@/services/chain";
import {useLoading} from "@/lib/react-hook";
import {createContract} from "@/services/contract";


export const useChainList = ()=>{
  return useSWR<IChain[]>(getChainList(),Http.Get)
}

export  const useCreateChain = ()=>{
  return useLoading(createChain);
}
