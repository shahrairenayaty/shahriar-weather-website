const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/gecode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express();
const port  = process.env.PORT || 3000

const root = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(root))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'shahriar'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'shahriar'

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'shahriar'
    })

})
app.get('/weather', (req, res) => {
    const city = req.query.address
    if(!city){
        return res.send({
            error:'you must provide an address!'
        })
    }

    geocode(city,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
            
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
           res.send({location,forecastData})
          })
    
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        message: 'help article not found',
        name: 'shahriar'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        message: 'page not found',
        name: 'shahriar'
    })
})

app.listen(port, () => {
    console.log("Server is up on port "+port)
})