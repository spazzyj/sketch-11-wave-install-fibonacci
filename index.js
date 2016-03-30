var com = require("serialport");
var app = require('express')();

var server = app.listen(3000);
var io = require('socket.io')(server);

var currPotentiometerData = -1;

var serialPort = new com.SerialPort("/dev/cu.usbmodem14111", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

//Serve index.html when some make a request of the server
// TODO how to generalize file serving so you dont have
// to manually list each file name
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// app.get('/sketch.js', function(req, res) {
//     res.sendFile(__dirname + '/sketch.js');
// });

// app.get('/p5_scripts/p5.js', function(req, res) {
//     res.sendFile(__dirname + '/p5_scripts/p5.js');
// });

// app.get('/p5_scripts/p5.dom.js', function(req, res) {
//     res.sendFile(__dirname + '/p5_scripts/p5.dom.js');
// });

serialPort.on('open', function() {
    console.log('Port open');
});

serialPort.on('data', function(data) {
    io.sockets.emit('potent', {
        val: data
    });
});
