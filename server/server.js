require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
 
const cors = require('cors');
const app = express();
const WebSocket = require('ws');

const server = require('http').Server(app);
const Doc = require('./models/Doc');
const { v4: uuidV4 } = require('uuid');
const { PeerServer } = require('peer');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(server)
const io = require('socket.io')(server , {
    cors: {
        origin: 'http://localhost:3000',
    }
});
const { ExpressPeerServer } = require('peer');
 

/*const peerServer = ExpressPeerServer(server,
    { port: 9000, 
        key:"server",
        debug:true,
     path: "/myapp" });*/

/*peerServer?.on('connection', (client) => {
  console.log("Client connected with ID:", client.getId());
});

peerServer?.on('disconnect', (client) => {
  console.log("Client disconnected with ID:", client.getId());
});
*/
mongoose.connect('mongodb+srv://kashutosh727:XYDNtUWoBePfQ9ry@cluster0.iwkgp8w.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=> console.log('connected to mongodb'))
.catch((error) => console.error(error));
//app.use('/peerjs', peerServer)
app.get('/',(req,res)=>{
    console.log("connetcte to prt 3001")
    res.json("hello world")
})
app.get('/runcode', (req, res) => {
    var url = req.query.url;
    const headers = {
        'Content-Type': 'application/json',
        'client-secret': process.env.REACT_APP_HACKEREARTH_SECRET
    }
    fetch(url, {
        method: 'get',
        headers,
    })
        .then(res => res.json())
        .then(json => {
            res.send(json)
        }).catch((err) => {
            res.send(err)
        });
});

app.post('/runcode', (req, res) => {
    // get post data from request

    var data = req.body;

    const url = "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/";
    fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'client-secret': process.env.REACT_APP_HACKEREARTH_SECRET
        },
    })
        .then(res => res.json())
        .then(json => {
            res.send(json);
        }).catch((err) => {
            res.send(err)
        });
});

io.on('connection', (socket) =>  {
    console.log('connected');
    socket.on('get-document', async (DocId) => {
        const doc = await findOrCreateDocument(DocId);

        socket.join(DocId);


        socket.emit('load-document', doc);


        socket.on('changes', delta => {
            socket.broadcast.to(DocId).emit("receive-changes", delta);
        });

        socket.on('drawing', (data) => {
            console.log(data);
            socket.broadcast.emit('drawing', data)
        });

        socket.on('save-document', async (data) => {
            console.log(data);
            Doc.findByIdAndUpdate({'_id': DocId}, { 'html': data.html, 'css': data.css, 'js': data.js, 'python': data.python, 'cpp': data.cpp, 'java': data.java }).then((d) => {
               // console.log(d);
            })  
            .catch(err => { 
                console.error(err);
            })
        })
    });


    socket.on('join-room', (roomId, userId, userName)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId, userName)

        socket.on('toggled', (userId, video, audio) => {
            console.log(userId, video, audio);
            socket.to(roomId).emit('received-toggled-events', userId, video, audio);
        });

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        });
    });
    console.log("connected");
});



var findOrCreateDocument = async (id) => {
    if(id === null){
        return;
    }
    const document = await Doc.findById(id);
    if(document) return document;
    return await Doc.create({_id: id, html:"",css:"",js:"",python:"",java:"",cpp:""}); 
};

server.listen(3001, () => {console.log('3001');})