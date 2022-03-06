
const assert =require('Assert');
const ganache= require('Ganache-cli');// local test network
const Web3 =require('web3');// constructor function
const web3 =new Web3(ganache.provider());//instance of web3
const {abi,bytecode}= require('../compile')


//2 variables:1 instance of contrACT, 2. LIST OF ALL ganache unlocked a/c for us
let lottery;
let accounts;

beforeEach( async()=>{
    accounts=await web3.eth.getAccounts();
    lottery= await  web3.eth.Contract(JSON.parse(abi))
    .deploy({data:bytecode}
    .send({from:accounts[0],gas:"1000000"}))
})
describe('Lottery Contract',()=>{
    it('deploys a contract',()=>{
        assert.ok(lottery.options.address)
    })
    it('allows multiple account to enter',async()=>{
        await lottery.methods.enter.send({
            from:accounts[0],
            value:web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter.send({
            from:accounts[1],
            value:web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter.send({
            from:accounts[2],
            value:web3.utils.toWei('0.02','ether')
        });
    })
    const players =await lottery.methods.getPlayers().call({
        from:accounts[0]
    });
    //only element in players array should be address atzero
    // only 1 element in array
assert.equal(accounts[0],players[0])
assert.equal(accounts[1],players[1])
assert.equal(accounts[2],players[2])
    //corect address within array
    assert.equal(3,players.length);

    // minimam amount of ether to enter
    it('requires minimum amoiubt of ether to enter',asyn()=> {
        try{
        await lottery.methods.enter(send({
           from:accounts[0],
           value:0
        }));
        assert(false)//dentifier expected. 'false' is a reserved word that cannot be used here.
    } 
    
    ,catch(err){
       assert(err); 
    }
    });
    it('only manager can call winner',async()=>{
        try{
            await lottery.methods.pickWinner().send({
                from :accounts[1]
            });
            assert(false);
        }catch(err){
            assert(err)
        }
    })
    it('sends money to the winner and resets the players array', async()=>{
      //entering only 1 player,not realy who wins
      await lottery.methods.enter().send({
        from:accounts[0],
        value:web3.utils.toWei('2','ether' )
      });
       const initialBalance=await web3.eth.getBalance([0]);
       await lottery.methods.pickWinner().send({ from:accounts[0]})
       const finalBalance = await web3.eth.getBalance(accounts[0])
       const difference = finalBalance -initialBalance;
       console.log(finalBalance-initialBalance)//amount spent on gas
       assert(difference>web3.utils.toWei('1.8','ether'));
    } )

    })
//ssert that plays is empty
//assert that lottery is empty

