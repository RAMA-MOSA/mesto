export class Card{
    constructor(data, cardSelector, ownerId, {handleCardClick, handleCardDelete, addLike, deleteLike}){
        this._data = data;
        this._cardSelector = cardSelector;
        this._id = ownerId; 
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
    };

    _getTemplate(){
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
  
        return cardElement;
    };

    deleteCard(){
        this._deleteElement(this._element);
    };

    _deleteElement(element){
        element.remove();
        element = null;
    };

    _likeElement(data){
        this._addLikeClass();
        this._addLike(data);
    };

    _dislike(data){
        this._removeLikeClass();
        this._deleteLike(data);
    };

    _addLikeClass(){
        this._likeButton.classList.add('element__like_on');
    };

    _removeLikeClass(){
        this._likeButton.classList.remove('element__like_on');
    };

    setLikeCount(data){
        this._likeCount.textContent = String(data.likes.length);
    };

    _checkCard(){
        if(this._data.owner._id !== this._id){
            this._deleteElement(this._deleteButton);
        }
    };

    _checkLike(){
        this._data.likes.forEach((likeOwner) => {
            if(likeOwner._id === this._id){
                this._addLikeClass();
            }
        })
    };


    _setEventListeners(){
        this._likeButton.addEventListener('click', () => { 
            if(this._likeButton.classList.contains('element__like_on')){
                this._dislike(this._data);
            }else{
                this._likeElement(this._data);
            }
        });
        this._deleteButton.addEventListener('click', this._handleCardDelete);
        this._cardValue.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
    };
    
    generateCard(){
        this._element = this._getTemplate();
        this._cardValue = this._element.querySelector('.element__photo');
        this._cardCaption = this._element.querySelector('.element__caption');
        this._likeButton = this._element.querySelector('.element__like');
        this._likeCount = this._element.querySelector('.element__count');
        this._deleteButton = this._element.querySelector('.element__trash');
        this._element.setAttribute('id', `${this._data._id}`);//////////////
        this._cardCaption.textContent = this._data.name;
        this._cardValue.src = this._data.link;
        this._cardValue.alt = this._data.name;
        this.setLikeCount(this._data)
        this._setEventListeners();
        this._checkCard();
        this._checkLike();

        return this._element;
    };
};