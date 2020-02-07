const Chatroom = require('./chatroom');

module.exports = function () {
    const chatrooms = new Map();
    chatrooms.set('Test Room', Chatroom('Test Room'));

    function getChatrooms() {
        return chatrooms;
        // return rooms;
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
