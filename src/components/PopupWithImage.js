import {Popup} from "./Popup.js";
export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this.image = this._popupElement.querySelector('.popup__img');
        this.caption = this._popupElement.querySelector('.popup__caption');
    };
    
    open(data){
        this.image.src = data.link;
        this.image.alt = data.name;
        this.caption.textContent = data.name;
        super.open();
    };
};