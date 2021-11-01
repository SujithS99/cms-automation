import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap';

function BlockPlayer(props) {
  return (
    <Modal isOpen={props.isOpen}
    size="md"
    centered>
      <ModalBody>  
        <div className='text-center'>
          <p className='m-4' style={{fontWeight:'bold'}}>Are you sure you want to <b className='text-danger'>Block </b> this player?<br/>
          This cannot be reverted
          </p>
          <Button  color="danger" onClick={()=>props.toggle()}>No</Button>&emsp;&emsp;
          <Button  color="success" onClick={()=>{props.block(); props.toggle()}} >Yes</Button>

        </div>
      </ModalBody>
    </Modal>
  )
}

export default BlockPlayer
