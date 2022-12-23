import useSWR from "swr";
import {getCollections, ICollection} from "@/services/collection";
import {Http} from "@/services";


export const useCollections = (params?:Partial<ICollection>)=>{
  return useSWR<ICollection[]>(getCollections(params),Http.Get)
}

