var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/b7f99f28-e30e-41f7-bf01-545ffce102a0/url?iterationId=3f04b05b-399e-475b-9d36-5bff96a53b9e',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'd8715acccea74200966cfba3d0d8392a'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}