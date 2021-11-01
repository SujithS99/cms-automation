import React,{useState} from 'react'
import { Modal, ModalBody, Form, Col, FormGroup, Button, Label } from 'reactstrap';
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';

function DeleteLeague(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const deleteLeague = async() => {
    //api call to delete league
    let updateData = {type: Constants.LEAGUE_DELETE, league_id:props.LeagueId};
  
    let res = await apiClient('/admin/league', 'POST', props.accessToken, updateData);
   
    if (res.responseCode === Response.STATUS_OK) {
      props.refresh();
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage)
    }
  }

  return (
    <Modal
    isOpen={props.isOpen}
    toggle={props.toggle}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ModalBody>
        <Form>
          <FormGroup style={{"textAlign": "center"}}>
          <Col sm={12}>
          <Label style={{'paddingTop': 'calc(1.375rem + 1px)', 'paddingBottom': 'calc(1.375rem + 1px)'}}>Are You sure want to delete this league?</Label>
            </Col>
          </FormGroup>
          <FormGroup style={{"textAlign": "center"}}>
          <Col sm={12}>
          <Button color="success" onClick={(e) => {deleteLeague() }}>Yes</Button> &emsp;
          <Button color="danger" onClick={props.toggle}>No</Button>
            </Col>
          </FormGroup>
        </Form>
    </ModalBody>
    {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}

  </Modal>
  )
}

export default DeleteLeague
