export default function createMsgElement(event) {
  const msgElement = document.createElement('div');
  msgElement.classList.add('chat_message');
  if (event === 'chat' || event === 'file') {
    msgElement.classList.add('chat_message_you');
  }
  return msgElement;
}
