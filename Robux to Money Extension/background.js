//recieve save message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.currency) {
      //save currency value to "currency" key
      chrome.storage.local.set({"currency": request.currency}, function() {
        sendResponse({answer: "success"});
      });
    }
    else {
      sendResponse({answer: "error"});
    }
    return true;
  });
