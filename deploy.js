const HDWalletProvider= require('truffle-wallet-provider');
const Web3= require('web3');
const{bytecode, abi}=require('./compile')

const provider = new HDWalletProvider(
    'virtual first dawn mail wire helmet buffalo print pencil where allow scatter',
    // url of network to connect to
    'https://rinkeby.infura.io/v3/2d040a93bf9143c0815bd73f1f76ac85'
)

const web3=new Web3(provider); 

const deploy = async ()=>{
    //list of unlock a/c
    const accounts = await web3.eth.getAccounts();
    //
    console.log('Attempting to deploy from account',accounts[0])
  const result =  await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data:bytecode})
    .send({ gas: '1000000', from:accounts[0]});

    // address to wherecontract is deployed to
    console.log('Contract deployed to',result.options.address);
}
deploy();