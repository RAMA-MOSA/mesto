export class UserInfo{
    constructor({nameSelector, infoSelector, avatarSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    };

    getUserInfo(){
        const data = {
            name: this._name.textContent, 
            about:this._info.textContent
        };
        return data;
    };

    setUserAvatar(data){
        this._avatar.src = data.avatar;
    };
    
    setUserInfo(data){
        this._name.textContent = data.name;
        this._info.textContent = data.about;
        this.setUserAvatar(data);
        this._avatar.alt = data.name;
    };
};