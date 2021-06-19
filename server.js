const express = require ("express")
const app = express()
const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var apiKey = 'cd41f9199d1fafe6b40d1d2f4647b00a';

app.set('view engine','ejs')

app.get('/',function(req,res){
    //body
    res.render('index',  {weather: null, error: null})
})

app.post('/',function(req,res){
    //body
    console.log(req.body.city)
    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url,function(err,response,body){
        if(err){
            res.render('index',{weather:null,error:'Error: Please Try Again'})
        }
        else{
            var weather = JSON.parse(body)
            if(weather.main==undefined){
                res.render('index',{weather:null,error:'Error: Please Try Again'})
            }
            else{
                var weathertext = `it is ${weather.main.temp} degrees in ${weather.name}`
                res.render('index',{weather:weatherText,error:null})
            }
        }
    })
})

app.listen(3000,function(){
    console.log('app running on 3000')
})
