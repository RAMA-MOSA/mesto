export class Section{
    constructor({items, renderer}, formSelector){
        this._items = items;
        this._renderer = renderer;
        this._formSelector = document.querySelector(formSelector);
    };

    rendererItems(){
        this._items.forEach(item => {
            this._renderer(item);
        });
    };
    
    addItem(element){
        this._formSelector.prepend(element);
    };
};