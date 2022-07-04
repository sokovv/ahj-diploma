export default function geo(login) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;
        const message = JSON.stringify({
          event: 'chat',
          message: `Ваша геолокация (Ширина: ${latitude}, Долгота: ${longitude})`,
        });
        login.socket.send(message);
        window.open(
          `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
        );
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      },
    );
  }
}
