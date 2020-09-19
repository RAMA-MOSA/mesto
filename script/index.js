const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


let profileEdit = document.querySelector('.profile__edit');
let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupForm = document.querySelector('.popup_form');
let popupNewcardForm = document.querySelector('.popup-newcard_form');
let popupItemName = popup.querySelector('.popup__item_name');
let popupItemDescription = popup.querySelector('.popup__item_description');
let popupImg = document.querySelector('.popup__img');
let popupCaption = document.querySelector('.popup__caption');
const popupItemNameElement = document.querySelector('.popup__item_name-element');
const popupItemLinkElement = document.querySelector('.popup__item_link-element');
const popupNewcard = document.querySelector('.popup-newcard');
const popupImage = document.querySelector('.popup-image');
const popupCloseNewcard = document.querySelector('.popup__close_newcard');
const elementPhoto = document.querySelector('.element__photo');
const popupCloseImage = document.querySelector('.popup__close_image');
const trash = document.querySelector('.element__trash');
const elementTemplate = document.querySelector('#element').content;
const allElements = document.querySelector('.elements__box');








//ОТКРЫТЬ РЕДАКТОР ПРОФИЛЯ
function openPopup(){
    popup.classList.add('popup_opened');
    popupItemName.value = profileName.textContent;
    popupItemDescription.value = profileDescription.textContent;
}
//РЕДАКТИРОВАТЬ ПРОФИЛЬ
function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = popupItemName.value;
    profileDescription.textContent = popupItemDescription.value;
    closePopup();
}
//ЗАКРЫТЬТ РЕДАКТОР ПРОФИЛЯ
function closePopup(){
    popup.classList.remove('popup_opened');
}
//ОТКРЫТЬ ФОРМУ НОВОЙ КАРТОЧКИ
function openPopupNewcard(){
    popupNewcard.classList.add('popup_opened');
    popupItemNameElement.value = '';
    popupItemLinkElement.value = '';
    popupNewcardForm.addEventListener('submit', newcardSubmitHandler);
}
//СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function newcardSubmitHandler(evt){
    evt.preventDefault();
    const newElement = elementTemplate.cloneNode(true);
    elementTemplate.querySelector('.element__photo').src = popupItemLinkElement.value;
    elementTemplate.querySelector('.element__caption').textContent = popupItemNameElement.value;
    elementTemplate.querySelector('.element__photo').alt = popupItemNameElement.value;
    likeElement(newElement);
    deleteElement(newElement);
    openElement(newElement);
    allElements.prepend(newElement);
    closePopupNewcard();
}
//ЗАКРЫТЬ ФОРМУ НОВОЙ КАРТОЧКИ
function closePopupNewcard(){
    popupNewcard.classList.remove('popup_opened');
}
//ЛАЙКНУТЬ
function likeElement(val){
    val.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_on');
    })
}
//УДАЛИТЬ 
function deleteElement(val){
    val.querySelector('.element__trash').addEventListener('click', function(evt){
        evt.target.parentNode.remove();
    })
}
//ОТОБРАЗИТЬ КАРТОЧКУ
function openElement(val){
    val.querySelector('.element__photo').addEventListener('click', function(evt){
        popupImage.classList.add('popup_opened');
        popupImg.src = evt.target.src;
        popupCaption.textContent = evt.target.alt;
    })
}
    
//ЗАКРЫТЬ ОТОБРАЖЕНИЕ КАРТОЧКИ
function closePopupImage(){
    popupImage.classList.remove('popup_opened');
}




//КАРТОЧКИ ИЗ МАССИВА
initialCards.forEach(function(item){
    const newElement = elementTemplate.cloneNode(true);
    elementTemplate.querySelector('.element__photo').src = item.link;
    elementTemplate.querySelector('.element__photo').alt = item.name;
    elementTemplate.querySelector('.element__caption').textContent = item.name;
    likeElement(newElement);
    deleteElement(newElement);
    openElement(newElement);
    allElements.prepend(newElement);
})








popupForm.addEventListener('submit', formSubmitHandler);
profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
profileButton.addEventListener('click', openPopupNewcard);
popupCloseNewcard.addEventListener('click', closePopupNewcard);
popupCloseImage.addEventListener('click', closePopupImage);