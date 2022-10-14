import {ethers} from "ethers";
import Provider from "@/instance/provider";
import Erc721FactoryJson  from '@/artifacts/contracts/Erc721Factory.sol/Erc721Factory.json'
import Erc721Json  from '@/artifacts/contracts/Erc721.sol/Erc721.json'
import {Erc721, Erc721Factory} from "@/typechain-types";
// const ERC721FACTORY_TEMPLATE =
export const GetErc721Factory = async (address:string)=>{
    const signer = await Provider.getInstanceSinger();
    if(signer){
        const contract = new ethers.Contract(address,Erc721FactoryJson.abi,signer) as Erc721Factory
        return contract
    }
}
export const GetErc721 = async (address:string)=>{
    const signer = await Provider.getInstanceSinger();
    if(signer){
        const contract = new ethers.Contract(address,Erc721Json.abi,signer) as Erc721
        return contract
    }
}
