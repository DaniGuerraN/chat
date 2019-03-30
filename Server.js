var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fileUpload= require('express-fileupload')

app.use(fileUpload())

app.post('/upload',(req,res) => {
  let EDFile = req.files.file
  EDFile.mv(`./files/${EDFile.name}`,err => {
      if(err)  return res.status(500).send({ message : err })

       return res.status(200).send({ message : 'File upload' })
      
  })
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/index2', function(req, res){
  res.sendFile(__dirname + '/index2.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    io.on('connection', (socket) => {
      console.log('Socket connected.');
   
  });

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
  

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });
