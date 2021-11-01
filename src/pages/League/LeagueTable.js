import React from 'react'
import { Button, Table } from 'reactstrap'
import Constants from '../../lib/constant'

function LeagueTable({league_type, ...props}) {
  return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>League Name</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Registration status</th>
          </tr>
        </thead>
        <tbody>

          {props.data.length !==0 &&  props.data.map(({can_delete,can_edit,end_time,entry_amount,league_commission,league_id,
          max_participant,max_player,name,participant_count, prize_pool,prize_scheme,registration_end_time, registration_start_time,start_time,status}, i) => 
          <tr key={i}>
            <td>{name}</td>
            <td style={can_edit ? { opacity:'1' } : { opacity:'0.2' }}>
            <Button onClick={()=> { can_edit ? props.HandleEdit({league_type,end_time,entry_amount,league_commission,league_id,max_participant,max_player,name,participant_count, prize_pool,prize_scheme,registration_end_time, registration_start_time,start_time,status}): props.EditModalForStarted()}} color="success">Edit</Button>

            </td>
            <td style={can_delete ? { opacity:'1' } : { opacity:'0.2' }}>
              <Button onClick={()=> { can_delete ? props.HandleDelete(league_id): props.DeleteModalForStarted()}} color="danger">Delete</Button>
            </td>
            <td style={Constants.CURRENT_TIME > registration_start_time ? { color:'green' } : { color:'red' }}>{Constants.CURRENT_TIME > registration_start_time ? 'Started' : 'Not Started'}</td>
          </tr>
          )}
        </tbody>
      </Table>
    
   
  )
}

export default LeagueTable