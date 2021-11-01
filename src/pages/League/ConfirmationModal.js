import React from 'react';
import { Modal, ModalBody, Col, Button } from 'reactstrap';

function ConfirmationModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <div className='text-center m-4'>
          <p>{props.responseMessage}</p>
          <br/>
          <Col sm={3} style={{margin:'0 auto'}}>
            <Button color="success" onClick={()=>props.toggle()}>OK</Button>
          </Col>
        </div>
       
      </ModalBody>
    </Modal>
  );
}

export default ConfirmationModal
