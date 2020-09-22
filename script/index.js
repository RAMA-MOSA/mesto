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



const profileEdit = document.querySelector('.profile__edit');
const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup_form');
const popupNewCardForm = document.querySelector('.popup-newcard_form');
const popupItemName = popup.querySelector('.popup__item_name');
const popupItemDescription = popup.querySelector('.popup__item_description');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const popupItemNameElement = document.querySelector('.popup__item_name-element');
const popupItemLinkElement = document.querySelector('.popup__item_link-element');
const popupNewCard = document.querySelector('.popup-newcard');
const popupImage = document.querySelector('.popup-image');
const popupCloseNewCard = document.querySelector('.popup__close_newcard');
const elementPhoto = document.querySelector('.element__photo');
const elementCaption = document.querySelector('.element__caption');
const popupCloseImage = document.querySelector('.popup__close_image');
const trash = document.querySelector('.element__trash');
const elementTemplate = document.querySelector('#element').content;
const allElements = document.querySelector('.elements__box');



//ОТКРЫТЬ РЕДАКТОР ПРОФИЛЯ
function openPopup(){
    openedPopup(popup);
    popupItemName.value = profileName.textContent;
    popupItemDescription.value = profileDescription.textContent;
}
//РЕДАКТИРОВАТЬ ПРОФИЛЬ
function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = popupItemName.value;
    profileDescription.textContent = popupItemDescription.value;
    closedPopup(popup);
}
//ЗАКРЫТЬ РЕДАКТОР ПРОФИЛЯ
function closePopup(){
    closedPopup (popup);
}
//ОТКРЫТЬ ФОРМУ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function openPopupNewCard(){
    openedPopup(popupNewCard);
    popupItemNameElement.value = '';
    popupItemLinkElement.value = '';
    popupNewCardForm.addEventListener('submit', newCardSubmitHandler);
}
//СОЗДАТЬ НОВУЮ КАРТОЧКУ, ЗАКРЫТЬ ФОРМУ
function newCardSubmitHandler(evt){
    evt.preventDefault();
    const item = {name: popupItemNameElement.value, link: popupItemLinkElement.value};
    const newElement = getCardElement(item);
    renderCards(newElement, allElements);
    closedPopup (popupNewCard);
}
//ЗАКРЫТЬ ФОРМУ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function closePopupNewCard(){
    popupNewCardForm.removeEventListener('submit', newCardSubmitHandler);
    closedPopup (popupNewCard);
}
//ЗАПОЛНИТЬ ДАННЫМИ НОВУЮ КАРТОЧКУ, ПОДКЛЮЧИТЬ СЛУШАТЕЛИ, ВЕРНУТЬ ГОТОВУЮ КАРТОЧКУ
function getCardElement(item){
    const newElement = elementTemplate.cloneNode(true);
    newElement.querySelector('.element__photo').src = item.link;
    newElement.querySelector('.element__photo').alt = item.name;
    newElement.querySelector('.element__caption').textContent = item.name;        
    likeElement(newElement);
    deleteElement(newElement);
    openElement(newElement);
    return(newElement);
}
//ОПРЕДЕЛИТЬ МЕСТОПОЛОЖЕНИЕ НОВОЙ КАРТОЧКИ
function renderCards(newElement, allElements){
    allElements.prepend(newElement);
}
//ЛАЙКНУТЬ
function likeElement(item){
    item.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_on');
    })
}
//УДАЛИТЬ КАРТОЧКУ
function deleteElement(item){
    item.querySelector('.element__trash').addEventListener('click', function(evt){
        evt.target.parentNode.remove();
    })
}
//УВЕЛИЧИТЬ КАРТОЧКУ
function openElement(item){
    item.querySelector('.element__photo').addEventListener('click', function(evt){
        openedPopup(popupImage);
        popupImg.src = evt.target.src;
        popupCaption.textContent = evt.target.alt;
        popupImg.alt = evt.target.alt;
    })
}
//ЗАКРЫТЬ УВЕЛИЧЕННУЮ КАРТОЧКУ
function closePopupImage(){
    closedPopup (popupImage);
}
//ОТКРЫТЬ ПОПАП
function openedPopup(popup){
    popup.classList.add('popup_opened');
}
//ЗАКРЫТЬ ПОПАП
function closedPopup(popup){
    popup.classList.remove('popup_opened');
}



//СОЗДАТЬ НАЧАЛЬНЫЕ КАРТОЧКИ ИЗ МАССИВА
initialCards.forEach(function (item){
    const newElement = getCardElement(item);
    renderCards(newElement, allElements);
});



popupForm.addEventListener('submit', formSubmitHandler);
profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
profileButton.addEventListener('click', openPopupNewCard);
popupCloseNewCard.addEventListener('click', closePopupNewCard);
popupCloseImage.addEventListener('click', closePopupImage);