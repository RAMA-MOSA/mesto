export class Section{
    constructor({renderer}, formSelector){
        this._renderer = renderer;
        this._formSelector = document.querySelector(formSelector);
    };

    rendererItems(cardData){
        cardData.forEach(card => {
            this._renderer(card);
        });
    };
    
    addItem(element, position = 'prepend'){
        if (position === 'append'){
            this._formSelector.append(element);
        }else{
            this._formSelector.prepend(element);
        };
    };
};