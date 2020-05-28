var DEVEX = 0.0035;
var CAD_CONVERT = 1.38;
var GBP_CONVERT = 0.81;
var CNY_CONVERT = 7.13;
var INR_CONVERT = 75.43;

var robuxElement = document.getElementById('nav-robux-amount');
var initialValue = parseInt(robuxElement.innerHTML);
var newValue;
var symbol;

//perform display based on conversion rate
chrome.storage.local.get(['currency'], function(result) {
  if (result.currency == "USD")
  {
    newValue = initialValue * DEVEX;
    symbol = "$";
  }
  else if (result.currency == "CAD")
  {
    newValue = initialValue * DEVEX * CAD_CONVERT;
    symbol = "$";
  }
  else if (result.currency == "GBP")
  {
    newValue = initialValue * DEVEX * GBP_CONVERT;
    symbol = "&#163;";
  }
  else if (result.currency == "CNY")
  {
    newValue = initialValue * DEVEX * CNY_CONVERT;
    symbol = "&#165;";
  }
  else if (result.currency == "INR")
  {
    newValue = initialValue * DEVEX * INR_CONVERT;
    symbol = "&#8377;";
  }

  Display();
});

//Display final value
function Display(){
  //round value to 2 decimals
  newValue = (Math.round(newValue * 100))/100;
  newValue = newValue.toFixed(2);

  robuxElement.innerHTML = symbol + newValue;
}

//recieve reload message
chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if (request.reload == true) {
        location.reload();
    }
    return true;
});
