# SmartContracts with web3

install ganache-cli and run it. 
On Linux it look like this:
Install: (requires npm, but that exists for windows as well I think)
sudo npm install -g ganache-cli
run:
sudo ganache-cli

The console-output will look something like this:
-------------------------------------------------------------------------------------------------------------------
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0x782986030c1CE2bb6b953E5fa02Cd7f69Dc3fC88 (100 ETH)
(1) 0xECc63D23c641b0723E83637e337fAFe388E8F0F1 (100 ETH)
(2) 0xE1820e33cCebA4BF835F8E90F705F5727be33CB4 (100 ETH)
(3) 0xd1F7bA2E87e0CefD960D2e09D893BdE8317d882b (100 ETH)
(4) 0x78a860F691a3B011E48995FAC40868892AF44f83 (100 ETH)
(5) 0xF7C31d78873632762a10e571DDE7097dD89bc9C5 (100 ETH)
(6) 0x1f6d82444b4dcc20940F540365fB4222f91e52d8 (100 ETH)
(7) 0xE492b4c6554Ada06AC1068E318F5E89dAc0258Ad (100 ETH)
(8) 0x2aC5c3e2203479639658DC530DB313862441AF21 (100 ETH)
(9) 0xB926B1733AF1BbB5d7E3C46f54EAb777720EE374 (100 ETH)

Private Keys
==================
(0) 0x57c184cbcdf1758750b22eb9c00b05356992632365fdbfc577b29721138499ec
(1) 0xafd0715d07699f59a47b992b97012a59bf516a7ca2452d4a6d048f31980b8292
(2) 0xd2c364ee7584178987f281148d45094c14ec5b731263185d51a52807e4e4fbe6
(3) 0xe1347ffb8858c6ae17d07924989fd92b11748f8ea1a8b26eee601d93855fbce2
(4) 0x43472724d678d1109d1b5e025ed168cc82306fe9f7bc9b52a5d6cd7bc5928e13
(5) 0x3bbd91aae03a8cb68a3e9a54b871e0152ad31964e99fb0d2938648b6e7a8cb6e
(6) 0x3296314d73420774ea1e3b22313da8643247c31057d05ab11983ed4862d81e50
(7) 0x7cad3a0d997a4ede5fd64c7f307e0427f15d930f54dee1d3f4aa931979359708
(8) 0x7f074a5e0b65524cc7815fec804f009fdedaf13fcc55f8e08b8d34b30bdfc864
(9) 0xeffeb82ea53271de83a826f22bab2f67dd545505f71dfd32efe0d0f32009ce1f

HD Wallet
==================
Mnemonic:      shadow galaxy giant choice guitar rent document couple when mosquito country route
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991

Listening on 127.0.0.1:8545
-------------------------------------------------------------------------------------------------------------------

This has now set up a virtual environment where we can host our token on, without actually putting it on the blockchain, it's great for easy testing.
The last line tells us, where the connection to this test-environment is. In my example it is on 127.0.0.1:8545, which is the default setting.

Now we need to create a token.
Open up  https://remix.ethereum.org in your browser
On the left you can see a folder "contracts". If you click on it you see its content, which are 3 example contracts Storage.sol, Owner.sol and Ballot.sol. Create a new using the "new file" icon above and name it "test.sol" (any name works)
In the middle of the windows you can now edit the file "test.sol" input the following lines (without the -------):
-------------------------------------------------------
pragma solidity ^0.8.7;

contract Test{
    string name = "Dimi";

    function setValue(string calldata p_name) public {
        name = p_name;
    }
 
    function getValue() public view returns (string memory){
        return (name);
    }

}
-------------------------------------------------------

This defines our contract. The contract part is like similar to a standard class definition in any OO-language.
The 'pragma solidity' part tells the compiler which version of solidity we are using. Look in the url of the website, and you will find this information. (0.8.7 should still be correct when you do this)

Now on the very left of the web-page, go to the compiler. It is the symbol that looks like two arrows pointing away from each other, with a circle-arrow next to it.
You don't need to change anything, just click on 'Compile test.sol'.

Now go to the Deployment & Run Transaction 'tab'. It is right bellow compile and looks like two triangles stacked on top of each other with a third triangle to the side.
Here change the Environment to "Web3 Provider". It will ask you for a Web3 Provider endpoint. Put in the endpoint that we got as the console output for ganache-cli (by default '127.0.0.1:8545')
Now click on Deploy. Our contract is now deployed on our virtual blockchain.
You should see an entry under Deployed Contracts named "Test at ...". Expand this entry using the arrow and you can see the two methods we defined "setValue" and "GetValue". You can test them out here.

Now we need to setup the HTML. Open up index.HTML in an editor. You can ignore most of it, and scroll to the bottom to the second <script> ... </script> section.
I am not going to explain, what all of it does, because it would be complicated to do in text form. I can explain it in a call or smth if people are interested.
But here is what you need to know if you want to get your token to work:
Find the function new web3.eth.Contract( ... ). It needs two parameters. The first one is a JSON object with the interface-definition of out contract, the second is the adress of our contract.
JSON:
Go back to the website where we defined the contract and go into the compiler-tab. Find the button labeled "Compilation Details" and click it. On the pop-up-window locate "Web3 deployment" and copy its content using the copy button next to it.
Paste the content to somewhere, it should look something like this:
----------------------------------------------------------------------------------------
var testContract = new web3.eth.Contract([{"inputs":[],"name":"getValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"p_name","type":"string"}],"name":"setValue","outputs":[],"stateMutability":"nonpayable","type":"function"}]);
var test = testContract.deploy({
     data: '0x60806040526040518060400160405280600481526020017f44696d69000000000000000000000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610166565b82805461006e90610105565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b6000600282049050600182168061011d57607f821691505b6020821081141561013157610130610137565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6103ce806101756000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b57806393a0935214610059575b600080fd5b610043610075565b604051610050919061029c565b60405180910390f35b610073600480360381019061006e9190610216565b610107565b005b6060600080546100849061030d565b80601f01602080910402602001604051908101604052809291908181526020018280546100b09061030d565b80156100fd5780601f106100d2576101008083540402835291602001916100fd565b820191906000526020600020905b8154815290600101906020018083116100e057829003601f168201915b5050505050905090565b81816000919061011892919061011d565b505050565b8280546101299061030d565b90600052602060002090601f01602090048101928261014b5760008555610192565b82601f1061016457803560ff1916838001178555610192565b82800160010185558215610192579182015b82811115610191578235825591602001919060010190610176565b5b50905061019f91906101a3565b5090565b5b808211156101bc5760008160009055506001016101a4565b5090565b60008083601f8401126101d6576101d5610373565b5b8235905067ffffffffffffffff8111156101f3576101f261036e565b5b60208301915083600182028301111561020f5761020e610378565b5b9250929050565b6000806020838503121561022d5761022c610382565b5b600083013567ffffffffffffffff81111561024b5761024a61037d565b5b610257858286016101c0565b92509250509250929050565b600061026e826102be565b61027881856102c9565b93506102888185602086016102da565b61029181610387565b840191505092915050565b600060208201905081810360008301526102b68184610263565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156102f85780820151818401526020810190506102dd565b83811115610307576000848401525b50505050565b6000600282049050600182168061032557607f821691505b602082108114156103395761033861033f565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f830116905091905056fea26469706673582212205fe3b5ba8b1c6865d7aeee7e72df031ece321627eabc7bf956827e725d57a21a64736f6c63430008070033', 
     arguments: [
     ]
}).send({
     from: web3.eth.accounts[0], 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
 -----------------------------------------------------------------------------------------------
 The JSON we are looking for is the argument of the function call from var "testContract = new web3.eth.Contract(THIS_HERE)
 if you copied my example one-for-one, then the JSON should already be set correctly in the index.HTML
 Address.
 To get the address, go to the "Deploy & run transactions"-tab on the website. Locate our deployed contract in the "Deployed Contracts" list. You should find a copy-icon on it's name. Click it and paste it into our index.html.
 The Value that is already in there was the adress when I set it up on my machine. It will be different on your end and you need to set it.
 
 Everything should now be set-up. As you can see in the html, shortly after we call 'Coursetro.methods.getValue().call(...', so we call the method we deffined in our contract form the html.
 Open up the html in a browser and you should see 'Dimi' on the website, or if you changed the value to something else, you should see that value.


