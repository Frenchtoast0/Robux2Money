//conversion values
var DEVEX = 0.0035;
var CAD_CONVERT = 1.38;
var GBP_CONVERT = 0.81;
var CNY_CONVERT = 7.13;
var INR_CONVERT = 75.43;

var robuxElement;
var initialValue;
var newValue;
var symbol;

//run script when window loads
window.addEventListener("load", function(){

  //get value from webpage
  robuxElement = document.getElementById('nav-robux-amount');
  robuxValue = robuxElement.innerHTML;

  if (robuxValue.includes("K+")){
    robuxValue.replace("K+",",000,000");
  }
  else if (robuxValue.includes("M+")){
    robuxValue.replace("M+",",000,000,000");
  }

  initialValue = parseInt(robuxValue);

  //perform display based on conversion rate
  chrome.storage.local.get(['currency'], function(result) {
    if (result.currency == "USD")
    {
      newValue = initialValue * DEVEX;
      symbol = "$";
      Display();
    }
    else if (result.currency == "CAD")
    {
      newValue = initialValue * DEVEX * CAD_CONVERT;
      symbol = "$";
      Display();
    }
    else if (result.currency == "GBP")
    {
      newValue = initialValue * DEVEX * GBP_CONVERT;
      symbol = "&#163;";
      Display();
    }
    else if (result.currency == "CNY")
    {
      newValue = initialValue * DEVEX * CNY_CONVERT;
      symbol = "&#165;";
      Display();
    }
    else if (result.currency == "INR")
    {
      newValue = initialValue * DEVEX * INR_CONVERT;
      symbol = "&#8377;";
      Display();
    }
    //if it reaches here, no currency is saved
    //and the original robux value will stay

  });

})

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
