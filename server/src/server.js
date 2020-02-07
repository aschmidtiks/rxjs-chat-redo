const ClientManager = require('./clientManager');
const ChatroomManager = require('./chatroomManager');
const handlers = require('./handler');

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

const server = require('http').createServer();
const io = require('socket.io').listen(server);

io.on('connection', function (client) {
    const {
        handleRegister,
        handleJoin,
        handleGetChatrooms,
        handleDisconnect,
        handleMessage

    } = handlers(client, clientManager, chatroomManager);

    console.log('Client: ' + client.id + ' connected!');

    client.on('register', handleRegister);
    client.on('join', handleJoin);
    client.on('getChatrooms', handleGetChatrooms);
    client.on('message', handleMessage);
    client.on('disconnect', function () {
        console.log('Client: ' + client.id +  ' disconnected...');
        handleDisconnect();
    });
});

server.listen(3000, function(err) {
    console.log('Listening on port: 3000');
});
