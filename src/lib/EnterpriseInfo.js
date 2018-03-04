import store from 'react-native-simple-store'

export default class EnterpriseInfo{
    constructor(){
        this.TOKEN_KEY='ENTERPRISE_INFO'
    }

    storeInfo(info) {
        return store.save(this.TOKEN_KEY,info);
    }

    getInfo() {
        return store.get(this.TOKEN_KEY);
    }

    deleteInfo() {
        return store.delete(this.TOKEN_KEY);
    }
}