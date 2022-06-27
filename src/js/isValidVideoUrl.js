export default function isValidVideoUrl(url) {
  if (url.search('data:video') === -1) {
    return false;
  }
  return true;
}
