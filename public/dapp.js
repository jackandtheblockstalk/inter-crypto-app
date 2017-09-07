const ic_contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"},{"name":"_returnAddress","type":"address"}],"name":"convert2","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"conversions","outputs":[{"name":"returnAddress","type":"address"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"convert1","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"oraclize","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"update_oraclize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recoverable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"conversionID","type":"uint256"}],"name":"cancelConversion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oraclize_gaslimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"recover","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newLimit","type":"uint256"}],"name":"setGasLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"conversionID","type":"uint256"}],"name":"ConversionStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"conversionID","type":"uint256"},{"indexed":true,"name":"returnAddress","type":"address"},{"indexed":true,"name":"depositAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"ConversionSentToShapeShift","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"conversionID","type":"uint256"},{"indexed":false,"name":"reason","type":"string"}],"name":"ConversionAborted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"recoveredTo","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Recovered","type":"event"}]');
const demo_contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"ENSresolverNode","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"intercrypto_getInterCryptoPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_coinSymbol","type":"string"},{"name":"_toAddress","type":"string"}],"name":"withdrawalInterCrypto","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"updateInterCrypto","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"conversionID","type":"uint256"}],"name":"intercrypto_cancelConversion","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawalNormal","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"interCrypto","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"intercrypto_recoverable","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"abstractENS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"funds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newNodeName","type":"bytes32"}],"name":"updateENSnode","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"intercrypto_recover","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"deposit","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"withdrawal","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"WithdrawalNormal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"conversionID","type":"uint256"}],"name":"WithdrawalInterCrypto","type":"event"}]');
const ens_contractABI = JSON.parse('[{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"label","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setSubnodeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"ttl","type":"uint64"}],"name":"setTTL","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"ttl","outputs":[{"name":"","type":"uint64"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"ttl","type":"uint64"}],"name":"NewTTL","type":"event"}]');
const resolver_contractABI = JSON.parse('[{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"setText","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentTypes","type":"uint256"}],"name":"ABI","outputs":[{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"name":"setPubkey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"content","outputs":[{"name":"ret","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"addr","outputs":[{"name":"ret","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"}],"name":"text","outputs":[{"name":"ret","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"name":"setABI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"name","outputs":[{"name":"ret","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes32"}],"name":"setContent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"pubkey","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"addr","type":"address"}],"name":"setAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"ensAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"a","type":"address"}],"name":"AddrChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes32"}],"name":"ContentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"contentType","type":"uint256"}],"name":"ABIChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"y","type":"bytes32"}],"name":"PubkeyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"indexedKey","type":"string"},{"indexed":false,"name":"key","type":"string"}],"name":"TextChanged","type":"event"}]');

// MAKE SURE THAT ABIs are maintained updated
const rinkeby_etherscan = 'https://rinkeby.etherscan.io/';
const ropsten_etherscan = 'https://ropsten.etherscan.io/';
const mainnet_etherscan = 'https://etherscan.io/';
const rinkeby_ens_address = '0xe7410170f87102df0055eb195163a03b7f2bff4a';
const ropsten_ens_address = '0x112234455c3a32fd11230c42e7bccd4a84e02010';
const mainnet_ens_address = '0x314159265dD8dbb310642f98f50C066173C1259b';
const rinkeby_ens_node_name = 'jackdomain.test';
const mainnet_ens_node_name = 'jacksplace.eth';
const intercrypto_label = 'intercrypto';
const wallet_label = 'wallet';

var jacksAddress;
var networkId;
var ic_contractAddress;
var demo_contractAddress;
var ens_address;
var ens_node_name;
var ic_ens_node;
var demo_ens_node;
var etherscan_url;
var ic_myContract;
var demo_myContract;
var ens_myContract;
var resolver_myContract;
var InterCrypto;
var InterCrypto_Demo;
var ens;
var resolver;
var coins = new Map();

// MetaMask injects the web3 library for us.
window.onload = function() {
  if (typeof web3 === 'undefined') {
    displayDAPPContent('<div class="alert alert-warning" role="alert" align="center">You need <a href="https://metamask.io/">MetaMask</a> browser plugin or the <a href="https://github.com/ethereum/mist/releases/t">Mist</a> browser to interact with this Ethereum smart contract.</div>');
  }
  else {
    try {
      web3.version.getNetwork((error, result) => {
        networkId = result;

        switch (networkId) {
          case '1': // Mainnet
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to the Ethereum blockchain</div>';
            etherscan_url = mainnet_etherscan;
            ens_address = mainnet_ens_address;
            ens_node_name = mainnet_ens_node_name;
            break;
          case '3': // Ropsten
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to the Ropsten testnet</div><div class="alert alert-danger" role="alert">The final function of the InterCrypto smart contract will only work if using the Ethereum mainnet as ShapeShift does not support Ethereum testnets</div>';
            etherscan_url = ropsten_etherscan;
            ens_address = ropsten_ens_address;
            ens_node_name = rinkeby_ens_node_name;
            break;
          case '4': // Rinkeby
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-success" role="alert">You are connected to the Rinkeby testnet</div><div class="alert alert-danger" role="alert">The final function of the InterCrypto smart contract will only work if using the Ethereum mainnet as ShapeShift does not support Ethereum testnets</div>';
            etherscan_url = rinkeby_etherscan;
            ens_address = rinkeby_ens_address;
            ens_node_name = rinkeby_ens_node_name;
            break;
          default:
            document.getElementById('top-messages').innerHTML = '<div class="alert alert-warning" role="alert">You are not connected to a supported blockchain</div>';
            displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">You are not connected to a supported blockchain</div>');
            break;
        }

        ic_ens_node = namehash(intercrypto_label + '.' + ens_node_name);
        demo_ens_node = namehash(wallet_label + '.' + intercrypto_label + '.' + ens_node_name);

        if (networkId > 0) {
          ens_myContract = web3.eth.contract(ens_contractABI);
          ens = ens_myContract.at(ens_address);

          ens.resolver(namehash(ens_node_name), (error, result) => {
            if (error) {
              displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">ENS Public Resolver could not be found</div>');
            }
            else {
              resolver_myContract = web3.eth.contract(resolver_contractABI);
              resolver = resolver_myContract.at(result);

              resolver.addr(namehash(ens_node_name), (error, result) => {
                if (error) {
                  displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">My address could not be resolved from ENS</div>');
                }
                else {
                  jacksAddress = result;
                  updateElement('jacks_address', jacksAddress + '<br>ENS: "' + ens_node_name + '"');
                }
              })

              resolver.addr(ic_ens_node, (error, result) => {
                if (error || result == '0x0000000000000000000000000000000000000000') {
                  displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">InterCrypto address could not be resolved from ENS</div>');
                  console.log('error: ' + error);
                }
                else {
                  ic_contractAddress = result;
                  resolver.addr(demo_ens_node, (error, result) => {
                    if (error || result == '0x0000000000000000000000000000000000000000') {
                      displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">InterCrypto_Wallet address could not be resolved from ENS</div>');
                      console.log('error: ' + error);
                    }
                    else {
                      demo_contractAddress = result;
                      ic_myContract = web3.eth.contract(ic_contractABI);
                      InterCrypto = ic_myContract.at(ic_contractAddress);

                      demo_myContract = web3.eth.contract(demo_contractABI);
                      InterCrypto_Demo = demo_myContract.at(demo_contractAddress);

                      ic_update();

                      document.getElementById('ic_etherscan_a').href = etherscan_url + 'address/' + ic_contractAddress;
                      document.getElementById('demo_etherscan_a').href = etherscan_url + 'address/' + demo_contractAddress;

                      // Start watching contracts
                      InterCrypto.ConversionStarted((error, result) => {
                        if (!error) {
                          conversionIDresult = result.args.conversionID;
                          updateElement('ic_convert_response', '<div class="alert alert-info" role="alert">ConversionStarted(conversionID: ' + conversionIDresult + ')</div>');
                        }
                      });
                      InterCrypto.ConversionAborted((error, result) => {
                        if (!error) {
                          conversionIDresult = result.args.conversionID;
                          updateElement('ic_convert_response', '<div class="alert alert-danger" role="alert">ConversionAborted(conversionID: ' + conversionIDresult + ', reason: ' + result.args.reason + ')</div>');
                        }
                      });
                      InterCrypto.ConversionSentToShapeShift((error, result) => {
                        if (!error) {
                          conversionIDresult = result.args.conversionID;
                          updateElement('ic_convert_response', '<div class="alert alert-success" role="alert">ConversionSentToShapeShift(conversionID: ' + conversionIDresult + ', returnAddress: <a href="'+etherscan_url+'address/'+result.args.returnAddress+'">' + result.args.returnAddress + '</a>, depositAddress: <a href="'+etherscan_url+'address/'+result.args.depositAddress+'">' + result.args.depositAddress + '</a>, amount: ' + result.args.amount + ')</div>');
                        }
                      });
                      InterCrypto.Recovered((error, result) => {
                        if (!error) {
                          conversionIDresult = result.args.conversionID;
                          updateElement('ic_convert_response', '<div class="alert alert-success" role="alert">Recovered(recoveredTo: ' + result.args.recoveredTo + ', amount: ' + result.args.amount + ')</div>');
                        }
                      });
                      InterCrypto_Demo.Deposit( (error, result) => {
                        if (!error) {
                          updateElement('demo_deposit_response', '<div class="alert alert-success" role="alert">Deposit(deposit: ' + result.args.deposit + ', amount: ' + result.args.amount + ')</div>');
                        }
                      });
                      InterCrypto_Demo.WithdrawalNormal( (error, result) => {
                        if (!error) {
                          updateElement('demo_withdrawal_response', '<div class="alert alert-success" role="alert">WithdrawalNormal(withdrawal: ' + result.args.withdrawal + ', amount: ' + result.args.amount + ')</div>');
                        }
                      });
                      InterCrypto_Demo.WithdrawalInterCrypto( (error, result) => {
                        if (!error) {
                          conversionIDresult = result.args.conversionID;
                          updateElement('demo_withdrawal_response', '<div class="alert alert-success" role="alert">WithdrawalInterCrypto(conversionID: ' + conversionIDresult + ')</div>');
                        }
                      });

                      $.ajax({
                        type: 'GET',
                        url: 'https://cors.shapeshift.io/getcoins',
                        crossDomain: true,
                        // data: '{"withdrawal":"DMAFvwTH2upni7eTau8au6Rktgm2bUkMei","pair":"eth_doge","returnAddress":"558999ff2e0daefcb4fcded4c89e07fdf9ccb56c"}',
                        // dataType: 'json',
                        success: function(responseData, textStatus, jqXHR) {
                          for (var key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                              if (responseData[key].status == "available" && responseData[key].name != "Ether") {
                                  coins[responseData[key].name] = {
                                    name: responseData[key].name,
                                    symbol: responseData[key].symbol.toLowerCase(),
                                    image: responseData[key].imageSmall,
                                  }
                              }
                            }
                          }
                          // TODO: update selection lists
                          // TODO: link selection lists to coin symbols
                          var coinString = "";
                          for (var key in coins) {
                            if (coins.hasOwnProperty(key)) {
                              if (coins[key].symbol == "zec") {
                                coinString = coinString + ', <a onclick="phrase_cookie()"><img src="' + coins[key].image + '"></a>' + coins[key].name + ' "' + coins[key].symbol + '"';
                              }
                              else {
                                  coinString = coinString + ', <img src="' + coins[key].image + '">' + coins[key].name + ' "' + coins[key].symbol + '"';
                              }

                            }
                          }
                          coinString = coinString.substring(2, coinString.length);
                          updateElement('supported_coins', coinString);
                          // console.log(Object.keys(responseData).length);
                          // console.log(Object.keys(coins).length);
                        },
                        error: function (responseData, textStatus, errorThrown) {
                          updateElement('supported_coins', '<div class="alert alert-warning" role="alert" align="center">Could not fech supported coins from ShapeShift</div>');
                        }
                      });
                    }
                  })
                }
              })

            }
          })

        }
      })
    }
    catch(error) {
      displayDAPPContent('<div class="alert alert-danger" role="alert" align="center">' + error + '</div>');
    }
  }
}

function phrase_cookie() {
  updateElement('phrase_cookie', '<div class="alert alert-success" role="alert" align="center">attend double three dinner feed unusual scissors move fluid bid ensure assault</div>')
}

// Copied from https://github.com/ethereum/ens/blob/master/ensutils.js
function namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

function getICSymbol(ic_symbol) {
  switch (ic_symbol) {
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
      return '14u51XrAu3YC22T95GztxXftoKBN8QGVBA';
    case 'Litecoin':
      return 'LMSBKhGtswagcq8PCuJDzUqmx3JQcv6B9R';
    case 'Dash':
      return 'XppHCdeA7gzkdMvX1qcf9nw1ut5U9FyGx7';
    case 'ZCash':
      return 't1N7tf1xRxz5cBK51JADijLDWS592FPJtya';
    case 'Dogecoin':
      return 'D9Y8BBkJQkjY6cSXek2ZzbxEZcpyo5rW9f';
    default:
      return 0;
  }
}

function updateElement(elementId, appendMessage) {
  var content = document.getElementById(elementId).innerHTML;
  document.getElementById(elementId).innerHTML = appendMessage + content;
}

function donate_send() {
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: jacksAddress,
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
  document.getElementById('jack-donate').innerHTML = content;
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

function ic_getInterCryptoPrice(callback) {
  InterCrypto.getInterCryptoPrice((error, result) => {
    if (error)
      displayDAPPContent('<div class="alert alert-warning" role="alert">' + error + '</div>');
    else {
      var value = parseFloat(web3.fromWei(result, 'ether'));
      document.getElementById('ic_oraclize_cost').innerHTML = "+" + value.toFixed(6);
      callback(null, value);
    }
  });
}

function ic_getShapeShiftMarket(callback) {
  var symbol = getICSymbol(document.getElementById('ic_symbol').value);
  if (symbol == 0)
    document.getElementById('ic_convert_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    $.ajax({
      type: 'GET',
      url: 'https://cors.shapeshift.io/marketinfo/eth_' + symbol,
      crossDomain: true,
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

function ic_convert() {
  var amountToSend = web3.toWei(document.getElementById("ic_amount").value, 'ether')
  var symbol = getICSymbol(document.getElementById('ic_symbol').value);
  if (symbol == 0)
    document.getElementById('ic_convert_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    // symbol += "xxxxx"; // useme to trip up the input and show desired error warnings
    var address = document.getElementById("ic_address").value
    $.ajax({
      type: 'GET',
      url: 'https://cors.shapeshift.io/validateAddress/' + address + '/' + symbol,
      crossDomain: true,
      // data: '{"withdrawal":"DMAFvwTH2upni7eTau8au6Rktgm2bUkMei","pair":"eth_doge","returnAddress":"558999ff2e0daefcb4fcded4c89e07fdf9ccb56c"}',
      // dataType: 'json',
      success: function(responseData, textStatus, jqXHR) {
          if (responseData.isvalid) {
            updateElement('ic_convert_response', '<div class="alert alert-success" role="alert">Address and symbol are valid for use by ShapeShift</div>');
            updateElement('ic_convert_response', '<div class="alert alert-success" role="alert">InterCrypto.convert1("' + symbol + '", "' + address + '", {value: ' + amountToSend + '})</div>');

            InterCrypto.convert1(symbol, address, {value: amountToSend}, (error, result) => {
              if (error)
                updateElement('ic_convert_response', '<div class="alert alert-warning" role="alert">' + error + '</div>');
              else {
                updateElement('ic_convert_response', '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>');
              }
            });
          }
          else {
            updateElement('ic_convert_response', '<div class="alert alert-danger" role="alert">Address and symbol are NOT currently valid for use by ShapeShift</div>');
          }
      },
      error: function (responseData, textStatus, errorThrown) {
        console.log("error: " + errorThrown);
        updateElement('ic_convert_response', '<div class="alert alert-danger" role="alert>Could not verify address and smbol with ShapeShift</div>');
      }
    });
  }
}

function demo_update() {
  var blockchain_name = document.getElementById('demo_symbol').value;
  document.getElementById('demo_blockchain').innerHTML = blockchain_name;
  document.getElementById('demo_address').value = getICAddress(blockchain_name);
}

function demo_deposit() {
  InterCrypto_Demo.deposit({
    from: web3.eth.coinbase,
    value: web3.toWei(document.getElementById("demo_amount").value, 'ether')
  }, function(error, result) {
    if (!error) {
      updateElement('demo_deposit_response', '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>');
      // document.getElementById('demo_deposit_response').innerHTML = '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>'
    } else {
      updateElement('demo_deposit_response', '<div class="alert alert-warning" role="alert">' + error + '</div>');
    }
  })
}

function demo_withdrawal() {
  var symbol = getICSymbol(document.getElementById('demo_symbol').value);
  if (symbol == 0)
    document.getElementById('demo_withdrawal_response').innerHTML = '<div class="alert alert-warning" role="alert>Currency symbol not found</div>';
  else {
    // symbol += "xxxxx"; // useme to trip up the input and show desired error warnings
    var address = document.getElementById("demo_address").value;

    updateElement('demo_withdrawal_response', '<div class="alert alert-warning" role="alert">Address and symbol are not validated, this is so that the recovery features of InterCrypto can be exhibited. Please use the InterCrypto smart contract interface above which will validate addresses before submitting a conversion</div>');
    // $.ajax({
    //   type: 'GET',
    //   url: 'https://cors.shapeshift.io/validateAddress/' + address + '/' + symbol,
    //   crossDomain: true,
    //   // data: '{"withdrawal":"DMAFvwTH2upni7eTau8au6Rktgm2bUkMei","pair":"eth_doge","returnAddress":"558999ff2e0daefcb4fcded4c89e07fdf9ccb56c"}',
    //   // dataType: 'json',
    //   success: function(responseData, textStatus, jqXHR) {
    //       if (responseData.isvalid) {
    //         updateElement('demo_withdrawal_response', '<div class="alert alert-success" role="alert">Address and symbol are valid for use by ShapeShift</div>');

            InterCrypto_Demo.withdrawalInterCrypto(symbol, address, {from: web3.eth.coinbase}, (error, result) => {
              if (error)
                updateElement('demo_withdrawal_response', '<div class="alert alert-warning" role="alert>' + error + '</div>');
              else {
                updateElement('demo_withdrawal_response', '<div class="alert alert-success" role="alert">Tx: <a href="' + etherscan_url + 'tx/' + result + '">' + result + '</a></div>');
              }
            });
    //       }
    //       else {
    //         updateElement('demo_withdrawal_response', '<div class="alert alert-danger" role="alert">Address and symbol are NOT currently valid for use by ShapeShift</div>');
    //       }
    //   },
    //   error: function (responseData, textStatus, errorThrown) {
    //     console.log("error: " + errorThrown);
    //     updateElement('ic_convert_response', '<div class="alert alert-danger" role="alert>Could not verify address and smbol with ShapeShift</div>');
    //   }
    // });

  }
}
