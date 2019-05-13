var topics = ["dog" , "cat" , "chinchilla"]



var searchLimit = 3;

var getGifs = function() {
  var apiKey = "YVCQv8D9tDcc1PDdVMwyO5E7KhnTiTq8";
  var searchTerm = $(this).attr("value");
  console.log(searchTerm);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + searchLimit + "&offset=0&lang=en";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });
}

// Makes buttons
var makeButtons = function() {
  console.log(topics);
  $('#buttons-display').append("This should appear and disappear too fast to see");
  // Delete the contents of buttons-view before adding new buttons
  $('#buttons-display').empty();
  // Loop through the array, then generate buttons for each entry
  for (var i = 0; i < topics.length; i++) {
    var button = $('<input type="submit"/>');
    button.attr("value" , topics[i]);
    button.on('click' , getGifs);
    $("#buttons-display").append(button);
    console.log(button.attr('value'));
  }
}



// initial call to make buttons
$(document).ready(function() {
  makeButtons();
})