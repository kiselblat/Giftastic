var topics = ["computer" , "artificial intelligence" , "internet" , "robot" , "mainframe" , "hacker" , "machine" , "calculations"];
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
  topics.push(topic);
  console.log(topic , topics);
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
    // make divs to put search results in
    var searchResult = $('<span>');
    var gif = $('<img>');
    var gifRating = $('<p>');
    // add attributes to the gif div
    gif.attr('class' , 'clickable-gif');
    gif.attr('data-moving' , results[i].images.fixed_height.url);
    gif.attr('data-still' , results[i].images.fixed_height_still.url);
    gif.attr('data-status' , 'still');
    gif.attr('src' , results[i].images.fixed_height_still.url);
    gif.on('click' , movingToggle);
    // add rating to the gifRating div
    gifRating.text("Rated: " + results[i].rating);
    // add gif anf gifRating divs to the searchResult div...
    searchResult.append(gif , gifRating);
    searchResult.addClass('search-result');
    // ...and add the search result to the site
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
    addButton($('#new-topic').val().trim());
  });
  // initial call to make buttons
  makeButtons();
})