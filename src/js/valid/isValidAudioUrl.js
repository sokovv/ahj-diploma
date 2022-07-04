export default function isValidAudioUrl(url) {
  if (url.search('data:audio') === -1) {
    return false;
  }
  return true;
}
