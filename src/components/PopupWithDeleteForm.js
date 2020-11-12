import {Popup} from './Popup.js';

export class PopupWithDeleteForm extends Popup{
    constructor(popupSelector, {submit}){
        super(popupSelector);
        this._popupElement = document.querySelector(this._popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submit = submit;
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    };

    _submitEvtHandler(evt){
        evt.preventDefault();
        this._submit(this._data);
        this._popupForm.removeEventListener('submit', this._submitEvtHandler);
    };

    setEventListeners(){
        this._popupForm.addEventListener('submit', this._submitEvtHandler);
        super.setEventListeners();
    };

    open(data){
        this._data = data;
        super.open();
    };
};