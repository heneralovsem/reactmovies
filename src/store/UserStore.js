import {makeAutoObservable} from "mobx"
export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._userId = 0;
        this._userName = ''
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserId(userId) {
        this._userId = userId;
    }
    setUserName(userName) {
        this._userName = userName
    }
    
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}