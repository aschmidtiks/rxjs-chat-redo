module.exports = function (roomName) {
  let chatHistory = [];

  function getChatHistory() {
      return chatHistory.slice();
  }

    function addEntry(entry) {
        chatHistory.push(entry);
    }

    function serialize() {
        return roomName
    }

  return {
      getChatHistory,
      addEntry,
      serialize
  }
};
