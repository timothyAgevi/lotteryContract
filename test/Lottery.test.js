const { strictEqual } = require('assert');
const assert = require('assert');
const ganache= require('ganache-cli');// local test network
const Web3 =require('web3');// constructor function
const web3 =new Web3(ganache.provider());//instance of web3
const {abi,bytecode}= require('../compile')


//2 variables:1 instance of contrACT, 2. LIST OF ALL ganache unlocked a/c for us
let lottery;
let accounts;

beforeEach( async()=>{
    accounts=await web3.eth.getAccounts();
    lottery= await  web3.eth.Contract(JSON.parse(imterface))
    .deploy({data:bytecode}
        .send({from:accounts[0],gas:"1000000"}))
})
describew('Lottery Contract',()=>{
    it('deploys a contract',()=>{
        assert.ok(lottery.options.address)
    })
})

