export default function download(text, name, type) {
  const a = document.getElementById('a');
  const file = new Blob([text], {
    type,
  });
  a.href = URL.createObjectURL(file);
  a.download = name;
}
