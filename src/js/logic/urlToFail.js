export default function urltoFile(url, filename, mimeType) {
  return (fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, {
      type: mimeType,
    }))
  );
}
