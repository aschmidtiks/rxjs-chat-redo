const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const ClientManager = require('./clientManager');
const ChatroomManager = require('./chatroomManager');
const makeHandlers = require('./handlers');

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

io.on('connection', function (client) {
    const {
        handleRegister,
        handleJoin,
        handleLeave,
        handleMessage,
        handleGetChatrooms,
        handleGetAvailableUsers,
        handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager);
    console.log('client connected...', client.id);
    clientManager.addClient(client);

    client.on('register', handleRegister);

    client.on('join', handleJoin);

    client.on('leave', handleLeave);

    client.on('message', handleMessage);

    client.on('chatrooms', handleGetChatrooms);

    client.on('availableUsers', handleGetAvailableUsers);

    client.on('disconnect', function () {
        console.log('client disconnected...', client.id);
        handleDisconnect();
    });

    client.on('error', function (err) {
        console.log('received error from client:', client.id);
        console.log(err);
    });
})

server.listen(3000, function (err) {
    if (err) throw err;
    console.log('listening on port 3000');
})
