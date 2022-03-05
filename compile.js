const path= require('path');
const fs =require('fs');
const solc=require('solc');

//find path
const lotteryPath= path.resolve(__dirname,'contracts','Lottery.sol');

//read content of file
const source =fs.readFileSync(lotteryPath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "*" ]
            }
        }
    }
};




//compile  statement
//  module.exports = solc.compile(source,1).contracts[':Lottery'];




const output =JSON.parse(solc.compile(JSON.stringify(input)));

//output here contains JSON output as specified in documentation
var outputContracts= output.contracts['Lottery.sol']['Lottery']

//export ABI interface
module.exports.abi = outputContracts.abi

// export bytecode
module.exports.bytecode = outputContracts.evm.bytecode.object;