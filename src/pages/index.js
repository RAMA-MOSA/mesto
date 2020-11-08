import "./index.css";
import {initialCards} from "../utils/InitialCards.js";
import {Section} from "../components/Section.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

const cardSelector = '#element';
const profileEdit = document.querySelector('.profile__edit');
const profileButton = document.querySelector('.profile__button');
const popupProfile = document.querySelector('.popup-profile');
const popupItemName = popupProfile.querySelector('#name-input');
const popupItemDescription = popupProfile.querySelector('#description-input');
const elementsBox = '.elements__box';
const nameSelector = '.profile__name'; 
const infoSelector = '.profile__description';
const popupImageSelector ='.popup-image';
const popupAddSelector = '.popup-newcard';
const popupProfileSelector = '.popup-profile';
const formList = Array.from(document.querySelectorAll('.popup__form'));
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_error-line',
    errorClass: 'popup__error_visible'
}; 

const photoPopup = new PopupWithImage(popupImageSelector);

const userInfo = new UserInfo({nameSelector, infoSelector});

const createNewCard = (data) => {
    const card = new Card(data, cardSelector, {
        handleCardClick:(data) => {
            photoPopup.open(data);
            photoPopup.setEventListeners();//если ставлю слушатель вне функции, то срабатывает он единожды и второй раз попап не закрывается
        }
    });
    return card;
};

const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = createNewCard(data);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'append');
    }
},elementsBox
);
cardsList.rendererItems();

const popupWithAddForm = new PopupWithForm(popupAddSelector, {      
    submit: (data) => {
        const card = createNewCard(data);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
        popupWithAddForm.close();
    }
});

const popupWithProfileForm = new PopupWithForm(popupProfileSelector, {      
    submit: (data) => {
        userInfo.setUserInfo(data);
        popupWithProfileForm.close();
    }  
});

profileButton.addEventListener('click', () => {
    popupWithAddForm.open();
    popupWithAddForm.setEventListeners();
});

profileEdit.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupItemName.value = userData.name;
    popupItemDescription.value = userData.info;
    popupWithProfileForm.open();
    popupWithProfileForm.setEventListeners();
});

const validator = (config, formList) => {
    formList.forEach((item) => {
        const newForm = new FormValidator(config, item);
        newForm.enableValidation();
    })
};
validator(config, formList);