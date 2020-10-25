import {initialCards} from "./initialCards.js";
import {Card} from "./card.js";
import {FormValidator} from "./FormValidator.js";

const profileEdit = document.querySelector('.profile__edit');
const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup_form');
const popupNewCardForm = document.querySelector('.popup-newcard_form');
const popupItemName = popupProfile.querySelector('.popup__item_name');
const popupItemDescription = popupProfile.querySelector('.popup__item_description');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const popupItemNameElement = document.querySelector('.popup__item_name-element');
const popupItemLinkElement = document.querySelector('.popup__item_link-element');
const popupNewCard = document.querySelector('.popup-newcard');
const popupImage = document.querySelector('.popup-image');
const popupCloseNewCard = document.querySelector('.popup__close_newcard');
const popupCloseImage = document.querySelector('.popup__close_image');
const allPopup = Array.from(document.querySelectorAll(".popup"));
const popupButtonNewcard = document.querySelector('.popup__button-newcard');
const popupButtonProfile = document.querySelector('.popup__button-profile');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const config = {
    formSelector: '.popup__form', //ВСЕ ФОРМЫ
    inputSelector: '.popup__item', //ВСЕ ПОЛЯ ВВОДА
    submitButtonSelector: '.popup__button', //КНОПКА ОТПРАВКИ ФОРМЫ
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_error-line',
    errorClass: 'popup__error_visible'
}; 

function openProfilePopup(){
    openPopup(popupProfile);
    popupItemName.value = profileName.textContent;
    popupItemDescription.value = profileDescription.textContent;
    popupButtonProfile.classList.remove('popup__button_disabled');
    popupButtonProfile.disabled = false;
}

function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = popupItemName.value;
    profileDescription.textContent = popupItemDescription.value;
    closePopup(popupProfile);
}

function closeProfilePopup(){
    closePopup (popupProfile);
}

function openPopupNewCard(){
    openPopup(popupNewCard);
    popupItemNameElement.value = '';
    popupItemLinkElement.value = '';
    popupButtonNewcard.classList.add('popup__button_disabled');
    popupButtonNewcard.disabled = true;
}
//СОЗДАТЬ НОВУЮ КАРТОЧКУ, ЗАКРЫТЬ ФОРМУ
function newCardSubmitHandler(evt){
    evt.preventDefault();
    const item = {name: popupItemNameElement.value, link: popupItemLinkElement.value};
    renderCards(item);
    closePopup (popupNewCard);
}

function closePopupNewCard(){
    closePopup (popupNewCard);
}

function renderCards(item){
    const card = new Card(item, '.element__template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__box').prepend(cardElement);
}

function closePopupImage(){
    closePopup (popupImage);
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt){
    if(evt.key === 'Escape'){
        const popupTarget = document.querySelector('.popup_opened');
        closePopup(popupTarget);
    };
};

allPopup.forEach(function (popup) {
    popup.addEventListener("click", function (evt) {
        if (evt.target.classList.contains("popup"))
        closePopup(popup);
    });
});

initialCards.forEach((item) =>{
    const card = new Card(item, '.element__template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__box').append(cardElement);
});

const validator = (config, formList) => {
    formList.forEach((item) => {
        const newForm = new FormValidator(config, item);
        newForm.enableValidation();
    })
};

validator(config, formList);
popupNewCardForm.addEventListener('submit', newCardSubmitHandler);
popupForm.addEventListener('submit', formSubmitHandler);
profileEdit.addEventListener('click', openProfilePopup);
popupClose.addEventListener('click', closeProfilePopup);
profileButton.addEventListener('click', openPopupNewCard);
popupCloseNewCard.addEventListener('click', closePopupNewCard);
popupCloseImage.addEventListener('click', closePopupImage);

export{openPopup, popupImage, popupImg, popupCaption, config, formList};