import messageConstructor from '../rendering/messageConstructor';

export default function addMsg(array, msg, chatEl) {
  let arr = array;
  const chatElement = chatEl;
  let start = arr.length - 10;
  if (start < 0) { start = 0; }
  for (let i = start; i < arr.length; i += 1) {
    const msgElement = messageConstructor(arr[i].event, arr[i].date, arr[i].message);
    chatElement.append(msgElement);
    chatElement.scrollTop = chatElement.scrollHeight - chatElement.getBoundingClientRect().height;
  }
  arr = arr.slice(0, start);
  chatElement.addEventListener('scroll', () => {
    let startScrol;
    if (chatElement.scrollTop === 0 && arr.length > 0) {
      if (arr.length > 10) { startScrol = arr.length - 10; }
      if (arr.length <= 10) { startScrol = 0; }
      for (let i = arr.length - 1; i >= startScrol; i -= 1) {
        const msgElement = messageConstructor(msg[i].event, msg[i].date, msg[i].message);
        const first = chatElement.querySelector('.chat_message');
        first.before(msgElement);
        chatElement.scrollTop = chatElement.getBoundingClientRect().height
        + chatElement.clientHeight + msgElement.getBoundingClientRect().height;
        if (startScrol === 0) {
          chatElement.scrollTop = chatElement.clientHeight
        - msgElement.getBoundingClientRect().height * 2;
        }
      } arr = arr.slice(0, startScrol);
    }
  });
}
