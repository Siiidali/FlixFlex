import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon set (FontAwesome in this example)

const CustomIcon = ({name, color, size}: any) => {
  return (
    <View>
      <Icon name={name} color={color} size={size} />
    </View>
  );
};

export default CustomIcon;
