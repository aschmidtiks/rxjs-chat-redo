module.exports = function (roomName) {
  let chatHistory = [];

  function addEntry(entry) {
      chatHistory.push(entry);
  }

  function getChatHistory() {
      return chatHistory.slice();
  }

    function serialize() {
        return roomName
    }

  return {
      getChatHistory,
      serialize
  }
};
