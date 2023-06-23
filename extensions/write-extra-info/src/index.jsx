import React from 'react';
import {Tile, Text, Screen, Navigator, render, useExtensionApi, ScrollView, Button, TextField} from '@shopify/retail-ui-extensions-react';

const SmartGridTile = () => {
  const api = useExtensionApi();
  return (
    <Tile
      title="Write Extra Info"
      subtitle="SmartGrid Extension"
      onPress={() => {
        api.smartGrid.presentModal();
      }}
      enabled
    />
  );
};

const SmartGridModal = () => {
  return (
    <Navigator>
      <ExtraInputScreen />
    </Navigator>
  );
}

//const HelloScreen = () => {
//  return (
//    <Screen name="HelloWorld" title="Hello World!">
//      <Text>Welcome to the POS extension!!!</Text>
//    </Screen>
//  );
//}

const ExtraInputScreen = () => {
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');
  const api = useExtensionApi();

  return (
    <Screen name="ExtraInputScreen" title="Extra Input Screen (NEED CART)">
      <TextField label="key" title="Attribute Key" value={key} onChangeText={setKey} />
      <TextField label="value" title="Value" value={value} onChangeText={setValue} />
      <Button title="Save" onPress={() => {
        api.cart?.addCartProperties({[key]: value});
        api.toast.show('Added to cart attributes!');
      }} />
    </Screen>
  );
}


render('pos.home.tile.render', () => <SmartGridTile />);
render('pos.home.modal.render', () => <SmartGridModal />);