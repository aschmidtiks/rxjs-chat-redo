function ensureExists(getter, rejectionMessage) {
    return new Promise((resolve, reject) => {
        const res = getter();
        return res ? resolve(res) : reject(rejectionMessage);
    });
}

function ensureValidChatroom(chatroomManager, roomName) {
    return ensureExists(
        () => chatroomManager.getChatroomByName(roomName),
        'Room not available!');
}

module.exports = function (io, client, clientManager, chatroomManager) {
    function handleRegister(userName, callback) {
        // client.data = {name, email};
        client.data = userName;
        return callback(null, 'register success');
    }

    function handleJoin(roomName, callback) {
        ensureValidChatroom(chatroomManager, roomName).then((chatroom) => {
            client.join(roomName);
            return callback(null, chatroom.getChatHistory());
        }).catch(callback);
    }

    function handleChangeRoom(roomName, callback) {
        ensureValidChatroom(chatroomManager, roomName).then((chatroom) => {
            return callback(null, chatroom.getChatHistory());
        }).catch(callback);
    }
    
    function handleGetChatrooms(callback) {
        return callback(null, chatroomManager.serializeChatrooms());
    }

    function handleMessage({roomName, message} = {}, callback) {
        let usrName = client.data;
        const entry = {usrName, message};

        ensureValidChatroom(chatroomManager, roomName).then((chatroom) => {
            chatroom.addEntry(entry);
            io.in(roomName).emit('message', entry);
            callback(null);
        }).catch(callback);
    }

    function handleDisconnect() {
    }

    return {
        handleRegister,
        handleJoin,
        handleChangeRoom,
        handleGetChatrooms,
        handleDisconnect,
        handleMessage
    };
};
