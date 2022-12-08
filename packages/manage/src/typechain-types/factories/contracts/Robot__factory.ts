/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "src/typechain-types/common";
import type { Robot, RobotInterface } from "src/typechain-types/contracts/Robot";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_versoion",
        type: "string",
      },
      {
        internalType: "string",
        name: "_salt",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "cType",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "Buy",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "c",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CancelSell721",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Lock1155",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "c",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "collectionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "createBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Mint721",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "c",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "Sell721",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "types",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "orderIds",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "orderHashs",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "froms",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "tos",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "tokenURIs",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "batchAll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc1155",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "tos",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "tokenURIs",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "batchLockt1155",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc721",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "tokenURIs",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "collectionIds",
        type: "uint256[]",
      },
    ],
    name: "batchMint721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "buffer",
        type: "bytes",
      },
    ],
    name: "bytesToHex",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "c",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelSell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "c",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162003873380380620038738339818101604052810190620000379190620001f6565b8160009081620000489190620004c6565b5080600190816200005a9190620004c6565b505050620005ad565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000cc8262000081565b810181811067ffffffffffffffff82111715620000ee57620000ed62000092565b5b80604052505050565b60006200010362000063565b9050620001118282620000c1565b919050565b600067ffffffffffffffff82111562000134576200013362000092565b5b6200013f8262000081565b9050602081019050919050565b60005b838110156200016c5780820151818401526020810190506200014f565b60008484015250505050565b60006200018f620001898462000116565b620000f7565b905082815260208101848484011115620001ae57620001ad6200007c565b5b620001bb8482856200014c565b509392505050565b600082601f830112620001db57620001da62000077565b5b8151620001ed84826020860162000178565b91505092915050565b6000806040838503121562000210576200020f6200006d565b5b600083015167ffffffffffffffff81111562000231576200023062000072565b5b6200023f85828601620001c3565b925050602083015167ffffffffffffffff81111562000263576200026262000072565b5b6200027185828601620001c3565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002ce57607f821691505b602082108103620002e457620002e362000286565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200034e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200030f565b6200035a86836200030f565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003a7620003a16200039b8462000372565b6200037c565b62000372565b9050919050565b6000819050919050565b620003c38362000386565b620003db620003d282620003ae565b8484546200031c565b825550505050565b600090565b620003f2620003e3565b620003ff818484620003b8565b505050565b5b8181101562000427576200041b600082620003e8565b60018101905062000405565b5050565b601f82111562000476576200044081620002ea565b6200044b84620002ff565b810160208510156200045b578190505b620004736200046a85620002ff565b83018262000404565b50505b505050565b600082821c905092915050565b60006200049b600019846008026200047b565b1980831691505092915050565b6000620004b6838362000488565b9150826002028217905092915050565b620004d1826200027b565b67ffffffffffffffff811115620004ed57620004ec62000092565b5b620004f98254620002b5565b620005068282856200042b565b600060209050601f8311600181146200053e576000841562000529578287015190505b620005358582620004a8565b865550620005a5565b601f1984166200054e86620002ea565b60005b82811015620005785784890151825560018201915060208501945060208101905062000551565b8683101562000598578489015162000594601f89168262000488565b8355505b6001600288020188555050505b505050505050565b6132b680620005bd6000396000f3fe6080604052600436106100705760003560e01c806354fd4d501161004e57806354fd4d50146100f75780636a27246214610122578063aa6ecb551461014b578063abc04d8a1461017457610070565b80631546f67f14610075578063451d89fa1461009e578063486115c1146100db575b600080fd5b34801561008157600080fd5b5061009c60048036038101906100979190611fe8565b610190565b005b3480156100aa57600080fd5b506100c560048036038101906100c09190612144565b6103ae565b6040516100d2919061220c565b60405180910390f35b6100f560048036038101906100f0919061222e565b6105d3565b005b34801561010357600080fd5b5061010c6107a2565b604051610119919061220c565b60405180910390f35b34801561012e57600080fd5b5061014960048036038101906101449190612347565b610834565b005b34801561015757600080fd5b50610172600480360381019061016d919061239a565b6109b4565b005b61018e600480360381019061018991906123da565b610b44565b005b815183511480156101a2575080518251145b6101e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101d89061264e565b60405180910390fd5b60005b83518110156103a757600060018673ffffffffffffffffffffffffffffffffffffffff1663e00dd1616040518163ffffffff1660e01b8152600401602060405180830381865afa15801561023c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102609190612683565b61026a91906126df565b905082828151811061027f5761027e612713565b5b6020026020010151818773ffffffffffffffffffffffffffffffffffffffff167fa491b2906955de9b9a0a0e6d8d87c1688f5207237fe435504138a6b00e7e92e8338987815181106102d4576102d3612713565b5b60200260200101516040516102ea929190612751565b60405180910390a48573ffffffffffffffffffffffffffffffffffffffff1663d0def52186848151811061032157610320612713565b5b602002602001015186858151811061033c5761033b612713565b5b60200260200101516040518363ffffffff1660e01b815260040161036192919061277a565b600060405180830381600087803b15801561037b57600080fd5b505af115801561038f573d6000803e3d6000fd5b5050505050808061039f906127aa565b9150506101e4565b5050505050565b60606000600283516103c091906127f2565b67ffffffffffffffff8111156103d9576103d8611c16565b5b6040519080825280601f01601f19166020018201604052801561040b5781602001600182028036833780820191505090505b50905060006040518060400160405280601081526020017f3031323334353637383961626364656600000000000000000000000000000000815250905060005b84518110156105a95781825186838151811061046a57610469612713565b5b602001015160f81c60f81b60f81c60ff166104859190612863565b8151811061049657610495612713565b5b602001015160f81c60f81b836002836104af91906127f2565b815181106104c0576104bf612713565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081825186838151811061050557610504612713565b5b602001015160f81c60f81b60f81c60ff166105209190612894565b8151811061053157610530612713565b5b602001015160f81c60f81b83600160028461054c91906127f2565b61055691906126df565b8151811061056757610566612713565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806105a1906127aa565b91505061044b565b50816040516020016105bb9190612963565b60405160208183030381529060405292505050919050565b835185511480156105e5575080518451145b80156105f2575081518151145b80156105ff575082518251145b61063e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106359061264e565b60405180910390fd5b60005b85518110156107995784818151811061065d5761065c612713565b5b60200260200101517f1584cade467323441f28ef89c6a3cdee444e1c31e57ca58b7a2e96ef6e0b6ef860405160405180910390a28673ffffffffffffffffffffffffffffffffffffffff1663af72bd918783815181106106c0576106bf612713565b5b60200260200101518784815181106106db576106da612713565b5b60200260200101518785815181106106f6576106f5612713565b5b602002602001015187868151811061071157610710612713565b5b602002602001015187878151811061072c5761072b612713565b5b60200260200101516040518663ffffffff1660e01b8152600401610754959493929190612994565b600060405180830381600087803b15801561076e57600080fd5b505af1158015610782573d6000803e3d6000fd5b505050508080610791906127aa565b915050610641565b50505050505050565b6060600080546107b190612a24565b80601f01602080910402602001604051908101604052809291908181526020018280546107dd90612a24565b801561082a5780601f106107ff5761010080835404028352916020019161082a565b820191906000526020600020905b81548152906001019060200180831161080d57829003601f168201915b5050505050905090565b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16636352211e846040518263ffffffff1660e01b81526004016108849190612a55565b602060405180830381865afa1580156108a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c59190612a85565b73ffffffffffffffffffffffffffffffffffffffff161461091b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091290612b24565b60405180910390fd5b6000811161095e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095590612b90565b60405180910390fd5b80600260008481526020019081526020016000208190555080827fcf5c0bd1db1bda5f264be4f84ee9dcd59f04653ca22197bbf710f2c3bb2b7c76856040516109a79190612bb0565b60405180910390a3505050565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b8152600401610a049190612a55565b602060405180830381865afa158015610a21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a459190612a85565b73ffffffffffffffffffffffffffffffffffffffff1614610a9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9290612b24565b60405180910390fd5b6000600260008381526020019081526020016000205411610af1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae890612c17565b60405180910390fd5b6002600082815260200190815260200160002060009055807fa5700e6e137f0686a6aeb9ae573396b3ce22f929686865812dbda871081193b983604051610b389190612bb0565b60405180910390a25050565b89518b51148015610b56575088518a51145b8015610b63575087518951145b8015610b70575086518851145b8015610b7d575085518751145b8015610b8a575084518651145b8015610b97575083518551145b8015610ba4575082518451145b8015610bb1575081518351145b8015610bbe575080518251145b610bfd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf49061264e565b60405180910390fd5b6000805b8251811015610cf15760018c8281518110610c1f57610c1e612713565b5b602002602001015103610cb65760026000888381518110610c4357610c42612713565b5b6020026020010151815260200190815260200160002054838281518110610c6d57610c6c612713565b5b602002602001015114610cb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cac90612c83565b60405180910390fd5b5b828181518110610cc957610cc8612713565b5b602002602001015182610cdc91906126df565b91508080610ce9906127aa565b915050610c01565b50348114610d34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2b90612cef565b60405180910390fd5b60005b8c518110156119f75760028c8281518110610d5557610d54612713565b5b6020026020010151036115dc57868181518110610d7557610d74612713565b5b60200260200101518c8281518110610d9057610d8f612713565b5b60200260200101518e8381518110610dab57610daa612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff167f5477f9965f93d173424ef8e21fac70c586b2fdb903ecf743d7a0973e6bfe3c948c8581518110610dfd57610dfc612713565b5b60200260200101518c8681518110610e1857610e17612713565b5b60200260200101518b8781518110610e3357610e32612713565b5b6020026020010151898881518110610e4e57610e4d612713565b5b6020026020010151604051610e669493929190612d0f565b60405180910390a46000610ee560018d8481518110610e8857610e87612713565b5b6020026020010151610e9934611a06565b604051602001610eab93929190612e1d565b60405160208183030381529060405280519060200120604051602001610ed19190612e79565b6040516020818303038152906040526103ae565b90508a8281518110610efa57610ef9612713565b5b6020026020010151604051602001610f129190612e94565b6040516020818303038152906040528051906020012081604051602001610f399190612e94565b6040516020818303038152906040528051906020012014610f8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8690612ef7565b60405180910390fd5b7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708e8381518110610fc357610fc2612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16630e89341c8a8581518110610ff957610ff8612713565b5b60200260200101516040518263ffffffff1660e01b815260040161101d9190612a55565b600060405180830381865afa15801561103a573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906110639190612f87565b6040516020016110739190612e94565b60405160208183030381529060405280519060200120036111a2578d82815181106110a1576110a0612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663af72bd918a84815181106110d7576110d6612713565b5b60200260200101518a85815181106110f2576110f1612713565b5b602002602001015188868151811061110d5761110c612713565b5b60200260200101518a878151811061112857611127612713565b5b60200260200101518c888151811061114357611142612713565b5b60200260200101516040518663ffffffff1660e01b815260040161116b959493929190612994565b600060405180830381600087803b15801561118557600080fd5b505af1158015611199573d6000803e3d6000fd5b50505050611476565b8682815181106111b5576111b4612713565b5b60200260200101518e83815181106111d0576111cf612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1662fdd58e8c858151811061120557611204612713565b5b60200260200101518b86815181106112205761121f612713565b5b60200260200101516040518363ffffffff1660e01b8152600401611245929190612fd0565b602060405180830381865afa158015611262573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112869190612683565b10156114755760008e83815181106112a1576112a0612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1662fdd58e8c85815181106112d6576112d5612713565b5b60200260200101518b86815181106112f1576112f0612713565b5b60200260200101516040518363ffffffff1660e01b8152600401611316929190612fd0565b602060405180830381865afa158015611333573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113579190612683565b90508e838151811061136c5761136b612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663af72bd918b85815181106113a2576113a1612713565b5b60200260200101518b86815181106113bd576113bc612713565b5b60200260200101518987815181106113d8576113d7612713565b5b60200260200101518b88815181106113f3576113f2612713565b5b6020026020010151868e8a8151811061140f5761140e612713565b5b60200260200101516114219190612ff9565b6040518663ffffffff1660e01b8152600401611441959493929190612994565b600060405180830381600087803b15801561145b57600080fd5b505af115801561146f573d6000803e3d6000fd5b50505050505b5b60003490508e838151811061148e5761148d612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663f242432a8c85815181106114c4576114c3612713565b5b60200260200101518c86815181106114df576114de612713565b5b60200260200101518c87815181106114fa576114f9612713565b5b60200260200101518c888151811061151557611514612713565b5b60200260200101516040518563ffffffff1660e01b815260040161153c9493929190613064565b600060405180830381600087803b15801561155657600080fd5b505af115801561156a573d6000803e3d6000fd5b5050505060008b848151811061158357611582612713565b5b602002602001015190508073ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156115d3573d6000803e3d6000fd5b505050506119e4565b60018c82815181106115f1576115f0612713565b5b6020026020010151036119e35760008d828151811061161357611612612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16636352211e89848151811061164957611648612713565b5b60200260200101516040518263ffffffff1660e01b815260040161166d9190612a55565b602060405180830381865afa15801561168a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ae9190612a85565b90508782815181106116c3576116c2612713565b5b60200260200101518d83815181106116de576116dd612713565b5b60200260200101518f84815181106116f9576116f8612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff167f5477f9965f93d173424ef8e21fac70c586b2fdb903ecf743d7a0973e6bfe3c94848d878151811061174c5761174b612713565b5b602002602001015160018a898151811061176957611768612713565b5b60200260200101516040516117819493929190613156565b60405180910390a46000600260008a85815181106117a2576117a1612713565b5b6020026020010151815260200190815260200160002054036117f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117f0906131e7565b60405180910390fd5b600260008984815181106118105761180f612713565b5b60200260200101518152602001908152602001600020600090558d828151811061183d5761183c612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166342842e0e8f848151811061187357611872612713565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16636352211e8b86815181106118a9576118a8612713565b5b60200260200101516040518263ffffffff1660e01b81526004016118cd9190612a55565b602060405180830381865afa1580156118ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061190e9190612a85565b8b858151811061192157611920612713565b5b60200260200101518b868151811061193c5761193b612713565b5b60200260200101516040518463ffffffff1660e01b815260040161196293929190613207565b600060405180830381600087803b15801561197c57600080fd5b505af1158015611990573d6000803e3d6000fd5b5050505060003490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156119df573d6000803e3d6000fd5b5050505b5b80806119ef906127aa565b915050610d37565b50505050505050505050505050565b606060008203611a4d576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611b89565b600082905060005b60008214611a7f578080611a68906127aa565b915050600a82611a789190612863565b9150611a55565b60008167ffffffffffffffff811115611a9b57611a9a611c16565b5b6040519080825280601f01601f191660200182016040528015611acd5781602001600182028036833780820191505090505b50905060008290505b60008614611b8157600181611aeb9190612ff9565b90506000600a8088611afd9190612863565b611b0791906127f2565b87611b129190612ff9565b6030611b1e919061324b565b905060008160f81b905080848481518110611b3c57611b3b612713565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a88611b789190612863565b97505050611ad6565b819450505050505b919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611bcd82611ba2565b9050919050565b611bdd81611bc2565b8114611be857600080fd5b50565b600081359050611bfa81611bd4565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611c4e82611c05565b810181811067ffffffffffffffff82111715611c6d57611c6c611c16565b5b80604052505050565b6000611c80611b8e565b9050611c8c8282611c45565b919050565b600067ffffffffffffffff821115611cac57611cab611c16565b5b602082029050602081019050919050565b600080fd5b6000611cd5611cd084611c91565b611c76565b90508083825260208201905060208402830185811115611cf857611cf7611cbd565b5b835b81811015611d215780611d0d8882611beb565b845260208401935050602081019050611cfa565b5050509392505050565b600082601f830112611d4057611d3f611c00565b5b8135611d50848260208601611cc2565b91505092915050565b600067ffffffffffffffff821115611d7457611d73611c16565b5b602082029050602081019050919050565b600080fd5b600067ffffffffffffffff821115611da557611da4611c16565b5b611dae82611c05565b9050602081019050919050565b82818337600083830152505050565b6000611ddd611dd884611d8a565b611c76565b905082815260208101848484011115611df957611df8611d85565b5b611e04848285611dbb565b509392505050565b600082601f830112611e2157611e20611c00565b5b8135611e31848260208601611dca565b91505092915050565b6000611e4d611e4884611d59565b611c76565b90508083825260208201905060208402830185811115611e7057611e6f611cbd565b5b835b81811015611eb757803567ffffffffffffffff811115611e9557611e94611c00565b5b808601611ea28982611e0c565b85526020850194505050602081019050611e72565b5050509392505050565b600082601f830112611ed657611ed5611c00565b5b8135611ee6848260208601611e3a565b91505092915050565b600067ffffffffffffffff821115611f0a57611f09611c16565b5b602082029050602081019050919050565b6000819050919050565b611f2e81611f1b565b8114611f3957600080fd5b50565b600081359050611f4b81611f25565b92915050565b6000611f64611f5f84611eef565b611c76565b90508083825260208201905060208402830185811115611f8757611f86611cbd565b5b835b81811015611fb05780611f9c8882611f3c565b845260208401935050602081019050611f89565b5050509392505050565b600082601f830112611fcf57611fce611c00565b5b8135611fdf848260208601611f51565b91505092915050565b6000806000806080858703121561200257612001611b98565b5b600061201087828801611beb565b945050602085013567ffffffffffffffff81111561203157612030611b9d565b5b61203d87828801611d2b565b935050604085013567ffffffffffffffff81111561205e5761205d611b9d565b5b61206a87828801611ec1565b925050606085013567ffffffffffffffff81111561208b5761208a611b9d565b5b61209787828801611fba565b91505092959194509250565b600067ffffffffffffffff8211156120be576120bd611c16565b5b6120c782611c05565b9050602081019050919050565b60006120e76120e2846120a3565b611c76565b90508281526020810184848401111561210357612102611d85565b5b61210e848285611dbb565b509392505050565b600082601f83011261212b5761212a611c00565b5b813561213b8482602086016120d4565b91505092915050565b60006020828403121561215a57612159611b98565b5b600082013567ffffffffffffffff81111561217857612177611b9d565b5b61218484828501612116565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156121c75780820151818401526020810190506121ac565b60008484015250505050565b60006121de8261218d565b6121e88185612198565b93506121f88185602086016121a9565b61220181611c05565b840191505092915050565b6000602082019050818103600083015261222681846121d3565b905092915050565b60008060008060008060c0878903121561224b5761224a611b98565b5b600061225989828a01611beb565b965050602087013567ffffffffffffffff81111561227a57612279611b9d565b5b61228689828a01611d2b565b955050604087013567ffffffffffffffff8111156122a7576122a6611b9d565b5b6122b389828a01611fba565b945050606087013567ffffffffffffffff8111156122d4576122d3611b9d565b5b6122e089828a01611ec1565b935050608087013567ffffffffffffffff81111561230157612300611b9d565b5b61230d89828a01611ec1565b92505060a087013567ffffffffffffffff81111561232e5761232d611b9d565b5b61233a89828a01611fba565b9150509295509295509295565b6000806000606084860312156123605761235f611b98565b5b600061236e86828701611beb565b935050602061237f86828701611f3c565b925050604061239086828701611f3c565b9150509250925092565b600080604083850312156123b1576123b0611b98565b5b60006123bf85828601611beb565b92505060206123d085828601611f3c565b9150509250929050565b60008060008060008060008060008060006101608c8e031215612400576123ff611b98565b5b60008c013567ffffffffffffffff81111561241e5761241d611b9d565b5b61242a8e828f01611d2b565b9b505060208c013567ffffffffffffffff81111561244b5761244a611b9d565b5b6124578e828f01611fba565b9a505060408c013567ffffffffffffffff81111561247857612477611b9d565b5b6124848e828f01611ec1565b99505060608c013567ffffffffffffffff8111156124a5576124a4611b9d565b5b6124b18e828f01611ec1565b98505060808c013567ffffffffffffffff8111156124d2576124d1611b9d565b5b6124de8e828f01611d2b565b97505060a08c013567ffffffffffffffff8111156124ff576124fe611b9d565b5b61250b8e828f01611d2b565b96505060c08c013567ffffffffffffffff81111561252c5761252b611b9d565b5b6125388e828f01611fba565b95505060e08c013567ffffffffffffffff81111561255957612558611b9d565b5b6125658e828f01611fba565b9450506101008c013567ffffffffffffffff81111561258757612586611b9d565b5b6125938e828f01611ec1565b9350506101208c013567ffffffffffffffff8111156125b5576125b4611b9d565b5b6125c18e828f01611ec1565b9250506101408c013567ffffffffffffffff8111156125e3576125e2611b9d565b5b6125ef8e828f01611fba565b9150509295989b509295989b9093969950565b7f6c656e677468206e6f742073616d650000000000000000000000000000000000600082015250565b6000612638600f83612198565b915061264382612602565b602082019050919050565b600060208201905081810360008301526126678161262b565b9050919050565b60008151905061267d81611f25565b92915050565b60006020828403121561269957612698611b98565b5b60006126a78482850161266e565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006126ea82611f1b565b91506126f583611f1b565b925082820190508082111561270d5761270c6126b0565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b61274b81611bc2565b82525050565b60006040820190506127666000830185612742565b6127736020830184612742565b9392505050565b600060408201905061278f6000830185612742565b81810360208301526127a181846121d3565b90509392505050565b60006127b582611f1b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036127e7576127e66126b0565b5b600182019050919050565b60006127fd82611f1b565b915061280883611f1b565b925082820261281681611f1b565b9150828204841483151761282d5761282c6126b0565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061286e82611f1b565b915061287983611f1b565b92508261288957612888612834565b5b828204905092915050565b600061289f82611f1b565b91506128aa83611f1b565b9250826128ba576128b9612834565b5b828206905092915050565b600081905092915050565b7f3078000000000000000000000000000000000000000000000000000000000000600082015250565b60006129066002836128c5565b9150612911826128d0565b600282019050919050565b600081519050919050565b600081905092915050565b600061293d8261291c565b6129478185612927565b93506129578185602086016121a9565b80840191505092915050565b600061296e826128f9565b915061297a8284612932565b915081905092915050565b61298e81611f1b565b82525050565b600060a0820190506129a96000830188612742565b6129b66020830187612985565b81810360408301526129c881866121d3565b905081810360608301526129dc81856121d3565b90506129eb6080830184612985565b9695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680612a3c57607f821691505b602082108103612a4f57612a4e6129f5565b5b50919050565b6000602082019050612a6a6000830184612985565b92915050565b600081519050612a7f81611bd4565b92915050565b600060208284031215612a9b57612a9a611b98565b5b6000612aa984828501612a70565b91505092915050565b7f5065726d697373696f6e2064656e6965643a6e66742069742773206e6f74207960008201527f6f75727300000000000000000000000000000000000000000000000000000000602082015250565b6000612b0e602483612198565b9150612b1982612ab2565b604082019050919050565b60006020820190508181036000830152612b3d81612b01565b9050919050565b7f7072696365206d757374206d6f7265207468616e207468652030000000000000600082015250565b6000612b7a601a83612198565b9150612b8582612b44565b602082019050919050565b60006020820190508181036000830152612ba981612b6d565b9050919050565b6000602082019050612bc56000830184612742565b92915050565b7f6e6f742073656c6c696e67000000000000000000000000000000000000000000600082015250565b6000612c01600b83612198565b9150612c0c82612bcb565b602082019050919050565b60006020820190508181036000830152612c3081612bf4565b9050919050565b7f496e636f72726563742070726963650000000000000000000000000000000000600082015250565b6000612c6d600f83612198565b9150612c7882612c37565b602082019050919050565b60006020820190508181036000830152612c9c81612c60565b9050919050565b7f76616c756520213d2073756d2076616c75657300000000000000000000000000600082015250565b6000612cd9601383612198565b9150612ce482612ca3565b602082019050919050565b60006020820190508181036000830152612d0881612ccc565b9050919050565b6000608082019050612d246000830187612742565b612d316020830186612742565b612d3e6040830185612985565b612d4b6060830184612985565b95945050505050565b60008190508160005260206000209050919050565b60008154612d7681612a24565b612d8081866128c5565b94506001821660008114612d9b5760018114612db057612de3565b60ff1983168652811515820286019350612de3565b612db985612d54565b60005b83811015612ddb57815481890152600182019150602081019050612dbc565b838801955050505b50505092915050565b6000612df78261218d565b612e0181856128c5565b9350612e118185602086016121a9565b80840191505092915050565b6000612e298286612d69565b9150612e358285612dec565b9150612e418284612dec565b9150819050949350505050565b6000819050919050565b6000819050919050565b612e73612e6e82612e4e565b612e58565b82525050565b6000612e858284612e62565b60208201915081905092915050565b6000612ea08284612dec565b915081905092915050565b7f68617368206973206572726f7200000000000000000000000000000000000000600082015250565b6000612ee1600d83612198565b9150612eec82612eab565b602082019050919050565b60006020820190508181036000830152612f1081612ed4565b9050919050565b6000612f2a612f2584611d8a565b611c76565b905082815260208101848484011115612f4657612f45611d85565b5b612f518482856121a9565b509392505050565b600082601f830112612f6e57612f6d611c00565b5b8151612f7e848260208601612f17565b91505092915050565b600060208284031215612f9d57612f9c611b98565b5b600082015167ffffffffffffffff811115612fbb57612fba611b9d565b5b612fc784828501612f59565b91505092915050565b6000604082019050612fe56000830185612742565b612ff26020830184612985565b9392505050565b600061300482611f1b565b915061300f83611f1b565b9250828203905081811115613027576130266126b0565b5b92915050565b600082825260208201905092915050565b50565b600061304e60008361302d565b91506130598261303e565b600082019050919050565b600060a0820190506130796000830187612742565b6130866020830186612742565b6130936040830185612985565b6130a06060830184612985565b81810360808301526130b181613041565b905095945050505050565b6000819050919050565b60006130e16130dc6130d784611ba2565b6130bc565b611ba2565b9050919050565b60006130f3826130c6565b9050919050565b6000613105826130e8565b9050919050565b613115816130fa565b82525050565b6000819050919050565b600061314061313b6131368461311b565b6130bc565b611f1b565b9050919050565b61315081613125565b82525050565b600060808201905061316b600083018761310c565b6131786020830186612742565b6131856040830185613147565b6131926060830184612985565b95945050505050565b7f4974656d206e6f742073656c6c696e6700000000000000000000000000000000600082015250565b60006131d1601083612198565b91506131dc8261319b565b602082019050919050565b60006020820190508181036000830152613200816131c4565b9050919050565b600060608201905061321c6000830186612742565b6132296020830185612742565b6132366040830184612985565b949350505050565b600060ff82169050919050565b60006132568261323e565b91506132618361323e565b9250828201905060ff81111561327a576132796126b0565b5b9291505056fea26469706673582212202eb2de7f83d92fbee588bc706e1f7e458dea3e188a86e8ab31bd161ac5811d7964736f6c63430008110033";

type RobotConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RobotConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Robot__factory extends ContractFactory {
  constructor(...args: RobotConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _versoion: PromiseOrValue<string>,
    _salt: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Robot> {
    return super.deploy(_versoion, _salt, overrides || {}) as Promise<Robot>;
  }
  override getDeployTransaction(
    _versoion: PromiseOrValue<string>,
    _salt: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_versoion, _salt, overrides || {});
  }
  override attach(address: string): Robot {
    return super.attach(address) as Robot;
  }
  override connect(signer: Signer): Robot__factory {
    return super.connect(signer) as Robot__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RobotInterface {
    return new utils.Interface(_abi) as RobotInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Robot {
    return new Contract(address, _abi, signerOrProvider) as Robot;
  }
}