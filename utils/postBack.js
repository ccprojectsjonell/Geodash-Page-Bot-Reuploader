const { sendMessage } = require('./sendMessage');

function handlePostback(event, pageAccessToken) {
  const senderId = event.sender.id;
  const payload = event.postback.payload;

  sendMessage(senderId, { text: `You sent a postback with payload: ${payload}` }, pageAccessToken);
}

module.exports = { handlePostback };
