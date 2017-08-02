const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"update_oracalize","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"sendToOtherBlockchain","outputs":[{"name":"transactionID","type":"uint256"}],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"}],"name":"TransactionSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"depositAddress","type":"address"}],"name":"TransactionMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"reason","type":"string"}],"name":"TransactionAborted","type":"event"}]');
const rinkeby_address = '0x248075bd51aad583e9f5afdbee3d306b628e6435';

var contractAddress;
var myContract;
var InterCrypto;

// MetaMask injects the web3 library for us.
window.onload = function() {
  if (typeof web3 === 'undefined') {
    document.getElementById('dapp').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
  }
  else {
    // TODO: Check what blockchain is being run and set contract address accordingly.
    // TODO: Show message if that blockchain is not supported...

    contractAddress = rinkeby_address;
    myContract = web3.eth.contract(contractABI);
    InterCrypto = myContract.at(contractAddress);
    // TODO: Check that InterCrypto is defined, else show message
  }
}

// DELETE ME AT END
function transaction_send() {
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',
    value: web3.toWei(document.getElementById("transaction_amount").value, 'ether')
  }, function(error, result) {
    if (!error) {
      document.getElementById('transaction_response').innerHTML = 'Success: <a href="https://testnet.etherscan.io/tx/' + result + '"> View Transaction </a>'
    } else {
      document.getElementById('transaction_response').innerHTML = '<pre>' + error + '</pre>'
    }
  })
}


function ic_sendToOtherBlockchain() {
  var amountToSend = web3.toWei(document.getElementById("ic_amount").value, 'ether')
  var symbol;
  // console.log('ic_symbol')
  switch (document.getElementById('ic_symbol').value) {
    case 'Bitcoin':
      symbol = 'btc';
      break;
    case 'Litecoin':
      symbol = 'ltc';
      break;
    case 'Ethereum Classic':
      symbol = 'etc';
      break;
    case 'Dash':
      symbol = 'xxxxxx';
      break;
    default:
      throw "Currency symbol not found"
  }
  var address = document.getElementById('ic_address').value;

  InterCrypto.sendToOtherBlockchain(symbol, address, {value: amountToSend}, (error, result) => {
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = result;
  })

  // document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = contractABI + "<br>" + contractAddress;
}

function ic_getInterCryptoPrice() {
  InterCrypto.getInterCryptoPrice((error, result) => {
    document.getElementById('ic_getInterCryptoPrice_response').innerHTML = "Price: " + result + " Wei";
  });
}
