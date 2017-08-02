const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"update_oracalize","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"sendToOtherBlockchain","outputs":[{"name":"transactionID","type":"uint256"}],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"}],"name":"TransactionSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"depositAddress","type":"address"}],"name":"TransactionMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"reason","type":"string"}],"name":"TransactionAborted","type":"event"}]');
const rinkeby_address = '0x248075bd51aad583e9f5afdbee3d306b628e6435';
const rinkeby_etherscan = 'https://rinkeby.etherscan.io/';
const mainnet_address = '0x248075bd51aad583e9f5afdbee3d306b628e6435';
const mainnet_etherscan = 'https://etherscan.io/';

const myAddress = '0x61b122c456b72aef1fe767ee5b2ac486356e6c45';

var networkId;
var contractAddress;
var etherscan_url;
var myContract;
var InterCrypto;

// MetaMask injects the web3 library for us.
window.onload = function() {
  if (typeof web3 === 'undefined') {
    displayDAPPContent('<div class="alert alert-warning" role="alert" align="center">You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this DAPP</div>');
  }
  else {
    networkId = checkNetwork();
    switch (networkId) {
      case '1':
        document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to mainnet Ethereum blockchain</div>';
        contractAddress = mainnet_address;
        etherscan_url = mainnet_etherscan;
        break;
      case '4':
        document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to the Rinkeby blockchain</div><div class="alert alert-warning" role="alert">If not connected to mainet, then the final function of the InterCrypto DAPP will not work due to the inability to use ShapeShift</div>';
        contractAddress = rinkeby_address;
        etherscan_url = rinkeby_etherscan;
        break;
      default:
        document.getElementById('top-messages').innerHTML = '<div class="alert alert-warning" role="alert">You are not connected to a supported blockchain</div>';
        break;
    }

    if (networkId > 0) {
      myContract = web3.eth.contract(contractABI);
      InterCrypto = myContract.at(contractAddress);
      // TODO: Check that InterCrypto is defined, else show message

      ic_updateCost();

      document.getElementById('eh').href = etherscan_url + 'address/' + contractAddress;
    }

  }
}

function getICSymbol() {
  switch (document.getElementById('ic_symbol').value) {
    case 'Bitcoin':
      return 'btc';
    case 'Litecoin':
      return 'ltc';
    case 'Ethereum Classic':
      return 'etc';
    default:
      return 0;
  }
}

function ic_sendToOtherBlockchain() {
  var amountToSend = web3.toWei(document.getElementById("ic_amount").value, 'ether')
  var symbol;
  symbol = getICSymbol();
  if (symbol == 0)
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    var address = document.getElementById("ic_address").value
    symbol = 'eth_' + symbol;
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-success" role="alert">InterCrypto.sendToOtherBlockchain(' + symbol + ', ' + address + ', {value: ' + amountToSend + '}</div>';
    InterCrypto.sendToOtherBlockchain(symbol, address, {value: amountToSend}, (error, result) => {
      if (error)
        document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-warning" role="alert>"' + error + '</div>';
      else {
        document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>';
        // TODO: watch for events and display them
      }
    })
  }
}

function donate_send() {
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: myAddress,
    value: web3.toWei(document.getElementById("donate_amount").value, 'ether')
  }, function(error, result) {
    if (!error) {
      document.getElementById('donate_response').innerHTML = '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>'
    } else {
      document.getElementById('donate_response').innerHTML = '<div class="alert alert-warning" role="alert">' + error + '</div>'
    }
  })
}

function displayDAPPContent(content) {
  document.getElementById('intercrypto-dapp').innerHTML = content;
  document.getElementById('demo-dapp').innerHTML = content;
}

function checkNetwork() {
  try {
    var value = web3.version.network;
  }
  catch(error) {
    displayDAPPContent('<div class="alert alert-warning" role="alert" align="center">' + error + '</div>')
  }
  return value;
}

function ic_updateCost() {
  ic_getInterCryptoPrice((error, result1) => {
    ic_getShapeShiftMarket( (error, result2) =>{
      ic_setMinimumCost(result1 + result2);
    })
  });
}
function ic_getInterCryptoPrice(callback) {
  InterCrypto.getInterCryptoPrice((error, result) => {
    if (error)
      displayDAPPContent('<div class="alert alert-warning" role="alert">' + error + '</div>');
    else {
      var value = parseFloat(web3.fromWei(result, 'ether'));
      document.getElementById('ic_oracalize_cost').innerHTML = "+" + value.toFixed(6);
      callback(null, value);
      // return value;
    }
  });
}

function ic_getShapeShiftMarket(callback) {
  // TODO: make this depend on the dropdown symbol

  $.ajax({
    type: 'GET',
    url: 'https://cors.shapeshift.io/marketinfo/eth_btc',
    crossDomain: true,
    // data: '{"some":"json"}',
    // dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        document.getElementById('ic_shapeshift_minimum').innerHTML = '+' + responseData.minimum.toFixed(6);
        callback(null, responseData.minimum);
        // return responseData.minimum;
    },
    error: function (responseData, textStatus, errorThrown) {
        document.getElementById('ic_shapeshift_minimum').innerHTML = '<div class="alert alert-warning" role="alert" align="center">error</div>';
    }
  });
}

function ic_setMinimumCost(cost) {
  document.getElementById('ic_minimum_cost').innerHTML = '=' + cost.toFixed(6);
}
