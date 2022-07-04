import createDate from './createDate';
import createMsgElement from './createMsgElement';
import createMsgText from './createMsgText';

export default function messageConstructor(event, date, text) {
  const msgElement = createMsgElement(event);
  const msgHeader = document.createElement('div');
  msgHeader.classList.add('chat_message_container');
  const msgDate = createDate(date);
  const msgText = createMsgText(text);
  const fix = document.createElement('div');
  fix.classList.add('fix');
  msgHeader.append(msgDate);
  msgHeader.append(fix);
  msgElement.append(msgHeader, msgText);
  return msgElement;
}
