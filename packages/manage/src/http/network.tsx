import useSWR from "swr";
import {getCollections, ICollection} from "@/services/collection";
import {Http} from "@/services";
import {createNetwork, getNetworkList, INetwork} from "@/services/network";
import {useLoading} from "@/lib/react-hook";
import {createContract} from "@/services/contract";


export const useNetworkList = ()=>{
  return useSWR<INetwork[]>(getNetworkList(),Http.Get)
}

export  const useCreateNetwork = ()=>{
  return useLoading(createNetwork);
}
