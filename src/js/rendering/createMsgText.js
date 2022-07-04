import isValidHttpUrl from '../valid/isValidHttpUrl';
import isValidDataUrl from '../valid/isValidDataUrl';
import isValidAudioUrl from '../valid/isValidAudioUrl';
import isValidVideoUrl from '../valid/isValidVideoUrl';
import isValidBlobUrl from '../valid/isValidBlobUrl';
import CreateElement from './createElement';

export default function createMsgText(text) {
  let msgText;
  const element = new CreateElement(text);
  if (isValidHttpUrl(text) === true) {
    msgText = element.elHttpUrl();
  }
  if (isValidDataUrl(text) === true) {
    msgText = element.elDataUrl();
  }
  if (isValidBlobUrl(text) === true) {
    msgText = element.elBlobUrl();
  }
  if (isValidAudioUrl(text) === true) {
    msgText = element.elAudioUrl();
  }
  if (isValidVideoUrl(text) === true) {
    msgText = element.elVideoUrl();
  }
  if (
    isValidVideoUrl(text) === false && isValidHttpUrl(text) === false
    && isValidDataUrl(text) === false && isValidBlobUrl(text) === false
    && isValidAudioUrl(text) === false) {
    msgText = element.el();
  }
  return msgText;
}
