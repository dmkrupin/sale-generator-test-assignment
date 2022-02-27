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

//открываем попап
const openPopup = () => {
    popupElement.classList.remove('hidden');
    popupBackgroundElement.classList.remove('hidden');
    //Будем закрывать попап по нажатию Esc
    document.addEventListener('keydown', onPopupEscKeydown);
    //Будем закрывать попап по клику на крестик
    popupCloseButton.addEventListener('click', onPopupCloseButtonClick);
    //Валидируем поле ввода хэштегов
    // hashtagsInputElement.addEventListener('input', onHashTagInputInput);
    // descriptionInputElement.addEventListener('input', onDescriptionInputInput);
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
    //Удаляем обработчики изменения текстовых полей формы
    // hashtagsInputElement.removeEventListener('input', onHashTagInputInput);
    // descriptionInputElement.removeEventListener('input', onDescriptionInputInput);
};

//задаем обработчик отправки формы
const setFormSubmit = (onSuccess, onError) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      sendForm(onSuccess, onError, formData);
    });
  };

const sendForm = (onSuccess, onError, body) => {
fetch('https://forms.amocrm.ru/queue/add',
    {
    method: 'POST',
    enctype: 'multipart/form-data',
    body: body,
    })
    .then((response) => {
    if (response.ok) {
        onSuccess();
    }
    else {
        throw new Error('Ошибка отправки формы!');
    }
    })
    .catch((err) => onError(err));
};



button.addEventListener('click', openPopup);

//Вызываем обработчик отправки формы, если успешно - показываем текст ответа, если неуспешно - сообщение об ошибке
setFormSubmit(
    () => {
      alert('ok!');
    },
    (error) => {
      alert(error);
    },
  );
