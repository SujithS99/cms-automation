import React,{useState} from 'react'
import { FaBan, FaPen, FaRupeeSign, FaTimesCircle, FaTrashAlt, FaUserCircle } from 'react-icons/fa'
import { Container, Row, CardTitle, Card, CardBody, CardImg, Col , Label, Button, Input} from 'reactstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PlayerDelete from './PlayerDelete';
import Constants from '../../lib/constant';
import BlockPlayer from './BlockPlayer';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import decryptResponse from '../../lib/decryptResponse';
import { MdDone } from 'react-icons/md';
import AvatarList from './AvatarList';

import '../../assets/profile/1.png'

const divCard = {
  border:'1x solid black',
  borderRadius:'22px',
  background:'cyan',
  color:'black'
}

const spanCol = {
  background:'orange',
  padding:'5px 20px',
  borderRadius:'12px',
}

const circleIcon = {
  width:'100px',
  height:'100px',
  border: '1px solid black',
  borderRadius:'50%',
  margin:'auto'
}

function PlayerDetail(props) {  
  let history = useHistory();
  let {name} = useParams();
  let {state}  = useLocation();

  const {user_id, avatar_id, profile_picture, facebook_id, username, is_hidden, followers_count, following_count, total_league_participated,total_games_won, earnings, kill_count, is_following, is_live ,search_text} = state;  

  const [deletePlayer, setDeletePlayer] = useState(false);
  const [status, setStatus] = useState(Constants.PLAYER_ACTIVE)
  const [blockConfirmation, setBlockConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(username);
  const [uploadModal, setUploadModal] = useState(false)
  const [profileId, setProfileId] = useState(profile_picture)
  const [selectedProfile, setSelectedProfile] = useState([])

  const displayTransaction = (id) => {
    // restProps.setRouteBreadCrumbs([{route: '/grade_list', title: 'Grade List'}, {route: path, 'title': subject_name}]);
    history.push(`/player_transaction/${id}`);
  }

  //api call to delete player
  const handleDelete = async () => {
    setErrorMessage('')
    let updatedData = {player_user_id:user_id, action_type:Constants.ACTION_DELETE_USER} 
    let res = await apiClient('/admin/user/action', 'POST', props.accessToken, updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      res = decryptResponse(res.responseData); 
      history.goBack()
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage);
    }
  }

  //handle to unblock pkayer
  const unBlockPlayer = async () => {
    setErrorMessage('')
    let updatedData = {player_user_id:user_id, action_type:Constants.ACTION_UNBLOCK_USER} 
    let res = await apiClient('/admin/user/action', 'POST', props.accessToken, updatedData);
  
    if (res.responseCode === Response.STATUS_OK) {
      setStatus(Constants.PLAYER_ACTIVE);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage);
    }
  }

  const HandleBlockUnblock = () => {
    if(status === Constants.PLAYER_ACTIVE) {
      setBlockConfirmation(true);
    } else {
      unBlockPlayer();
    }
  }

  const handleBlock = async() => {
    setErrorMessage('')
    let updatedData = {player_user_id:user_id, action_type:Constants.ACTION_BLOCK_USER}
    let res = await apiClient('/admin/user/action', 'POST', props.accessToken, updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      setStatus(Constants.PLAYER_BLOCKED)
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage);
    }
  }

  const UpdatePlayerName = async() => {
    setErrorMessage('')
    let updatedData = {player_user_id:user_id, action_type:Constants.ACTION_UPDATE_NAME,user_name:playerName}

    let res = await apiClient('/admin/user/action', 'POST', props.accessToken, updatedData);
    if (res.responseCode === Response.STATUS_OK) {
     setIsEdit(false)
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage);
    }
  }


  return (
    <Container >
      <div className="d-flex flex-column align-items-center"  >
        <Row>
          <h1>Player's Management</h1>
        </Row><br/><br/>
        <Row>
          <h3>Player's Profile</h3>
        </Row>
      </div>

      <Row>
      <Col md="5" style={{margin:'0 auto', alignItems:'center'}}>
       <Card style={{ borderRadius:'22px',padding:'5px'}} className='text-center'>
         <div >
           <CardImg  style={{borderRadius:'50%', width:'100px', height:'100px'}} src={profileId ? require(`../../assets/profile/${profileId}.png`) : Constants.DEFAULT_PROFILE}/>
         </div>
         <FaPen  style={{margin:'0 auto'}} onClick={()=> {setUploadModal(true)}} />
        
         <br/>
         {!isEdit && 
            <CardTitle tag="h5">{playerName?playerName:''} <FaPen onClick={()=>setIsEdit(true)} /></CardTitle>
         }
         {isEdit && 
         <Row>
           <Col md={8}>
            <Input type="text" className="text-center" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
           </Col>
           <Col md={2} >
            <Button block color="success" onClick={()=>UpdatePlayerName()}><MdDone/></Button>
           </Col>
           <Col md={2}>
            <Button block color="danger" onClick={()=>setIsEdit(false)}>X</Button>
           </Col>
          </Row>
         }
         
          <CardBody>
            <div style={divCard}>
              <Label md={10}>Number of leagues participated</Label>
              <span style={spanCol} md={2}>{total_league_participated}</span>
            </div><br/>
            <div style={divCard}>
              <Label md={10}>Number of games won</Label>
              <span style={spanCol} md={2}>{total_games_won}</span>
            </div><br/>
            <div style={divCard}>
              <Label md={10}>Following</Label>
              <span style={spanCol} md={2}>{following_count}</span>
            </div><br/><br/>
            <Row>
              <Col md={4}>
                <Label><b>Earnings</b></Label>
                <div style={circleIcon}>
                  <br/>
                  <FaRupeeSign style={{fontSize:'50px'}} /><br/>
                  <Label><b>{earnings}</b></Label><br/><br/>
                </div>
              </Col>
              <Col md={4}>
                <Label><b>Kills</b></Label>
                <div style={circleIcon}>
                  <br/>
                  <FaTimesCircle style={{fontSize:'50px'}} /><br/>
                  <Label><b>{kill_count}</b></Label><br/><br/>
                </div>
              </Col>
              <Col md={4}>
                <Label><b>Followers</b></Label>
                <div style={circleIcon}>
                  <br/>
                  <FaUserCircle style={{fontSize:'50px'}} /><br/>
                  <Label><b>{followers_count}</b></Label><br/><br/>
                </div>
              </Col>
            </Row>
            <br/>
            <Row style={{marginTop:'50px'}}>
              <Col md={6}>
                <Button color="danger" onClick={()=> setDeletePlayer(true)} block size="lg" ><FaTrashAlt/>Delete</Button>
              </Col>
              <Col md={6}>
                <Button color={status === Constants.PLAYER_ACTIVE ? 'danger': 'success'} onClick={()=> HandleBlockUnblock()} block size="lg" ><FaBan/>
                  {status === Constants.PLAYER_ACTIVE ? 'Block': 'UnBlock'}
                </Button>
              </Col>
            </Row>
          </CardBody>
          {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}

        </Card>
      </Col>
      </Row>

      <Row>
      <Col md="3" style={{margin:'0 auto', alignItems:'left'}}>
        <Button color="primary" size="lg" onClick={()=> history.push('/player_search',search_text)}>Back</Button>
      </Col>
      <Col md={6}/>
      <Col md="3" style={{margin:'0 auto', alignItems:'right'}}>
        <Button color="success" block size="lg" onClick={()=> displayTransaction(user_id)}>View All Transaction</Button>
      </Col>
      </Row>

      {/* delete popup to delete player */}
      {deletePlayer && 
        <PlayerDelete
        isOpen = {deletePlayer}
        toggle ={()=> setDeletePlayer(false)}
        delete = {() => handleDelete()}
        />
      }
    

      {/* image upload form */}
      {uploadModal && 
        <AvatarList
          isOpen={uploadModal}
          resetAccessToken={() => { props.resetAccessToken() }}
          resetAccessToken={() => { props.resetAccessToken() }}
          toggle = {() => setUploadModal(false)}
          userId = {user_id}
          accessToken = {props.accessToken}
          setProfileId={(id)=>setProfileId(id)}
        />
      }
     

      {/* COnfirmation popup to block player */}
      {blockConfirmation &&
        <BlockPlayer
          isOpen = {blockConfirmation}
          toggle ={()=> setBlockConfirmation(false)}
          block = {() => handleBlock()}
        />
    }
     
    </Container>
  )
}

export default PlayerDetail
