const { strictEqual } = require('assert');
const assert = require('assert');
const ganache= require('ganache-cli');// local test network
const Web3 =require('web3');// constructor function
const web3 =new Web3(ganache.provider());//instance of web3
const {abi,bytecode}= require('../compile')
