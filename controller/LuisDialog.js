var builder = require('botbuilder');
var food = require("./FavouriteFoods")
// Some sections have been omitted
var isAttachment = false;

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3dfb8d4a-f3db-4015-947b-5597919f44cf?subscription-key=aa05016f1418469c9f6bc6edbedd4496&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function (session, args) {
        
        session.send("Get Calories intent found")    
    }).triggerAction({
        matches: 'GetCalories'
    });

    bot.dialog('DeleteFavourite', function (session, args) {
        
        session.send("Delete Favourite intent found")
    }).triggerAction({
        matches: 'DeleteFavourite'
    });

    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {


            if (results.response) {
                    session.conversationData["username"] = results.response;
            }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }

    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    bot.dialog('LookForFavourite', function (session, args) {
        
        session.send("Look for favourite intent found")
    }).triggerAction({
        matches: 'LookForFavourite'
    });

    bot.dialog('WantFood', function (session, args) {
        
        session.send("Want food intent found")
    }).triggerAction({
        matches: 'WantFood'
    });

    bot.dialog('WelcomeIntent', function (session, args) {
        
        session.send("Welcome intent found")
    }).triggerAction({
        matches: 'WelcomeIntent'
    });

}