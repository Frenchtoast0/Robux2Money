function save()
{
  var value = document.getElementById('currency').value;

  //save value to chrome
  chrome.runtime.sendMessage({currency:value}, function(response){
    if (response.answer == "success")
    {
      //display success alert
      $("#AlertArea").append('<div class="alert alert-success ' +
      'text-center fade show" role="alert">Changed to ' + value + '</div>');
      $(".alert").fadeOut(3500);

      //tell content page to reload value
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {reload: true}, function(response) {
        });
      });
    }
  });

}

document.getElementById('save').addEventListener('click', save); //save onclick
