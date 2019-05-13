var topics = ["dog" , "cat" , "chinchilla"]

var searchTerm = "dog";
var searchLimit = 5;
var apiKey = "YVCQv8D9tDcc1PDdVMwyO5E7KhnTiTq8";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + searchLimit + "&offset=0&lang=en";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function(response) {
  console.log(response);
});