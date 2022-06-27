export default function isValidBlobUrl(url) {
  if (url.search('blob:') === -1) {
    return false;
  }
  return true;
}
