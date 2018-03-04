import React, {
  PropTypes,
} from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
import icon from '../constants/iconfont.js';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconName: PropTypes.string
};

const TabIcon = (props) => {
  return (
    <View style={{justifyContent: 'center',alignItems: 'center'}}>
      <Text style={{fontFamily:'iconfont',fontSize:26,color: props.selected ? '#FE8F45' : '#D4D4D4'}} allowFontScaling={false}>
        {icon(props.iconName)}
      </Text>
      <Text style={{ color: props.selected ? '#FE8F45' : '#D4D4D4',fontSize:12 }} allowFontScaling={false}>
        {props.title}
      </Text>
    </View>
  )
};

TabIcon.propTypes = propTypes;

export default TabIcon;