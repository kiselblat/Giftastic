var topics = ["dog" , "cat" , "chinchilla"]



var searchLimit = 10;

// Makes buttons
var makeButtons = function() {
  console.log(topics);
  $('#buttons-display').append("This should appear and disappear too fast to see");
  // Delete the contents of buttons-view before adding new buttons
  $('#buttons-display').empty();
  // Loop through the array, then generate buttons for each entry
  for (var i = 0; i < topics.length; i++) {
    var button = $('<input type="submit"/>');
    button.addClass('btn btn-outline-primary topic-button');
    button.attr("value" , topics[i]);
    button.on('click' , getGifs);
    $("#buttons-display").append(button);
    console.log(button.attr('value'));
  }
}

// Adds button
var addButton = function(topic) {
  console.log(topic);
  topics.push(topic);
  console.log(topics);
  makeButtons();
}
 
// Gets gifs
var getGifs = function() {
  var apiKey = "YVCQv8D9tDcc1PDdVMwyO5E7KhnTiTq8";
  var searchTerm = $(this).attr("value");
  console.log(searchTerm);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + searchLimit + "&offset=0&lang=en";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(makeGifs);
};

// Makes gifs
var makeGifs = function(reply) {
  var results = reply.data;
  console.log(results);
  for (var i = 0; i < results.length; i++) {
    var searchResult = $('<span>');
    var gif = $('<img>');
    var gifRating = $('<p>');
    var stillImage = results[i].images.fixed_width_small_still.url;
    var movingImage = results[i].images.fixed_width_small.url;
    gif.attr('class' , 'clickable-gif');
    gif.attr('data-moving' , movingImage);
    gif.attr('data-still' , stillImage);
    gif.attr('data-rating' , results[i].rating);
    gif.attr('data-status' , 'still');
    gif.attr('src' , stillImage);
    gif.on('click' , movingToggle);
    gifRating.text(results[i].rating);
    searchResult.append(gif , gifRating);
    searchResult.addClass('search-result');
    $('#gif-display').prepend(searchResult);
  }
}

// Toggles animation
var movingToggle = function() {
    var still = $(this).attr('data-still');
    var moving = $(this).attr('data-moving');
    var status = $(this).attr('data-status');
  if (status === "still") {
    $(this).attr('src' , moving);
    $(this).attr("data-status" , "moving");
  } else if (status === "moving") {
    $(this).attr('src' , still);
    $(this).attr("data-status" , "still");
  } else {
    console.log("whoops!");
    return;
  }
}

$(document).ready(function() {

  $('#add-new-topic').click(function (event) {
    event.preventDefault();
    var newTopic = $('#new-topic').val().trim();
    addButton(newTopic);
  });

  // initial call to make buttons
  makeButtons();
})