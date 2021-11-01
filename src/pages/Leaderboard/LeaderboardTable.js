import React,{useState} from 'react'
import Constants from '../../lib/constant'
import { FaPen } from 'react-icons/fa';
import {Table, Form, FormGroup, Button , Input} from 'reactstrap';

function LeaderboardTable({leaderBoardData, setLeaderBoardData, leaderbordType,isEdit,setIsEdit, handleChange,  ...props}) {  
  const [populateRow, setPopulateRow] = useState([])

  //dynamically add item to array
  const handleAdd = (e) => {
    e.preventDefault();
    let rank = leaderBoardData.length +1;

    let item = {
      leaderboard_reward_type:leaderbordType,
      player_rank:rank,
      reward_type: Constants.REWARD_CASH,
      reward:'20',
      reward_description:'XXX'
      
    };

    populateRow.push(item);

    setPopulateRow(populateRow)
    setLeaderBoardData(item)
  }

  return (
    <Form>
      <h3 style={{marginTop:"50px"}}>{leaderbordType===Constants.WEEKLY_LEADERBOARD?"Weekly":"Monthly"} Leaderboard Prize Allocation</h3>
      <Table responsive hover bordered>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          <th>Player's Rank</th>
          <th>Type of Reward</th>
          <th>Reward</th>
          <th>Reward Description</th>
        </tr>
      </thead>
      <tbody>
      {leaderBoardData.map(({player_rank, reward_type, reward, reward_description}, index) => (
        <tr key={index} className="text-capitalize align-middle text-center">
          <td>{player_rank}</td>
          <td>
            <Input type="select" name="reward_type"  onChange={(e)=> handleChange(e, player_rank, 1,index)} defaultValue={reward_type}>
              <option value={Constants.REWARD_CASH} >Cash</option>
              <option value={Constants.REWARD_PHYSICAL}>Physical</option>
            </Input>
          </td>
  
          <td>
            {isEdit[index] && 
              <Input type="text" 
                      value={reward} name='reward_count'
                      onChange={(e)=> handleChange(e,player_rank, 2,index)}
                      onMouseOut={(e)=> {  setIsEdit({})}}
              />
            }
            {!isEdit[index] && 
              <span>
                {reward} <FaPen onClick={()=>setIsEdit({...isEdit, [index]:true})}/>
              </span>
            }
          </td>
        
          <td>
            {(isEdit[index] && reward_type === Constants.REWARD_PHYSICAL) && 
              <Input type="text" 
                      value={reward_type === Constants.REWARD_PHYSICAL ?reward_description:'N/A'} name='reward_description'
                      onChange={(e)=> handleChange(e, player_rank,3,index)} 
                      onMouseOut={(e)=> { setIsEdit({})}}
              />
            }
            {!isEdit[index] && 
              <span>
                {reward_type === Constants.REWARD_PHYSICAL ?reward_description:'N/A'}
                {reward_type === Constants.REWARD_PHYSICAL ? <FaPen onClick={()=>setIsEdit({...isEdit, [index]:true})} /> : ''} 
              </span>
            }
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
    <FormGroup style={{"textAlign": "center"}}>
      <Button  size="lg" color="success"  type="button" onClick = {handleAdd}  >Add Row</Button>&emsp;&emsp;
      <Button  size="lg" color="success"  type="button"  onClick={props.HandleClick} >Save Changes</Button>
    </FormGroup>
  </Form> 
  )
}

export default LeaderboardTable
