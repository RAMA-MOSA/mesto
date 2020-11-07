export class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClickClose = this._handleClickClose.bind(this);
    };

    _handleClickClose(evt){
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
            this.close();
        }
    };

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        };
    };

    setEventListeners(){
        this._popupElement.addEventListener("click", this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);
    };

    _removeEventListener(){
        this._popupElement.removeEventListener('click', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEscClose);
    };

    open(){
        this._popupElement.classList.add('popup_opened');
        this.setEventListeners();
    };
    
    close(){
        this._popupElement.classList.remove('popup_opened');
        this._removeEventListener();
    };
};