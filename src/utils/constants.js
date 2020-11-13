export const cardSelector = '#element';
export const profileEdit = document.querySelector('.profile__edit');
export const profileButton = document.querySelector('.profile__button');
export const avatarButton = document.querySelector('.profile__img-avatar');
export const popupProfile = document.querySelector('.popup-profile');
export const elementsBox = '.elements__box';
export const nameSelector = '.profile__name'; 
export const infoSelector = '.profile__description';
export const avatarSelector = '.profile__avatar';
export const popupImageSelector ='.popup-image';
export const popupAddSelector = '.popup-newcard';
export const popupDeleteSelector = '.popup-delete';
export const popupProfileSelector = '.popup-profile';
export const popupAvatarSelector = '.popup-avatar';
export const formList = Array.from(document.querySelectorAll('.popup__form'));
export const popupItemName = popupProfile.querySelector('#name-input');
export const popupItemDescription = popupProfile.querySelector('#description-input');
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_error-line',
    errorClass: 'popup__error_visible'
}; 