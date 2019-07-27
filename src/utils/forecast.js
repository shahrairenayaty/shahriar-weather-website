const request = require('request');

const forecast = (lat,longt,callback)=>{
    var url = 'https://api.darksky.net/forecast/02717d83065415699dfb6567a422a7ba/'+lat+','+longt+'?units=si'
    request({
        url,
        json:true
    },(error,{body})=>{
        //console.log(respose.body.currently)
        if(error){
          callback('Unable to connect to weather service!',undefined) 
        }else if (body.error){
            callback('Unable to find location',undefined)
        }else {
            console.log(body.daily.data[0])
            const currently = body.currently;
            callback(undefined,body.daily.data[0].summary +" It is currently "+currently.temperature+" degrees out. With temperature high "+ body.daily.data[0].temperatureHigh+". There is a "+currently.precipProbability+"% chance of rain.")
        }
        
    })
}

module.exports = forecast