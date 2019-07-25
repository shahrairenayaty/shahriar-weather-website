const request = require('request')
const gecode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hhaHJpYXJlbiIsImEiOiJjanBwZjQxaTIwM3A3NDZteHF4NHRmaDd0In0.pMPZZdensdVgl3kjJicLMw&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if (body.features.length===0){
            callback('Unabe to find location. Try another Time')
        }else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = gecode