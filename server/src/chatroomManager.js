const Chatroom = require('./chatroom');

module.exports = function () {
    const chatrooms = new Map();
    chatrooms.set('Test Room', Chatroom('Test Room'));
    chatrooms.set('Test Room 2', Chatroom('Test Room 2'));

    function getChatrooms() {
        return chatrooms;
    }

    function serializeChatrooms() {
        return Array.from(chatrooms.values()).map(c => c.serialize());
    }

    function getChatroomByName(roomName) {
        return chatrooms.get(roomName);
        // return rooms[rooms.indexOf(roomName)];
    }

    return {
        getChatrooms,
        getChatroomByName,
        serializeChatrooms
    }
};
