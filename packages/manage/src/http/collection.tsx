import useSWR from "swr";
import {getCollections, ICollection} from "@/services/collection";
import {Http} from "@/services";


export const useCollections = ()=>{
  return useSWR<ICollection[]>(getCollections(),Http.Get)
}

