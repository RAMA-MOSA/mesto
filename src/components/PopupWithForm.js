import {Popup} from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popupSelector, {submit}){
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submit = submit;
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    };

    _submitEvtHandler(evt){
        evt.preventDefault();
        this._submit(this._getInputValues());
    };
    
    _getInputValues(){
        const inputList = Array.from(this._popupForm.querySelectorAll('.popup__item'));
        const data = {};
        inputList.forEach(input => {
            data[input.name] = input.value;
        })
        return data;
    };

    setEventListeners(){
        this._popupForm.addEventListener('submit', this._submitEvtHandler);
        super.setEventListeners();
    };

    close(){
        this._popupForm.reset();
        this._popupForm.removeEventListener('submit', this._submitEvtHandler);
        super.close();
    };
};