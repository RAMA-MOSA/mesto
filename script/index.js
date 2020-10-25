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
const formList = Array.from(document.querySelectorAll('.popup__form'));
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_error-line',
    errorClass: 'popup__error_visible'
}; 

function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = popupItemName.value;
    profileDescription.textContent = popupItemDescription.value;
    closePopup(popupProfile);
}

function openPopupNewCard(){
    openPopup(popupNewCard);
    popupItemNameElement.value = '';
    popupItemLinkElement.value = '';
}

function newCardSubmitHandler(evt){
    evt.preventDefault();
    const item = {name: popupItemNameElement.value, link: popupItemLinkElement.value};
    renderCards(item);
    closePopup (popupNewCard);
}

function renderCards(item){
    const card = new Card(item, '.element__template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__box').prepend(cardElement);
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closeByEsc);
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
profileEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    popupItemName.value = profileName.textContent;
    popupItemDescription.value = profileDescription.textContent;
});
popupClose.addEventListener('click', () => {
    closePopup (popupProfile);
});
profileButton.addEventListener('click', openPopupNewCard);
popupCloseNewCard.addEventListener('click', () => {
    closePopup (popupNewCard);
});
popupCloseImage.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        closePopup (popupImage);
    }
});

export{openPopup, popupImage, popupImg, popupCaption, config, formList};