export class Card{
    constructor(data, cardSelector, {handleCardClick}){
        this._data = data;
        this._cardSelector = cardSelector; 
        this._handleCardClick = handleCardClick;  
    };

    _getTemplate(){
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
  
        return cardElement;
    };

    _deleteElement(){
        this._element.remove();
    };

    _likeElement(){
        this._element.querySelector('.element__like').classList.toggle('element__like_on');
    };

    _setEventListeners(){
        this._element.querySelector('.element__like').addEventListener('click', () => { 
            this._likeElement();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._deleteElement();
        });
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
    };
    
    generateCard(){
        this._element = this._getTemplate();
        this._cardCaption = this._element.querySelector('.element__caption');
        this._cardValue = this._element.querySelector('.element__photo');
        this._cardCaption.textContent = this._data.name;
        this._cardValue.src = this._data.link;
        this._cardValue.alt = this._data.name;
        this._setEventListeners();

        return this._element;
    };
};