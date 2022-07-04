export default function isValidDataUrl(url) {
  if (url.search('data:image') === -1) {
    return false;
  }
  return true;
}
