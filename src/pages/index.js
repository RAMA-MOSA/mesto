import "./index.css";
import {Section} from "../components/Section.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithDeleteForm} from "../components/PopupWithDeleteForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {
    cardSelector,
    profileEdit,
    profileButton,
    avatarButton,
    elementsBox,
    nameSelector,
    infoSelector,
    avatarSelector,
    popupImageSelector,
    popupAddSelector,
    popupDeleteSelector,
    popupProfileSelector,
    popupAvatarSelector,
    formList,
    popupItemName,
    popupItemDescription,
    config
} from "../utils/constants.js";

let ownerId = null;
let tempCard = null;

const userInfo = new UserInfo({nameSelector, infoSelector, avatarSelector});

const cardsList = new Section({
    renderer: (data) => {
        const card = createNewCard(data);
        const cardElement = card.generateCard();
        card.setLikeCount(data);
        cardsList.addItem(cardElement, 'append');
    }
},elementsBox
);

const photoPopup = new PopupWithImage(popupImageSelector);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
      authorization: 'd558607e-48f8-4a90-b7e5-75f1fe753f5b',
      'Content-Type': 'application/json'
    }
}); 

api.getInitialData()
    .then((data) => {
        const [userData, cardData] = data;
        ownerId = userData._id;
        userInfo.setUserInfo(userData);
        cardsList.rendererItems(cardData);
    })
    .catch((err) => {
        console.log(err);
    })

const popupWithDeleteForm = new PopupWithDeleteForm(popupDeleteSelector, {
    submit:(data) => {
        api.deleteCard(data)
             .then(() => {
                 tempCard.deleteCard();
             })
             .then(() => {
                 tempCard = null;
                 popupWithDeleteForm.close();
             })
             .catch((err) => {
                 console.log(err);
             })
    }
});

const createNewCard = (data) => {
    const card = new Card(data, cardSelector, ownerId, {
        handleCardClick:(data) => {
            photoPopup.open(data);
            photoPopup.setEventListeners();
        },
        handleCardDelete:() => {
            tempCard = card;
            popupWithDeleteForm.open(data);
            popupWithDeleteForm.setEventListeners();
        },
        addLike:(data) => {
            api.addLike(data)
                .then((data) => {
                    card.setLikeCount(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        deleteLike:(data) => {
            api.deleteLike(data)
                .then((data) => {
                    card.setLikeCount(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });
    return card;
};

const popupWithAddForm = new PopupWithForm(popupAddSelector, {      
    submit: (data) => {
        popupWithAddForm.renderLoading(true);
        api.postCard(data)
            .then((res) => {
                const card = createNewCard(res);
                const cardElement = card.generateCard();
                cardsList.addItem(cardElement, 'prepend');
                popupWithAddForm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithAddForm.renderLoading(false);
            })
    }
});

const popupWithProfileForm = new PopupWithForm(popupProfileSelector, {      
    submit: (data) => {
        popupWithProfileForm.renderLoading(true);
        api.setUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupWithProfileForm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithProfileForm.renderLoading(false);
            })
    }  
});

const popupWithAvatarForm = new PopupWithForm(popupAvatarSelector, {
    submit: (data) => {
        popupWithAvatarForm.renderLoading(true);
        api.setUserAvatar(data)
            .then((res) => {
                userInfo.setUserAvatar(res);
                popupWithAvatarForm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(false);
            })
    }
});

profileButton.addEventListener('click', () => {
    popupWithAddForm.open();
    popupWithAddForm.setEventListeners();
});

profileEdit.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupItemName.value = userData.name;
    popupItemDescription.value = userData.about;
    popupWithProfileForm.open();
    popupWithProfileForm.setEventListeners();
});

avatarButton.addEventListener('click', () => {
    popupWithAvatarForm.open();
    popupWithAvatarForm.setEventListeners();
});

const validator = (form) => {
    const newForm = new FormValidator(config, form);
    newForm.enableValidation();
};

formList.forEach(form => {
    validator(form);
});