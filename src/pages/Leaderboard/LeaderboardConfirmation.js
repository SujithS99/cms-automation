import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'

function LeaderboardConfirmation(props) {
  return (
    <Modal isOpen={props.isOpen}
    size="md"
    centered>
      <ModalBody>
        <h1 className='text-center mt-4 mb-6'>Leaderboard Rewards</h1>
       
        <div className='text-center'>
          <p className='m-5'>Are you sure you want to  save changes to leaderboard prizes?</p>
          <Button  color="danger" onClick={()=>props.toggle()}>No</Button>&emsp;&emsp;
          <Button  color="success" onClick={()=>{props.saveRewards(); props.toggle()}} >Yes</Button>

        </div>
      </ModalBody>
    </Modal>
  )
}

export default LeaderboardConfirmation
