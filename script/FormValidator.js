class FormValidator{
    constructor(config, formItem){
        this._formElement = formItem;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    _showInputError(inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasNotValidInput(){
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _disabledButton(){
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled', true);
    }

    _toggleButtonState(){
        if (this._hasNotValidInput()){
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._disabledButton();
        }
    };

    _setEventListeners(){
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    
    enableValidation(){
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._disabledButton();
            });
            this._setEventListeners();
    };
}

export {FormValidator};