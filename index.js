var express = require('express')
var app = express()
var port = 3000

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
mongoose.Promise = global.Promise

app.set('views', __dirname + '/views/templates')
app.set('view engine', 'jade')
app.engine('jade', require('jade').__express)

app.get('/', function (req, res) {
  res.render('page')
})

app.use(express.static(__dirname + '/public'))

var io = require('socket.io').listen(app.listen(port))
console.log('Listening on port ' + port)

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' })
    socket.on('send', function (data) {
        io.sockets.emit('message', data)
    })
})