const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const linkify = require('linkifyjs')
const async = require('async')
require('dotenv').config()

const PORT = process.env.PORT || 8080
const KEY = process.env.KEY
const SECRET = process.env.SECRET

app.use(express.static(__dirname + '/dist'), express.static(__dirname + '/assets'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/send-message', (req, res) => {

    const urls = linkify.find(req.query.message)

    async.eachSeries(urls, function (url, done) {

        axios({
            url: 'https://api-ssl.bitly.com/shorten',
            params: {
                access_token: process.env.BITLY_TOKEN,
                longUrl: url.href
            }
        }).then(function (response) {

            req.query.message = req.query.message.replace(url.value, response.data.results[url.href].shortUrl)

            done(null)

        })
            .catch(function (error) {
                console.log(error)
                done(error)
            })


    }, function (err) {
        console.log(err)

        axios({
            url: 'https://api.transmitsms.com/send-sms.json',
            withCredentials: true,
            auth: {
                username: KEY,
                password: SECRET
            },
            params: {
                to: req.query.to,
                message: req.query.message
            }
        }).then(function (response) {
            res.send(response)
            console.log(response)
        })
            .catch(function (error) {
                res.send(error)
                console.log(error)
            })
    })
})

app.listen(PORT, () => console.log('App listening on port' + PORT + '!'))