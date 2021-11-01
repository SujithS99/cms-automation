import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'

function LeagueCreateConfirmPopup(props) {
  return (
    <Modal isOpen={props.isOpen}
    size="md"
    centered>
      <ModalBody>
        <h1 className='text-center mt-4 mb-4'>Create League</h1>
       
        <div className='text-center'>
          <p className='m-4'>Are you sure you want to create a league with current settings?</p>
          <Button  color="danger" onClick={()=>props.toggle()}>No</Button>&emsp;&emsp;
          <Button  color="success" onClick={()=>{props.createLeague(); props.toggle()}} >Yes</Button>

        </div>
      </ModalBody>
    </Modal>
  )
}

export default LeagueCreateConfirmPopup
