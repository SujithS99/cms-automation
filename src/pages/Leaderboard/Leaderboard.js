import React,{useState,useEffect} from 'react'
import { Container, Button, Row, Col} from 'reactstrap';
import Constants from '../../lib/constant';
import LeaderboardConfirmation from './LeaderboardConfirmation';
import LeaderboardTable from './LeaderboardTable';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import decryptResponse from '../../lib/decryptResponse';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function Leaderboard(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [leaderbordType, setLeaderbordType] = useState(Constants.WEEKLY_LEADERBOARD)
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [confirmationPopup, setConfirmationPopup] = useState(false)
  const [isEdit, setIsEdit] = React.useState({});
  const [errorMessage, setErrorMessage] = useState("");


  // useEffect(() => {
  //  setLeaderBoardData(data)
  // }, [])


  // api call to get leaderboard data
  const getLeaderboardList = async (reset,leaderBoardRewardType) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    const params = {leaderboard_reward_type:leaderBoardRewardType};
    let res = await apiClient('/admin/leaderboard/rewardList', 'POST', props.accessToken, params); 
    if (res.responseCode === Response.STATUS_OK) {  
      res = decryptResponse(res.responseData);
      setLeaderBoardData(res.leaderboard_reward_list);
      if (res.leaderboard_reward_list.length === 0) setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }

  //on Change names, store it in object data
  const handleChange = (evt,rank, type,index) => {
    let editData = leaderBoardData;
    let newItem = leaderBoardData[index];
   
    if(type === 1) newItem.reward_type = parseInt(evt.target.value);
    else if(type === 2)  newItem.reward = evt.target.value
    else  newItem.reward_description = evt.target.value;
  
    editData[index] = newItem;
    setLeaderBoardData([...editData]);
  }

  const saveRewards = async (e) => {
    //api call to save changes
  //  e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {leaderboard_reward_type:leaderbordType, reward_data:JSON.stringify(leaderBoardData)}
    setIsEdit({});
   
    let res = await apiClient('/admin/leaderboard/reward', 'POST', props.accessToken, updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      setIsEdit({});
      //call func to load list again
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/leaderboard', title: 'Leaderboard Rewards'}]);
  }, [])

  const handleRewadTypeChange = (type) => {
    setLeaderbordType(type);
    setLeaderBoardData([])
    getLeaderboardList(true,type);
    setIsEdit({})
  }


  return (
    <Container style={containerStyle}>
       <div className="d-flex flex-column align-items-center"  >
        <h1>Leaderboard Rewards Settings</h1> <br/><br/>
      </div>
        <Row>
          <Col md={6}>
            <Button  block onClick={() => handleRewadTypeChange(Constants.WEEKLY_LEADERBOARD)} 
              color={leaderbordType===Constants.WEEKLY_LEADERBOARD? "success":"danger"} size="lg" > Weekly Leaderboard 
            </Button>
          </Col>
          <Col md={6}>
            <Button block onClick={() => handleRewadTypeChange(Constants.MONTHLY_LEADERBOARD)}
              color={leaderbordType===Constants.MONTHLY_LEADERBOARD? "success":"danger"} size="lg" > Monthly Leaderboard 
            </Button>
          </Col>
        </Row>
        <br/> <br/>
        {loading && <h1 className='text-center'>Loading...</h1>}
        {error && <h1 className="text-center">Error. Try Refreshing.</h1>}
        {!error && leaderBoardData.length === 0 && ((!inProgress && getLeaderboardList(true, leaderbordType) && false) || (!loading && (!loadMoreData ? <h1 className='text-center'>No Data found</h1> : <h1 className='text-center'>Loading...</h1>)))}

        {leaderBoardData.length !== 0 && 
          <LeaderboardTable
          leaderbordType = {leaderbordType}
          leaderBoardData={leaderBoardData}
          setLeaderBoardData = {(obj) => { setLeaderBoardData([...leaderBoardData, obj])}}
          HandleClick = {()=> {setConfirmationPopup(true)}}
          setIsEdit={setIsEdit}
          isEdit = {isEdit}
          handleChange = {handleChange}

        />
        }
         
        

        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}

        {confirmationPopup && 
        <LeaderboardConfirmation
          isOpen = {confirmationPopup}
          toggle = {() => {setConfirmationPopup(false)}}
          saveRewards = {saveRewards}
        />}


    </Container>
  )
}

export default Leaderboard
