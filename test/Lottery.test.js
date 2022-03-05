const { strictEqual } = require('assert');
const assert = require('assert');
const ganache= require('ganache-cli');// local test network
const Web3 =require('web3');// constructor function
const web3 =new Web3(ganache.provider());//instance of web3
const {abi,bytecode}= require('../compile')

// testing example line 6-28
// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// let car;
// beforeEach( ()=>{
//      car = new Car();
// })
// describe('Car',()=>{
//     it('can park',()=>{
        
//         assert.equal(car.park(),'stopped')
//     })
//     it('can drive',()=>{
        
//         assert.equal(car.drive(),'vroom')
//     })
// });
let accounts;
let inbox;

beforeEach( async ()=>{
    //get a list of all acounts
   accounts = await web3.eth.getAccounts()
   
    // Use one of those acc to deploy
inbox= await new web3.eth.Contract(abi)//tells web3 which mwethods the contract has
.deploy({data:bytecode,
          arguments:['Hi there!']})//deploy new copy of this contract
.send({ from:accounts[0],
         gas:'1000000'})//send transaction that creates his contract


    //the contract
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);//checkif .send works address undefined
    });
     it('has a default message',async ()=>{
         message = await inbox.methods.message().call()//calling function
           //.message() -modify arguments passed to this function
     //-.call()-modify  how exactly  function gets called
         strictEqual(message, 'Hi there!');// assert.equal
     })
        it('can change the message',async()=>{
           await inbox.methods.setMessage('bye').send({ from :accounts[0]})
            let message = await inbox.methods.message().call()
            strictEqual(message,'bye');// assert.equal
        })

})

//https://rinkeby.infura.io/v3/2d040a93bf9143c0815bd73f1f76ac85