module.exports = function (client, clientManager, chatroomManager) {
    function handleRegister(userName, callback) {
        // client.data = {name, email};
        client.data = userName;
        return callback(null, 'register success');
    }

    function handleJoin(roomName, callback) {
        if (chatroomManager.serializeChatrooms().some(r => r === roomName)) {
            client.join(roomName);
        } else {
            const err = 'Room not available!';
            return callback(err, null);
        }
        let room = chatroomManager.getChatroomByName(roomName);
        return callback(null, room.getChatHistory());
    }

    function handleGetChatrooms(callback) {
        return callback(null, chatroomManager.serializeChatrooms());
    }

    function handleMessage(data = {roomName, message}, callback) {
        let usrName = client.data;
        let msg = data.message;
        const entry = {usrName, msg};
        console.log(entry);
        console.log('NAME ' + data.roomName + ' other name ' + chatroomManager.getChatroomByName(data.roomName));

        // chatroomManager.getChatroomByName(roomName).addEntry(entry);
        // client.to(roomName).emit('message', entry);
    }

    function handleDisconnect() {
    }

    return {
        handleRegister,
        handleJoin,
        handleGetChatrooms,
        handleMessage,
        handleDisconnect
    };
};
