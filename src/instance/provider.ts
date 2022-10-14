import {ethers} from "ethers";
import {ACCOUNTS_CHANGED, CHAIN_CHANGED, ETH_REQUEST_ACCOUNTS} from "@/constant";
import {message} from "@/lib/util";

const Homestead = "homestead"
const Rinkeby = "rinkeby"
const Ropsten = "ropsten"
const Kovan = "kovan"
const Goerli = "goerli"
const EthRpcMap = {
    Homestead: "https://mainnet.infura.io/v3/1bd4e30b2c1e480290f0220b920ae6fd",
    Rinkeby: "https://rinkeby.infura.io/v3/1bd4e30b2c1e480290f0220b920ae6fd",
    Ropsten: "https://ropsten.infura.io/v3/1bd4e30b2c1e480290f0220b920ae6fd",
    Kovan: "https://kovan.infura.io/v3/1bd4e30b2c1e480290f0220b920ae6fd",
    Goerli: "https://goerli.infura.io/v3/1bd4e30b2c1e480290f0220b920ae6fd",
}
const nameToRpc = (rpc: string) => {
    let _rpc = rpc;
    switch (rpc) {
        case Homestead:
            _rpc = EthRpcMap.Homestead
            break
        case Rinkeby:
            _rpc = EthRpcMap.Rinkeby
            break
        case Ropsten:
            _rpc = EthRpcMap.Ropsten
            break
        case Kovan:
            _rpc = EthRpcMap.Kovan
            break
        case Goerli:
            _rpc = EthRpcMap.Goerli
            break
    }
    return _rpc
}

export class Provider {
    private static provider: ethers.providers.JsonRpcProvider;
    private static event: { [key: string]: { [key: string]: (provider: ethers.providers.JsonRpcProvider) => Promise<void> } } = {
        [CHAIN_CHANGED]: {},
        [ACCOUNTS_CHANGED]: {}
    }
    private static address: string
    /**
     * 这里直接吞了error 没有返回就是错误了
     */
    public static getInstance = async () => {
        if (Provider.provider) {
            return Provider.provider
        } else {
            const ethereum = (window as any).ethereum
            if (ethereum) {
                // todo 这里加个any可以复用 provider 不加则是切换的时候也要重新new一个provider 因为锁定了network 暂时没发现坑 有坑要切换单例模式的设计
                const provider = new ethers.providers.Web3Provider(ethereum, 'any');
                try {
                    await Provider.refreshInfoFromMetamask(provider)
                } catch (e) {
                    return
                }
                Provider.addListener()
                Provider.provider = provider;
                return provider;
            }


        }
    }
    public static getInstanceSinger = async () => {
        if (Provider.provider) {
            const provider =  Provider.provider
            let singer
            try {
                singer = provider.getSigner();
            } catch (e) {
               return
            }
            return singer
        } else {
            const ethereum = (window as any).ethereum
            if (ethereum) {
                // todo 这里加个any可以复用 provider 不加则是切换的时候也要重新new一个provider 因为锁定了network 暂时没发现坑 有坑要切换单例模式的设计
                const provider = new ethers.providers.Web3Provider(ethereum, 'any');
                try {
                    await Provider.refreshInfoFromMetamask(provider)
                } catch (e) {
                    return
                }
                Provider.addListener()
                Provider.provider = provider;
                let singer
                try {
                    singer = provider.getSigner();
                } catch (e) {
                    return
                }
                return singer
            }


        }
    }
    public static setRpc = (rpc: string) => {
        message.info("注入rpc:"+rpc)
        Provider.provider = new ethers.providers.JsonRpcProvider(nameToRpc(rpc))
        Provider.handleChainChange().then()
    }
    public static setAddress = (address: string) => {
        message.info("注入address:"+address)
        Provider.address = address
        Provider.handleAccountChange().then()
    }
    /**
     * 这里直接吞了error 没有返回就是错误了
     */
    public static getAddress = async () => {
        if (Provider.provider) {
            const signer = Provider.provider.getSigner();
            try {
                const address = await signer.getAddress();
                return address
            } catch (e) {
                return Provider.address
            }

        }
    }
    public static resetInstance = async () => {
        const ethereum = (window as any).ethereum
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            try {

                await Provider.refreshInfoFromMetamask(provider)
            } catch (e) {
                throw e;
                return
            }
            Provider.addListener()
            Provider.provider = provider;
            return provider;
        }
    }
    private static refreshInfoFromMetamask = async (provider: ethers.providers.JsonRpcProvider = Provider.provider) => {
        try {
            const address = await provider.send(ETH_REQUEST_ACCOUNTS, []);
            return address
        } catch (e) {
        }
        // return new Promise((resolve,reject)=>{
        //     try {
        //         provider.send(ETH_REQUEST_ACCOUNTS, [])
        //             .then((address)=>{
        //             resolve(address)
        //         }).catch(e=> {
        //
        //         });
        //         // console.log( provider.getSigner().getChainId().then(console.log))
        //     }catch (e: any) {
        //         // { code:number,message:string,stack:string }
        //         // todo 尚不明确错误判断规则
        //         if(e.code>0){
        //             reject(e.message)
        //         }
        //     }
        // })

    };

    public static subscribers = (type: typeof CHAIN_CHANGED | typeof ACCOUNTS_CHANGED, key: string, func: (provider: ethers.providers.JsonRpcProvider) => Promise<void>) => {
        Provider.event[type][key] = func
    };
    public static unSubscribers = (type: typeof CHAIN_CHANGED | typeof ACCOUNTS_CHANGED, key: string) => {
        delete Provider.event[type][key]
    };
    private static handleChainChange = async () => {
        await Provider.refreshInfoFromMetamask()
        const map = Provider.event[CHAIN_CHANGED];
        for (const mapKey in map) {
            if (map.hasOwnProperty(mapKey)) {
                map[mapKey](Provider.provider)
            }
        }

    }
    private static handleAccountChange = async () => {
        await Provider.refreshInfoFromMetamask()
        const map = Provider.event[ACCOUNTS_CHANGED];
        for (const mapKey in map) {
            if (map.hasOwnProperty(mapKey)) {
                map[mapKey](Provider.provider)
            }
        }
    }
    public static addListener = () => {
        const ethereum = (window as any).ethereum
        if (ethereum) {
            ethereum.removeListener(CHAIN_CHANGED, Provider.handleChainChange);
            ethereum.removeListener(ACCOUNTS_CHANGED, Provider.handleAccountChange);
            ethereum.on(CHAIN_CHANGED, Provider.handleChainChange);
            ethereum.on(ACCOUNTS_CHANGED, Provider.handleAccountChange);
        }
    }

    public static isLinked = async () => {
        const ethereum = (window as any).ethereum
        if (!ethereum) {
            return false
        } else {
            const addresses = await ethereum.request({method: 'eth_accounts'})
            return addresses.length != 0
        }

    }
}
//@ts-ignore
globalThis.Provider = Provider
export default Provider;
