import React,{useState, useEffect} from 'react'
import { Container, Button, Row, Col,Form,FormGroup, Label ,Input} from 'reactstrap';
import Constants from '../../lib/constant';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import ConfirmationModal from '../League/ConfirmationModal';
import decryptResponse from "../../lib/decryptResponse";

function GameplaySettings(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [timeLimit, setTimeLimit] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [responseMsg, setResponseMsg] = useState('')

  useEffect(() => {
    getGameSettings();
    props.setRouteBreadCrumbs([{route: '/gameplay_settings', title: 'Gameplay Settings'}]);
  }, [])

   // api call to get settings detail
   const getGameSettings = async () => {
    let res = await apiClient('admin/game/settings', 'POST', props.accessToken, {});
  
    if (res.responseCode === Response.STATUS_OK) {     
      res = decryptResponse(res.responseData);
      let hhmm = new Date(res.time_limit * 1000).toISOString().substr(11, 5)
      setTimeLimit(hhmm);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setTimeLimit('00:00');
      setErrorMessage(props.responseMessage)
    }

  }

  //on submitting the form, updating game settings
  const updateGameSettings = async (e) => {
    e.preventDefault();
    setErrorMessage('')
    //making api call to update data
    let updatedData = {update_type:Constants.TYPE_TIME_LIMIT}
    if (typeof timeLimit !== "undefined" && timeLimit.trim() !== "") {
      let time = timeLimit.split(':');
      let seconds = time[0]*3600;
      seconds += time[1] * 60;
      updatedData.time_limit  = seconds 
    }
  
    const res = await apiClient('/admin/game/settingsUpdate', 'POST', props.accessToken, updatedData);
    
    if (res.responseCode === Response.STATUS_OK) {
      setResponseMsg('Updated successfully')
      setConfirmation(true);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  return (
    <Container >
      <div className="d-flex flex-column align-items-center"  >
        <Row>
          <h1>Gameplay Settings</h1>
        </Row>
      </div>
        <br/><br/>
        <Form onSubmit={updateGameSettings}>
          <Row className='align-items-center'>
            <Col md="12">
              <FormGroup row >
                <Col md="3"/>
                <Label style={{fontSize:'20px'}} md={3} for="timelimit">Time Limit Per Game:</Label>
                <Col md={3}>
                  <Input 
                    type="time" placeholder="hh:mm" value={timeLimit} name="timelimit"
                    onChange={(e) => { setTimeLimit(e.target.value);}}   
                  />
                </Col>
              </FormGroup>
           
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <br/>
          <FormGroup style={{"textAlign": "center"}}>
            <Button  size="lg" color="danger" onClick={()=>getGameSettings()}> Discard Changes </Button> &emsp;&emsp;&emsp;&emsp;
            <Button  size="lg" color="success"  type="submit"  >Save Changes</Button>
          </FormGroup>
            
          {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
            
        </Form>
     
     {confirmation &&
        <ConfirmationModal
          isOpen={confirmation}
          responseMessage={responseMsg}
          toggle={() => { setConfirmation(false); }}
        />
     }
    </Container>
  )
}

export default GameplaySettings
