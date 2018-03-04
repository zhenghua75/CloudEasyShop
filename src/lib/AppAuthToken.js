import store from 'react-native-simple-store'

export default class AppAuthToken{
    constructor(){
        this.TOKEN_KEY='TOKEN_KEY'
    }

    storeToken(token) {
        return store.save(this.TOKEN_KEY,token);
    }

    getToken() {
        return store.get(this.TOKEN_KEY);
    }

    deleteToken() {
        return store.delete(this.TOKEN_KEY);
    }
}