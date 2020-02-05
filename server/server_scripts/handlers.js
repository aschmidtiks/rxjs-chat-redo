function makeHandleEvents(client, clientManager, chatroomManager) {

    function ensureExists(getter, rejectionMessage) {
        return new Promise(function (resolve, reject) {
            const res = getter();
            return res ? resolve(res) : reject(rejectionMessage);
        })
    }

    function ensureUserIsSelected(clientId) {
        return ensureExists(
            () => clientManager.getUserByClientId(clientId),
            'select user first');
    }

    function ensureValidChatroom(chatroomName) {
        return ensureExists(
            () => chatroomManager.getChatroomByName(chatroomName),
            `invalid chatroom name: ${chatroomName}`
        )
    }

    function ensureValidChatroomAndUserSelected(chatroomName) {
        return Promise.all([
            ensureValidChatroom(chatroomName),
            ensureUserIsSelected(client.id)
        ]).then(([chatroom, user]) => Promise.resolve({chatroom, user}));
    }

    //todo check if user is already in room
    function handleEvent(chatroomName, createEntry) {
        return ensureValidChatroomAndUserSelected(chatroomName)
            .then(function ({chatroom, user}) {
                const entry = {user, ...createEntry()};
                chatroom.addEntry(entry);
                chatroom.broadcastMessage({chat: chatroomName, ...entry});
                return chatroom;
            });
    }
    return handleEvent;
}

module.exports = function (client, clientManager, chatroomManager) {
    const handleEvent = makeHandleEvents(client, clientManager, chatroomManager);

    function handleRegister(userName, callback) {
        if (!clientManager.isUserAvailable(userName)) {
            return callback('user is not available');
        }

        const user = clientManager.getUserByName(userName);
        clientManager.registerClient(client, user);

        return callback(null, user);
    }

    function handleJoin(chatroomName, callback) {
        const createEntry = () => ({event: `joined ${chatroomName}`});
        handleEvent(chatroomName, createEntry)
            .then(function (chatroom) {
                chatroom.addUser(client);
                callback(null, chatroom.getChatHistory())
            })
            .catch(callback);
    }

    function handleChangeRoom(chatroomName, callback) {
        const createEntry = () => ({event: `rejoined ${chatroomName}`});
        handleEvent(chatroomName, createEntry)
            .then(function (chatroom) {
                callback(null, chatroom.getChatHistory())
            })
            .catch(callback);
    }

    function handleLeave(chatroomName, callback) {
        const createEntry = () => ({event: `left ${chatroomName}`});

        handleEvent(chatroomName, createEntry)
            .then(function (chatroom) {
                // remove member from chatroom
                chatroom.removeUser(client.id);
                callback(null);
            })
            .catch(callback);
    }

    function handleMessage({chatroomName, message} = {}, callback) {
        const createEntry = () => ({message})
        handleEvent(chatroomName, createEntry)
            .then(() => {callback(null)})
            .catch(callback)
    }

    function handleGetChatrooms(_, callback) {
        return callback(null, chatroomManager.serializeChatrooms())
    }

    function handleGetAvailableUsers(_, callback) {
        return callback(null, clientManager.getAvailableUsers())
    }

    function handleDisconnect() {
        // remove user profile
        clientManager.removeClient(client)
        // remove member from all chatrooms
        chatroomManager.removeClient(client)
    }

    return {
        handleRegister,
        handleJoin,
        handleChangeRoom,
        handleLeave,
        handleMessage,
        handleGetChatrooms,
        handleGetAvailableUsers,
        handleDisconnect
    }
}
