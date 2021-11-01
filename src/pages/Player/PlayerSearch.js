import React,{useState,useEffect} from 'react'
import { Container, Button, Row, Col,Form,FormGroup, Label ,Input} from 'reactstrap';
import {useLocation } from 'react-router-dom';
import NoPlayerModal from './NoPlayerModal';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import Constants from '../../lib/constant';
import decryptResponse from '../../lib/decryptResponse';
import PlayerCard from './PlayerCard';

function PlayerSearch(props) {
  const [name, setName] = useState('');
  const [noPlayerPopup, setNoPlayerPopup] = useState(false)
  const [playerData, setPlayerData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  let {state}  = useLocation();

  //loading the search history on component update
  useEffect(() => {
    if(typeof state !== "undefined" && state !== "" && state !==null)
    {
      setName(state)
      getPlayerDetail(state)
    }
  }, [state])

   // api call to get player detail
   const getPlayerDetail = async (name) => {
     if(name === '') {setErrorMessage("Please enter search text"); return;}

    const params = {search_text:name};
    let res = await apiClient('/admin/user/search', 'POST', props.accessToken, params);
    if (res.responseCode === Response.STATUS_OK) { 
      res = decryptResponse(res.responseData);
      if (res.user_list.length === 0) {setNoPlayerPopup(true);return}
    
      setPlayerData(res.user_list);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }
  
  useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/player_search', title: 'Player\'s Management'}]);
  }, [])

  return (
    <Container >
      <div className="d-flex flex-column align-items-center"  >
        <Row>
          <h1>Player's Management</h1>
        </Row>
      </div>
        <br/><br/>
        <Form>
          <Row className='align-items-center'>
            <Col md="12">
              <FormGroup row >
                <Col md="3"/>
               
                <Label style={{fontSize:'20px'}} md={2} for="name">Player's Name:</Label>
                <Col md={4}>
                  <Input 
                    type="text" placeholder="Player's Name" value={name} name="name"
                    onChange={(e) => { setName(e.target.value);}}   
                  />
                  <p style={{color:'rgb(245 245 34)', fontWeight:"700"}}>Case sensitive!</p>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup style={{"textAlign": "center"}}>
            <Button  size="lg" color="success"  onClick={() => getPlayerDetail(name)}>Search</Button>
          </FormGroup>
            
          {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
        </Form>

        {playerData.length !== 0 && 
          <PlayerCard
            data={playerData}
            searchText={name}
            setRouteBreadCrumbs={props.setRouteBreadCrumbs}
          />
        }

        {noPlayerPopup && 
          <NoPlayerModal
          isOpen={noPlayerPopup}
          toggle = {()=>setNoPlayerPopup(false)}
        />
        }
     
     
    </Container>
  )
}

export default PlayerSearch
