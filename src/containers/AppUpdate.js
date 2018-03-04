import {Alert, Platform, Linking, NativeModules} from 'react-native'

export default class AppUpdate {
    
    static init(params) {
        fetch(params.url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
            res.json().then(body => {
                if(body.version>params.version){
                    let str = '当前版本:' + params.version + '\n最新版本:' +body.version;
                    if(body.updateContent && body.updateContent !== ''){
                        str += '\n本次更新内容:\n' + body.updateContent.replace(/#/g, '\n');
                    }
                    Alert.alert(
                        '发现新版本',
                        str,
                        [
                            {text: '取消'},
                            {
                                text: '确认', onPress: () => {
                                this._update(body.updateUrl);
                            }
                            }
                        ]
                    )
                }
            }).catch(error=> {
                //console.log(error);
            });
        }).catch(err=> {
            //console.log(err);
        });
    }

    static _update(url){
        if(Platform.OS === 'android'){
            NativeModules.AppUpdate.update(url);
        }else if(Platform.OS === 'ios'){
            Linking.openURL(url).catch(err=>{
                Alert.alert(
                    '版本更新',
                    '版本更新失败',
                    [
                        {text: '确认'}
                    ]
                )
            });
        }
    }
}