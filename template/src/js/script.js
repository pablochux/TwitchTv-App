//------------------------------
// Functions
//------------------------------
// Perform an Ajax to know if the FreeCodeCamp channel is streamiing
function getFreeCodeCampStreams() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp" + "?callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data) {
            getFreeCodeCampChannel();
        },
        error: function(data) {
            console.log(data);
        }
    });
}
// Return if the FreeCodeCamp channel is streaming or not
function getFreeCodeCampStreamStatus(data) {
    return $.isEmptyObject(data.stream);
}

function getFreeCodeCampChannel() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/channels/freecodecamp" + "?callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            var imageUrl = data.logo,
                user = data.display_name,
                userUrl = data.url,
                followers = data.followers,
                views = data.views;
            if (getFreeCodeCampStreamStatus(data)) {
                // displayStream(streamTitle, user, game, imageUrl, 1);
                displayOfflineStream(imageUrl, user, userUrl, followers, views);
            } else {
                console.log('online');
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}


function getFeaturedStreams() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/featured" + "?callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data) {
            console.log('Featured Streams');
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
            streamTitle = data.featured[i].title,
            streamUrl = data.featured[i].stream.channel.url,
            imageUrl = data.featured[i].stream.channel.logo;
        console.log(user + game);
        displayStream(streamTitle, streamUrl, user, game, imageUrl);
    }
}

// Colateral effects: print strem in .streams
function displayStream(streamTitle, streamUrl, user, game, imageUrl) {
    $('.stream-list--online').append('<div class="stream"><a href="' + streamUrl + '"><div class="profile-image"><img src="' + imageUrl + '" alt=""></div><div class="profile-info"><p class="profile-info__header-1">' + streamTitle + '</p><p class="profile-info__header-2">Game: ' + game + '</p><p class="profile-info__header-3">User: ' + user + '</p></div></a></div>');
}

function displayOfflineStream(imageUrl, user, userUrl, followers, views) {
    $('.stream-list--offline').append('<div class="stream stream--offline"><a href="' + userUrl + '"><div class="profile-image"><img src="' + imageUrl + '" alt=""></div><div class="profile-info"><p class="profile-info__header-1">' + user + '</p><p class="profile-info__header-3">Followers: ' + followers + '</p><p class="profile-info__header-3">Views: ' + views + '</p></div></a></div>');
}

//------------------------------
// Main script
//------------------------------
$(document).ready(function() {
    getFeaturedStreams();

    // Add FreeCodeCamp stream
    console.log('FreeCodeCamp');
    getFreeCodeCampStreams();
    // getFreeCodeCampChannel();

    $('.nav-tab__link').click(function() {
        $('.stream-list--online').toggle();
        $('.stream-list--offline').toggle();
        $('.nav-tab').toggleClass('nav-tab--active');
    });

    setTimeout(function() {
        $('.nav, .stream-list').removeClass('u-hide');
    }, 1000);
});
