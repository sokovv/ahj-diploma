Диплом по курсу "Продвинутый JS в браузере"

Heroku и Appveyor ограничили использование, поэтому ссылки на фронтенд и бекенд не разместил, все равно не будет работать, только локально.

Пока реализовал не все функции, если будет время поработаю над остальными.

 1. Ссылки и текстовые сообщения сохраняются в истории на бекенд сервере, оттуда при обновлении страницы подгружаются.
 2. Ссылки отображаются как ссылки.
 3. Изображения, видео и аудио сохраняются через Drag & Drop и через кнопку загрузки (находится справа от кнопки "Send")
    ![загрузить](https://user-images.githubusercontent.com/88129553/175954276-a35399a1-2743-470a-9e1d-f4263f289c0f.png)

 4. Аудио и видео файлы скачиваются на компьютер по кнопке "Download", находится под видео и аудио файлами.
    ![Download](https://user-images.githubusercontent.com/88129553/175954371-1a766210-e3f1-4c94-a42c-d7a2ec1a3d08.png)

 5. При прокрутке ползунка загружает по 10 новых сообщений с серверной части, если они там конечно есть.

 6. При открытии нескольких вкладок бота, сообщения синхронизируются с помощью Websocket.

 7. Реализована запись аудио на кнопках в левом нижнем окне приложения, запись видео делать не стал, нет устройства необходимого чтобы проверить, в любом случае они анологично работают. 
![запись](https://user-images.githubusercontent.com/88129553/175956623-e03ee45d-930e-46b0-9d6d-fc7d5042e6ed.png)

 8. Отправка геолокации реализована с помощью команды в чате @geo и по кнопке в верхнем левом углу.
![гео](https://user-images.githubusercontent.com/88129553/175957061-3ac6f90d-f5b8-4eb3-ad3c-eaa82c3e02a5.png)

 9. Аудио и видео воспроизводятся через панель управления под ними.
![Воспроизв](https://user-images.githubusercontent.com/88129553/175957386-884d20f4-f851-4d76-96fd-5afceb787faa.png)

 10. При разрешении уведомлений, бот приветсвует тебя, а также напоминает периодически который час). 
    ![noti](https://user-images.githubusercontent.com/88129553/175958435-1a129e24-d7e1-4660-8e2e-f78b15924ea7.png)

    
 11. Реализована функция команд боту, команда должна начинаться с символа @, описания команд можно почитать по кнопке с вопросом.

![вопрос](https://user-images.githubusercontent.com/88129553/175958983-2014a712-4334-49be-b0b7-b4116819cf30.png)


 12.Реализована функция закрепа сообщений по кнопке дырокола, закрепить следующее можно только после удаления предыдущего по крестику у сообщения.

![закреп](https://user-images.githubusercontent.com/88129553/175959876-f47b12c4-186a-40f6-8f1a-755d1ce41a61.png)


