import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'

function NoPlayerModal(props) {
  
  return (
    <Modal isOpen={props.isOpen}
    size="md"
    centered>
      <ModalBody>
        <h1 className='text-center mt-4 mb-4'>No Player Found</h1>
        <br/>
        <div className='text-center'>
          <Button  color="success" onClick={()=>props.toggle()}>Search Again</Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default NoPlayerModal
