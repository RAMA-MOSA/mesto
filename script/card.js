import{openPopup, popupImage, popupImg, popupCaption} from "./index.js";

class Card{
    constructor(data, cardSelector){
        this._photo = data.link;
        this._alt = data.name;
        this._caption = data.name;
        this._cardSelector = cardSelector;     
    };

    _openElement(){
            openPopup(popupImage);
            popupImg.src = this._photo;
            popupCaption.textContent = this._caption;
            popupImg.alt = this._alt;
    };

    _likeElement(){
        this._element.querySelector('.element__like').classList.toggle('element__like_on');
    };

    _deleteElement(){
        this._element.remove();
    };

    _setEventListeners(){
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeElement();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._deleteElement();
        });
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._openElement();
        });
    };

    _getTemplate(){
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
  
        return cardElement;
    };
    
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__photo').src = this._photo;
        this._element.querySelector('.element__photo').alt = this._alt;
        this._element.querySelector('.element__caption').textContent = this._caption;

        return this._element;
    };
};

export{Card};