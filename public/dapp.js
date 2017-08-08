const ic_contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"update_oracalize","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"sendToOtherBlockchain","outputs":[{"name":"transactionID","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"recover","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"}],"name":"TransactionStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"depositAddress","type":"address"}],"name":"TransactionSentToShapeShift","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"reason","type":"string"}],"name":"TransactionAborted","type":"event"}]');
const demo_contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"intercrypto_GetInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawNormal","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"intercrypto_SendToOtherBlockchain","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"interCrypto","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"king_or_queen","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"intercrypto_Recover","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ethSum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"}],"name":"Transaction","type":"event"}]');

const rinkeby_ic_address = '0xc58bf02df60d0fa02901cabfd1efa72de155c827';
const rinkeby_demo_address = '0x79831c281d7580710cf94f99bc8629a67438e3c2';
const rinkeby_etherscan = 'https://rinkeby.etherscan.io/';
const mainnet_ic_address = ''; // ADD ME!!!!!!!!!!!!!!!!!!!!!!!!!
const mainnet_demo_address = ''; // ADD ME!!!!!!!!!!!!!!!!!!!!!!!!!
const mainnet_etherscan = 'https://etherscan.io/';

const myAddress = '0x61b122c456b72aef1fe767ee5b2ac486356e6c45';

var networkId;
var ic_contractAddress;
var demo_contractAddress;
var etherscan_url;
var myContract;
var InterCrypto;

// MetaMask injects the web3 library for us.
window.onload = function() {
  if (typeof web3 === 'undefined') {
    displayDAPPContent('<div class="alert alert-warning" role="alert" align="center">You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this DAPP</div>');
  }
  else {
    try {
      web3.version.getNetwork((error, result) => {
        networkId = result;

        switch (networkId) {
          case '1':
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to mainnet Ethereum blockchain</div>';
            ic_contractAddress = mainnet_ic_address;
            demo_contractAddress = mainnet_demo_address;
            etherscan_url = mainnet_etherscan;
            break;
          case '4':
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to the Rinkeby blockchain</div><div class="alert alert-warning" role="alert">If not connected to mainet, then the final function of the InterCrypto DAPP will not work due to the inability to use ShapeShift</div>';
            ic_contractAddress = rinkeby_ic_address;
            demo_contractAddress = rinkeby_demo_address;
            etherscan_url = rinkeby_etherscan;
            break;
          default:
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-warning" role="alert">You are not connected to a supported blockchain</div>';
            displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">You are not connected to a supported blockchain</div>');
            break;
        }

        if (networkId > 0) {
          myContract = web3.eth.contract(ic_contractABI);
          InterCrypto = myContract.at(ic_contractAddress);

          myContract = web3.eth.contract(demo_contractABI);
          InterCrypto_Demo = myContract.at(ic_contractAddress);

          ic_update();

          document.getElementById('ic_etherscan_a').href = etherscan_url + 'address/' + ic_contractAddress;
          document.getElementById('demo_etherscan_a').href = etherscan_url + 'address/' + demo_contractAddress;

          // Start watching InterCrypto contract
          InterCrypto.TransactionStarted((error, result) => {
            if (!error) {
              transactionIDresult = result.args.transactionID;
              updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-info" role="alert">TransactionStarted(transactionID: ' + transactionIDresult + ')</div>');
            }
          });
          InterCrypto.TransactionAborted((error, result) => {
            if (!error) {
              transactionIDresult = result.args.transactionID;
              updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-danger" role="alert">TransactionAborted(transactionID: ' + transactionIDresult + ', reason: ' + result.args.reason + ')</div>');
            }
          });
          InterCrypto.TransactionSentToShapeShift((error, result) => {
            if (!error) {
              transactionIDresult = result.args.transactionID;
              updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-success" role="alert">TransactionSentToShapeShift(transactionID: ' + transactionIDresult + ', depositAddress: ' + result.args.depositAddress + ')</div>');
            }
          });

        }
      })
    }
    catch(error) {
      displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">' + error + '</div>');
    }

  }
}

function getICSymbol() {
  switch (document.getElementById('ic_symbol').value) {
    case 'Bitcoin':
      return 'btc';
    case 'Litecoin':
      return 'ltc';
    case 'Dash':
      return 'dash';
    case 'ZCash':
      return 'zec';
    case 'Dogecoin':
      return 'doge';
    default:
      return 0;
  }
}

function getICAddress(ic_symbol) {
  switch (ic_symbol) {
    case 'Bitcoin':
      return '1L8oRijgmkfcZDYA21b73b6DewLtyYs87s';
    case 'Litecoin':
      return 'LbZcDdMeP96ko85H21TQii98YFF9RgZg3D';
    case 'Dash':
      return 'Xoopows17idkTwNrMZuySXBwQDorsezQAx';
    case 'ZCash':
      return 't1N7tf1xRxz5cBK51JADijLDWS592FPJtya';
    case 'Dogecoin':
      return 'DMAFvwTH2upni7eTau8au6Rktgm2bUkMei';
    default:
      return 0;
  }
}

function ic_sendToOtherBlockchain() {
  var amountToSend = web3.toWei(document.getElementById("ic_amount").value, 'ether')
  var symbol = getICSymbol();
  if (symbol == 0)
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    // symbol += "xxxxx"; // useme to trip up the input and show desired error warnings
    var address = document.getElementById("ic_address").value
    updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-success" role="alert">InterCrypto.sendToOtherBlockchain("' + symbol + '", "' + address + '", {value: ' + amountToSend + '})</div>');
    // checkShapeShift(symbol, address, (error, result) => {
    //   if (error) {
    //     console.log(error)
    //     updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-danger" role="alert>ShapeShift failed to recognize the request</div>');
    //   }
    //   else {
    //     console.log(result);
        // TODO: check that result.deposit is not undefined

        InterCrypto.sendToOtherBlockchain(symbol, address, {value: amountToSend}, (error, result) => {
          if (error)
            updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-warning" role="alert>' + error + '</div>');
          else {
            updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>');
          }
        });


    //   }
    // })

  }
}

function checkShapeShift(symbol, address, callback) {
  // console.log('{"withdrawal":"' + address + '","pair":"eth_' + symbol + '","returnAddress":"558999ff2e0daefcb4fcded4c89e07fdf9ccb56c"}');
  // open CORS configuration so that cors.shapeshift.io can send post response message to me
  $.ajax({
    type: 'POST',
    url: 'https://cors.shapeshift.io/shift',
    crossDomain: true,
    data: '{"withdrawal":"' + address + '","pair":"eth_' + symbol + '","returnAddress":"558999ff2e0daefcb4fcded4c89e07fdf9ccb56c"}',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
      console.log("success");
      callback(null, responseData);
    },
    error: function (responseData, textStatus, errorThrown) {
      console.log("error");
      callback("error in POST request", null);
    }
  });
}

function updateElement(elementId, appendMessage) {
  var content = document.getElementById(elementId).innerHTML;
  document.getElementById(elementId).innerHTML = content + appendMessage;
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

function ic_update() {
  var blockchain_name = document.getElementById('ic_symbol').value;
  document.getElementById('ic_blockchain').innerHTML = blockchain_name;
  document.getElementById('ic_address').value = getICAddress(blockchain_name);

  ic_getInterCryptoPrice((error, result1) => {
    ic_getShapeShiftMarket( (error, result2) =>{
      ic_setMinimumCost(result1 + result2);
    })
  });
}

function demo_update() {
  var blockchain_name = document.getElementById('demo_symbol').value;
  document.getElementById('demo_blockchain').innerHTML = blockchain_name;
  document.getElementById('demo_address').value = getICAddress(blockchain_name);
}

function ic_getInterCryptoPrice(callback) {
  InterCrypto.getInterCryptoPrice((error, result) => {
    if (error)
      displayDAPPContent('<div class="alert alert-warning" role="alert">' + error + '</div>');
    else {
      var value = parseFloat(web3.fromWei(result, 'ether'));
      document.getElementById('ic_oracalize_cost').innerHTML = "+" + value.toFixed(6);
      callback(null, value);
    }
  });
}

function ic_getShapeShiftMarket(callback) {
  var symbol = getICSymbol();
  if (symbol == 0)
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    $.ajax({
      type: 'GET',
      url: 'https://cors.shapeshift.io/marketinfo/eth_' + symbol,
      crossDomain: true,
      // data: '{"some":"json"}',
      // dataType: 'json',
      success: function(responseData, textStatus, jqXHR) {
          document.getElementById('ic_shapeshift_minimum').innerHTML = '+' + responseData.minimum.toFixed(6);
          callback(null, responseData.minimum);
      },
      error: function (responseData, textStatus, errorThrown) {
          document.getElementById('ic_shapeshift_minimum').innerHTML = '<div class="alert alert-warning" role="alert" align="center">error</div>';
      }
    });
  }
}

function ic_setMinimumCost(cost) {
  document.getElementById('ic_minimum_cost').innerHTML = '=' + cost.toFixed(6);
}
