var topics = ["dog" , "cat" , "chinchilla"]

var searchTerm = "dog";
var searchLimit = 3;
var apiKey = "YVCQv8D9tDcc1PDdVMwyO5E7KhnTiTq8";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + searchLimit + "&offset=0&lang=en";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function(response) {
  console.log(response);
});

// Makes buttons
function makeButtons() {
  console.log(topics);
  $('#buttons-display').append("This should appear and disappear too fast to see");
  // Delete the contents of buttons-view before adding new buttons
  $('#buttons-display').empty();
  // Loop through the array, then generate buttons for each entry
  for (var i = 0; i < topics.length; i++) {
    var button = $('<input type="submit"/>');
    button.attr("value" , topics[i]);
    $("#buttons-display").append(button);
    console.log(button.attr('value'));
  }
}

$(document).ready(function() {
  
  makeButtons();
})