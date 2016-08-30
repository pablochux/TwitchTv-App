//------------------------------
// Functions
//------------------------------
function getFreeCodeCampStreams() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp" + "?callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            console.log('STATUS');
            console.log(getFreeCodeCampStreamStatus(data));
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function getFreeCodeCampStreamStatus(data) {
    return $.isEmptyObject(data.stream);
}

function getFeaturedStreams() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/featured" + "?callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            getDataFeaturedStreams(data);
        },
        error: function(data) {
            console.log('Error');
            displaySearchError('The search could not be perfomed. </h1><h3 class="search-error__header">Please, try again in a few moments...</h3>');
        }
    });
}

// Colateral effects: print error div in .stream-list
function displaySearchError(text) {
    $('.stream-list').append('<div class="per-error u-center"><h1 class="search-error__header">' + text + '</h1></div>');
}

// Get important data from the data received
function getDataFeaturedStreams(data) {
    for (var i = 0; i < data.featured.length; i++) {
        var user = data.featured[i].stream.channel.name,
            game = data.featured[i].stream.game,
            viewers = data.featured[i].stream.viewers;
        console.log(user + game + viewers);
        displayStream(user, game, viewers);
    }
}

// Colateral effects: print strem in .streams
function displayStream(user, game, viewers) {
    $('.stream-list').append('<div class="stream-list__item"><p>User: ' + user + '</p><p>Game: ' + game + '</p><p>Viewers: ' + viewers + '</p></div>');
}

//------------------------------
// Main script
//------------------------------
$(document).ready(function() {
    // getFeaturedStreams();
    getFreeCodeCampStreams();
    $('.nav-tab__link').click(function() {
        $('.stream-list--online').toggle();
        $('.stream-list--offline').toggle();
        $('.nav-tab').toggleClass('nav-tab--active');
    });
});
