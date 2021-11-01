import React , {useState,useEffect} from 'react'
import { FaPen } from 'react-icons/fa';
import { Container, Table, Button, Input, Row, Col } from 'reactstrap';
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import decryptResponse from '../../lib/decryptResponse';
import Response from '../../lib/Response';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function MissionAndRewardList(props) {
  const [reward, setReward] = React.useState('')
  const [isEdit, setIsEdit] = React.useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [missionData, setMissionData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  // const [missionId, setMissionId] = useState('');
  // const [rewardvalue, setRewardvalue] = useState('')

   // api call to get mission list
   const getMissionList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    let res = await apiClient('/admin/missionList', 'POST', props.accessToken, {});
    if (res.responseCode === Response.STATUS_OK) {    
      res = decryptResponse(res.responseData);
      setMissionData(res.mission_list);
      if (res.mission_list.length === 0) setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/mission_and_reward', title: 'Mission And Rewards'}]);
  }, [])
  

  //api call to update details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {}

    let missionRewards = [];
    Object.keys(reward).forEach(key => missionRewards.push({
      mission_id: key,
      mission_reward: reward[key]
    }));
    updatedData.mission_data = JSON.stringify(missionRewards);
   
    // if (typeof missionId !== "undefined" && missionId.trim() !== "") updatedData.mission_id  = parseInt(missionId);
    // if (typeof rewardvalue !== "undefined" && rewardvalue.trim() !== "") updatedData.reward  = parseInt(rewardvalue);

    const res = await apiClient('/admin/mission', 'POST', props.accessToken, updatedData);
  
    if (res.responseCode === Response.STATUS_OK) {
      setIsEdit({});
      getMissionList();
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  //on Change names, store it in object data
  const handleChange = (evt) => {
    const value = evt.target.value;
  
    // setMissionId(evt.target.name);
    // setRewardvalue(value);

    setReward({
      ...reward,
      [evt.target.name]: value
    });
  }

  return (
    <Container style={containerStyle}  >
      <h1 className='text-center'>Mission and Rewards Settings</h1><br/><br/>
      <div className="d-flex flex-column align-items-center">
        <h3>Mission And Rewards Table</h3><br/>
         
          {loading && <h1 className='text-center'>Loading...</h1>}
          {error && <h1 className="text-center">Error. Try Refreshing.</h1>}
          {!error && missionData.length === 0 && ((!inProgress && getMissionList(true) && false) || (!loading && (!loadMoreData ? <h1 className='text-center'>No Data found</h1> : <h1 className='text-center'>Loading...</h1>)))}
          {missionData.length !== 0 && 
          <Table responsive hover bordered>
            <thead>
              <tr className="text-capitalize align-middle text-center">
                <th>Mission</th>
                <th>Rewards<br/>(Cash Bonus)</th>
              </tr>
            </thead>
         
           
              <tbody>
                { missionData.map(({mission_id, mission_name, mission_reward}, index) => 
                  <tr key={index}>
                    <td>{mission_name}</td>
                    {isEdit[mission_id] && 
                      <td><Input type="text" 
                        value={(mission_reward && reward[mission_id] === undefined) ? mission_reward :(reward[mission_id]?reward[mission_id] : '')} name={mission_id}
                        onChange={(e)=> handleChange(e)}
                        onMouseOut={(e)=> {  setIsEdit({})}}
                        /></td>
                    }
                    {!isEdit[mission_id] && 
                      <td  className="text-capitalize align-middle text-center">{(mission_reward && reward[mission_id] === undefined) ? mission_reward :(reward[mission_id]?reward[mission_id] : '')} <FaPen onClick={()=>setIsEdit({...isEdit, [mission_id]:true})}/></td>
                    }
                  </tr>
                  )}
                </tbody>
            
          </Table>
          }
          {missionData.length !== 0 && 
            <Row>
              <Col md={1} />
              <Col md={10} style={{margin:'0 auto'}}>
              <Button  block size="lg" color="success"  type="button" onClick={handleSubmit}>Save Changes</Button>

              </Col>
              <Col md={1} />
            </Row>
          }
  
          {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
       
      </div>
    </Container>
  )
}

export default MissionAndRewardList
