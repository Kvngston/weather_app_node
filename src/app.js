const express = require('express')
const path = require('path')
const utils = require('./utils/geocode')

const app = express();

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../views')
const publicPath = path.join(__dirname,'../public')
console.log(publicPath)

app.set('view engine','hbs')

app.use(express.static(publicPath));

app.set('views', viewsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Using handle bars',
        name: 'Tochukwu'
    })
})

app.get('/help', (req,res) => {
    res.send('Help page')
})

app.get('/about', (req,res) => {
    res.send('About page')
})

app.get('/weather', (req,res) => {
    if (req.query.address){
        utils.geocode(req.query.address, async (error, {longitude,latitude} = {})=>{
            if (error){
                return res.send({
                    code: '01',
                    message: error.toString()
                })
            }else {
                await utils.forecast(longitude, latitude, async (error, {temp,humidity,name,description}) => {
                    if (error) {
                        return res.send({
                            code: '01',
                            message: error
                        })
                    } else {
                        return res.send({
                            temp,
                            humidity,
                            name,
                            description
                        })
                    }
                });
            }
        })
    }else{
        return res.send({
            code: '01',
            message: 'Bad Request'
        })
    }

})

app.listen(port, ()=>{
    console.log('App Started on port '+port);
})