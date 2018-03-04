import React from 'react';
import {StyleSheet,
  View,
  Text,
  Vibration,
  ActivityIndicator,
  InteractionManager,
  BackAndroid
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';
import {
    Actions
} from 'react-native-router-flux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#370F00'
  },
  statusBarText: {
    fontSize: 20,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export default class BarcodeScannerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: true,
      showBarcodeScanner: false
    };
    this.barcodeReceived = this.barcodeReceived.bind(this);
    this._onBackHandler = this._onBackHandler.bind(this);
  }

  barcodeReceived(e) {
    try{
      let rowData=JSON.parse(e.data);
      if(rowData && rowData.Id){
        Vibration.vibrate();
        Actions.ReadVouchScan({vouchId:rowData.Id,vouchType:'003',FromWhId:rowData.WhId});
      }
    }catch(ex){
      //console.log(ex);
    }
    
  }
  componentWillMount() {
      InteractionManager.runAfterInteractions(() => {
          this.setState({
            showOverlay: false,
            showBarcodeScanner: true,
          });
      });
  }
  // componentWillUnMount(){
  //   console.log('componentWillUnMount');
  //   this.refs.scanner.stopCamera();
  // }
  _onBackHandler(){
        this.refs.scanner.stopCamera();
            this.timeout = setTimeout(() => {
                //this.props.router.pop();
                Actions.pop();
            }, 1000);
    }
  render() {
    // return (
    //   <BarcodeScanner
    //     onBarCodeRead={this.barcodeReceived}
    //     style={{ flex: 1 }}
    //     torchMode={'off'}
    //     cameraType={'back'}
    //     showViewFinder={false}
    //   />
    // );
    if(!this.state.showBarcodeScanner){
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.spinner} animating={this.state.showOverlay} size='large' color='#FE8F45' />
        </View>
      );
    }
    //this.props.onBack=this._onBackHandler;
    //this.props.navigationState.onBack = this._onBackHandler;
    return (
      <View style={styles.container}>
        <BarcodeScanner ref="scanner"
          onBarCodeRead={this.barcodeReceived}
          style={{ flex: 1 }}
          torchMode={'off'}
          cameraType={'back'}
        />
        <View style={styles.statusBar}>

        </View>
      </View>
    );
  }
}