import React, {
  Component,
  PropTypes
} from 'react';
import {
  Picker,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  pickerstyle: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginTop: 5,
    marginBottom: 5,
    height: 34,
  }
});

export default class InventoryPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      vouchs,
      value
    } = this.props;
    var tmpitems = [];
    if (vouchs && vouchs.options && vouchs.options['Vouchs.InvId']) {
      var options = vouchs.options['Vouchs.InvId'];
      tmpitems.push( < Picker.Item key = '0'
        label = "请选择"
        value = '' / > );
      for (var i in options) {
        tmpitems.push(<Picker.Item key={i} label={options[i].label.Name} value={options[i].value} />);
      }
    }
    return (
      <Picker
        style={styles.pickerstyle}
        prompt="请选择存货" 
        selectedValue={value} 
        onValueChange={this.props.onValueChange} >
        {tmpitems}
      </Picker>
    );
  }
}