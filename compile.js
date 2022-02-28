const path= require('path');
const fs =require('fs');
const solc=require('solc');

//find path
const inboxPath= path.resolve(__dirname,'contracts','inbox.sol');

//read content of file
const source =fs.readFileSync(inboxPath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "abi", "evm.bytecode" ]
            }
        }
    }
};




//compile  statement
//  module.exports = solc.compile(source,1).contracts[':Inbox'];


const output =JSON.parse(solc.compile(JSON.stringify(input)));

//output here contains JSON output as specified in documentation
var outputContracts= output.contracts['inbox.sol']['Inbox']

//export ABI interface
module.exports.abi = outputContracts.abi

// export bytecode
module.exports.bytecode = outputContracts.evm.bytecode.object;