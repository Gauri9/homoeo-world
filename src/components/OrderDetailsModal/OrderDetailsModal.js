import React from 'react';
import { View, Text } from 'react-native';
import { Input, Stack, FormControl, Button, Modal } from 'native-base';
import {theme} from 'HomoeoWorld/src/utils/theme.js' ;


const OrderDetailsModal = ({ isVisible, onClose }) => {

  return (
    <Modal isOpen={isVisible} >
    <Modal.Content maxWidth="400px" >
      {/* <Modal.CloseButton /> */}
      <Modal.Header>Order Details</Modal.Header>
      <Modal.Body>
        <FormControl>
          <Stack space={3}>

            <Stack>
                <FormControl.Label>
                    Confirmation message
                </FormControl.Label>
            </Stack>
           
          </Stack>
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={onClose} style={{marginRight:20, backgroundColor: theme.primaryColor }}>Confirm</Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  );
};

export default OrderDetailsModal;
