const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"update_oracalize","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"sendToOtherBlockchain","outputs":[{"name":"transactionID","type":"uint256"}],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"}],"name":"TransactionStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"depositAddress","type":"address"}],"name":"TransactionSentToShapeShift","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionID","type":"uint256"},{"indexed":false,"name":"reason","type":"string"}],"name":"TransactionAborted","type":"event"}]');
const rinkeby_address = '0xc58bf02df60d0fa02901cabfd1efa72de155c827';
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
    try {
      web3.version.getNetwork((error, result) => {
        networkId = result;

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
            displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">You are not connected to a supported blockchain</div>');
            break;
        }

        if (networkId > 0) {
          myContract = web3.eth.contract(contractABI);
          InterCrypto = myContract.at(contractAddress);
          // TODO: Check that InterCrypto is defined, else show message

          ic_updateCost();

          document.getElementById('ic_etherscan_a').href = etherscan_url + 'address/' + contractAddress;
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
    case 'Ethereum Classic':
      return 'etc';
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
    document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-success" role="alert">InterCrypto.sendToOtherBlockchain("' + symbol + '", "' + address + '", {value: ' + amountToSend + '})</div>';

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
            document.getElementById('ic_sendToOtherBlockchain_response').innerHTML = '<div class="alert alert-warning" role="alert>' + error + '</div>';
          else {
            var appendMessage = '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>';
            updateElement('ic_sendToOtherBlockchain_response', appendMessage);

            // Start watching for events and display a message when they appear
            var eventTransactionStarted = InterCrypto.TransactionStarted();
            // Check that transaction was not aborted before started
            var eventTransactionAborted = InterCrypto.TransactionAborted();

            eventTransactionAborted.watch( (error, result) => {
              if (!error) {
                transactionIDresult = result.args.transactionID;
                updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-danger" role="alert">TransactionAborted(transactionID: ' + result.args.transactionID + ', reason: ' + result.args.reason + ')</div>');
                eventTransactionStarted.stopWatching();
                eventTransactionAborted.stopWatching();
              }
            })

            eventTransactionStarted.watch((error, result) => {
              if (!error) {
                transactionIDresult = result.args.transactionID;
                updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-info" role="alert">TransactionStarted(transactionID: ' + transactionIDresult + ')</div>');
                eventTransactionStarted.stopWatching();

                // Start watching for abort or send events
                var eventTransactionSentToShapeShift = InterCrypto.TransactionSentToShapeShift({transactionID: transactionIDresult});
                var eventTransactionAborted = InterCrypto.TransactionAborted({transactionID: transactionIDresult});
                eventTransactionSentToShapeShift.watch((error, result) => {
                  if (!error) {
                    updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-success" role="alert">TransactionSentToShapeShift(transactionID: ' + result.args.transactionID + ', depositAddress: ' + result.args.depositAddress + ')</div>');
                    eventTransactionSentToShapeShift.stopWatching();
                  }
                });
                eventTransactionAborted.watch((error, result) => {
                  if (!error) {
                    updateElement('ic_sendToOtherBlockchain_response', '<div class="alert alert-danger" role="alert">TransactionAborted(transactionID: ' + result.args.transactionID + ', reason: ' + result.args.reason + ')</div>');
                    eventTransactionAborted.stopWatching();
                  }
                });
              }
            });
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

function ic_updateCost() {
  var blockchain_name = document.getElementById('ic_symbol').value;
  document.getElementById('ic_blockchain').innerHTML = blockchain_name;
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
