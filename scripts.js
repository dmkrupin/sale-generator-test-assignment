const button = document.querySelector('.button');
const popupBackgroundElement = document.querySelector('.popup-bg');
const popupElement = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const emailInputElement = document.querySelector('.form__input--email');
const telInputElement = document.querySelector('.form__input--tel');
const formSubmitButton = document.querySelector('.form__submit');
const formElement = document.querySelector('.form');

const isEscapeKey = (evt) => evt.keyCode === 27;

//Обработчик нажатия Esc на окне попапа
const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      //Если при нажатии Esc активно текстовое поле, то запретим всплытие события
      if (document.activeElement === emailInputElement || document.activeElement === telInputElement) {
        evt.stopPropagation();
      }
      else {
        closePopup();
      }
    }
};
//Обработчик клика по кнопке закрытия попапа
const onPopupCloseButtonClick = (evt) => {
    evt.preventDefault();
    closePopup();
};

//Обработчик-валидатор поля ввода хэштегов
const onTelInputInput = () => {
    const telMask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const input = telInputElement.value;
      //Проверяем телефон на соответствие маске
      if (!telMask.test(input)) {
        telInputElement.setCustomValidity('Введите телефон в формате +7 000 00 00');
      }
      else {
        telInputElement.setCustomValidity('');
      }
    telInputElement.reportValidity();
  };

//открываем попап
const openPopup = () => {
    popupElement.classList.remove('hidden');
    popupBackgroundElement.classList.remove('hidden');
    //Будем закрывать попап по нажатию Esc
    document.addEventListener('keydown', onPopupEscKeydown);
    //Будем закрывать попап по клику на крестик
    popupCloseButton.addEventListener('click', onPopupCloseButtonClick);
    //Валидируем поле ввода телефона
    telInputElement.addEventListener('input', onTelInputInput);
};

//закрываем попап
const closePopup = () => {
    popupElement.classList.add('hidden');
    popupBackgroundElement.classList.add('hidden');
    //Очищаем все остальные поля
    emailInputElement.value = '';
    telInputElement.value = '';
    //Удаляем обработчик нажатия Esc
    document.removeEventListener('keydown', onPopupEscKeydown);
    //Удаляем обработчик клика по кнопке закрытия попапа
    popupCloseButton.removeEventListener('click', onPopupCloseButtonClick);
    //Удаляем обработчик валидации телефона
    telInputElement.removeEventListener('input', onTelInputInput);
};

const sendForm = (body) => {
fetch('https://forms.amocrm.ru/queue/add',
    {
    method: 'POST',
    mode: 'no-cors',
    enctype: 'multipart/form-data',
    body: body,
    });

// не успеваю собрать через php с доменом и хостингом
// примерно как должна выглядеть отправка на почту через php я написал в файлике send.php
// и в качестве костыля вторым фетчем отправляю данные формы через сторонный сервис formspree
// но для него нужно авторизовать почту order@salesgenerator.pro внутри этого сервиса, чего сам сделать не могу
// поэтому на почту ничего не приходит :(
fetch('https://formspree.io/f/xnqwvqez',
    {
    method: 'POST',
    mode: 'no-cors',
    enctype: 'multipart/form-data',
    body: body,
    })

};

//Добавляем обработчик клика по попапу
button.addEventListener('click', openPopup);
//Добавляем обработчик отправки формы
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendForm(formData);
});
