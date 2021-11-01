import React,{useState,useEffect} from 'react'
import { Container, Button, Row, Col,Form,FormGroup, Label ,Input} from 'reactstrap';
import ConfirmationModal from '../League/ConfirmationModal';
import Constants from '../../lib/constant';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import decryptResponse from "../../lib/decryptResponse";

function CustomLeagueSettings(props) {
  const [commission, setCommission] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const [confirmation, setConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);

  //function to reset the data field 
  const resetData = () => {
    if(commission !== '') setCommission('')
  }
  
  const confirmationModal = (message) => {
    setResponseMessage(message);
    setConfirmation(true);
  }

  useEffect(() => {
    props.setRouteBreadCrumbs([{route: '/custom_league', title: 'Custom League'}]);
    getGameSettings()
  }, [])

   // api call to get settings detail
   const getGameSettings = async () => {
    let res = await apiClient('/admin/game/settings', 'POST', props.accessToken, {});
    if (res.responseCode === Response.STATUS_OK) {     
      res = decryptResponse(res.responseData);
      setCommission(res.commission_percentage);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setCommission('0');
      setErrorMessage('');
    }

  }
  //on submitting the form, updating game commission
  const updateGameSettings = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    //making api call to update data
    let updatedData = {update_type:Constants.TYPE_COMMISSION}
    if (typeof commission !== "undefined" && commission.trim() !== "") updatedData.commission_percentage  = parseInt(commission);
   
    let res = await apiClient('/admin/game/settingsUpdate', 'POST', props.accessToken, updatedData);

    if (res.responseCode === Response.STATUS_OK) {
      res = decryptResponse(res.responseData); 
      confirmationModal('Changes Saved For Custom Leagues');
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  return (
    <Container >
      <div className="d-flex flex-column align-items-center"  >
        <h1>Custom League Settings</h1>
      </div>
      <br/><br/>
      <Form onSubmit={updateGameSettings}>
        <Row className='align-items-center'>
          <Col md="12">
            <FormGroup row >
              <Col md="1"/>
              <Label style={{fontSize:'20px'}} md={5} for="commission">Commission For The Creator of The League:</Label>
              <Col md={3}>
                <Input 
                  type="text" placeholder="% of Commission" value={commission?commission:'0'} name="commission"
                  onChange={(e) => { setCommission(e.target.value);}}   
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
          <Button  onClick = {()=> resetData()} size="lg" color="danger" > Reset Value </Button> &emsp;&emsp;&emsp;&emsp;
          <Button  size="lg" color="success"  type="submit"  >Save Changes</Button>
        </FormGroup>
          
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
          
      </Form>
    {/* </div> */}

    {confirmation &&
    <ConfirmationModal
      isOpen={confirmation}
      responseMessage={responseMessage}
      toggle={() => { setConfirmation(false); }}
    />}
   
  </Container>
  )
}

export default CustomLeagueSettings
