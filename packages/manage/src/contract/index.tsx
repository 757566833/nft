import {ethers} from "ethers";
import Provider from "@/instance/provider";
import Erc721FactoryJson  from '@/artifacts/contracts/Erc721Factory.sol/Erc721Factory.json'
import Erc721Json  from '@/artifacts/contracts/Erc721.sol/Erc721.json'
import {Erc721, Erc721Factory, Robot} from "@/typechain-types";
import RobotJson  from '@/artifacts/contracts/Robot.sol/Robot.json'
import {message} from "@/lib/util";
import {IContract} from "@/context/contract";
// const ERC721FACTORY_TEMPLATE =
export const GetErc721Factory = async (contract:IContract)=>{
    const address = contract?.erc721Factory
    const signer = await Provider.getInstanceSinger();
    if(!address){
        message.error("not support current chain")
        return ;
    }
    if(signer&&address){
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
export const GetRobot = async (contract:IContract)=>{
    const signer = await Provider.getInstanceSinger();
    // const NEXT_PUBLIC_ROBOT = process.env.NEXT_PUBLIC_ROBOT;
    const NEXT_PUBLIC_ROBOT = contract?.robot
    if(signer&&NEXT_PUBLIC_ROBOT){
        return  new ethers.Contract(NEXT_PUBLIC_ROBOT,RobotJson.abi,signer) as Robot
    }
}
