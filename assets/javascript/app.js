var topics = ["computer" , "artificial intelligence" , "internet" , "robot" , "mainframe" , "hacker" , "machine" , "calculations" , "android" , "supercomputer" , "terminal"];
var searchLimit = 10;

// Displays array in the form of buttons
// Uses the global array topics
var displayButtons = function() {
  console.log("displayButtons(): ", topics);
  // Delete the contents of buttons-view before adding new buttons
  $('#buttons-display').empty();
  // Loop through the array, then generate buttons for each entry
  for (var i = 0; i < topics.length; i++) {
    $('#buttons-display').append(makeButton(topics[i]));
  }
}

// Makes a button
// Takes an entry from the topics array through displayButtons
// Returns a button
var makeButton = function(topic) {
  var button = $('<input type="submit"/>');
  button
    .addClass('btn btn-outline-success topic-button')
    .attr("value" , topic)
    .on('click' , getGifs);
  console.log(button.attr('value'));
  return button;
}

// Adds button
// Takes a string from the page text input
var addButton = function(topic) {
  topics.push(topic);
  console.log(topic);
  displayButtons();
}
 
// Searches GIPHY for gifs
// Then calls displayGifs() implicitly passing the search results
var getGifs = function() {
  var apiKey = "YVCQv8D9tDcc1PDdVMwyO5E7KhnTiTq8";
  var searchTerm = $(this).attr("value");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + searchLimit + "&offset=0&lang=en";
  console.log(searchTerm , queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(displayGifs);
};

// Displays gifs on the site
// Takes in the JSON object from GIPHY passed by getGifs()
var displayGifs = function(reply) {
  var results = reply.data;
  console.log(results);
  for (var i = 0; i < results.length; i++) {
    $('#gif-display').prepend(makeResult(results[i]));
  }
}

// Packages each result into a div for display
// Takes in an object from the list for GIPHY results
// Returns a dynamically created searchResult div
var makeResult = function(result) {
  // grab info from the result
  var moving = result.images.fixed_height.url;
  var still = result.images.fixed_height_still.url;
  var rating = result.rating;
  // make divs to put info in and display
  var searchResult = $('<span/>');
  var gif = $('<img>');
  var gifRating = $('<p/>');
  // add attributes and click handler to the gif div
  gif.addClass('clickable-gif')
    .attr({
      'data-moving' : moving,
      'data-still' : still,
      'data-status' : 'still',
      'src' : still
    })
    .click(movingToggle);
  // add rating to the gifRating div
  gifRating
    .text("Rated: " + rating)
    .addClass('text-success')
  // add gif and gifRating divs to the searchResult div
  searchResult
    .append(gif , gifRating)
    .addClass('search-result rounded border border-success');
  // return the search result
  return searchResult;
}

// Toggles animation
var movingToggle = function() {
  var still = $(this).attr('data-still');
  var moving = $(this).attr('data-moving');
  var status = $(this).attr('data-status');
  // if the image is still make it moving...
  if (status === "still") {
    $(this)
      .attr({
        'src' : moving,
        'data-status' : 'moving'
      });
  // ...and vice versa
  } else if (status === 'moving') {
    $(this)
      .attr({
        'src' : still,
        'data-status' : 'still'
      });
  // this should never take place but I'm paranoid
  } else {
    console.log("whoops!");
    return;
  }
}

// Wait until the page has loaded
$(document).ready(function() {
  // assign a click handler to the '+' button
  $('#add-new-topic').click(function (event) {
    // allows use of the enter key for submit
    event.preventDefault();
    // get the new topic from the text input
    var newTopic = $('#new-topic').val().trim();
    // add the new topic to buttons
    addButton(newTopic);
  });
  // initial call to make buttons
  displayButtons();
})