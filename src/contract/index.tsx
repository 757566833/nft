import {ethers} from "ethers";
import Provider from "@/instance/provider";
import Erc721FactoryJson  from '@/artifacts/contracts/Erc721Factory.sol/Erc721Factory.json'
import Erc721Json  from '@/artifacts/contracts/Erc721.sol/Erc721.json'
import {Erc721, Erc721Factory, Robot} from "@/typechain-types";
import RobotJson  from '@/artifacts/contracts/Robot.sol/Robot.json'
import {ERC721_FACTORY_CONTRACT_ADDRESS, ROBOT_CONTRACT_ADDRESS} from "@/constant/contract";
import {message} from "@/lib/util";
// const ERC721FACTORY_TEMPLATE =
export const GetErc721Factory = async (chainId:number)=>{
    const address = ERC721_FACTORY_CONTRACT_ADDRESS[chainId]
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
export const GetRobot = async (chainId:number)=>{
    const signer = await Provider.getInstanceSinger();
    // const NEXT_PUBLIC_ROBOT = process.env.NEXT_PUBLIC_ROBOT;
    const NEXT_PUBLIC_ROBOT = ROBOT_CONTRACT_ADDRESS[chainId]
    console.log(NEXT_PUBLIC_ROBOT,signer)
    if(signer&&NEXT_PUBLIC_ROBOT){
        return  new ethers.Contract(NEXT_PUBLIC_ROBOT,RobotJson.abi,signer) as Robot
    }
}
