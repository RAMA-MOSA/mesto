let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupForm = document.querySelector('.popup__form');
let popupItemName = popup.querySelector('.popup__item_name');
let popupItemDescription = popup.querySelector('.popup__item_description');

function openPopup(){
    popup.classList.add('popup_opened');
    popupItemName.value = profileName.textContent;
    popupItemDescription.value = profileDescription.textContent;
}
profileEdit.addEventListener('click', openPopup);


function closePopup(){
    popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closePopup);


function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = popupItemName.value;
    profileDescription.textContent = popupItemDescription.value;
    popup.classList.remove('popup_opened');
}
popupForm.addEventListener('submit', formSubmitHandler);