import React, {useState, useEffect} from 'react'
import { Button, Row, Col,FormGroup, Label ,Input} from 'reactstrap';
import Constants from '../../lib/constant';


function GeneralForm(props) {
  const [prizePOOL, setPrizePOOL] = useState(props.prizePool);

  useEffect(() => {
  props.setPrizePool(prizePOOL)
  }, [prizePOOL])

  return (
    <Row>
    <Col md="12">
      <FormGroup row >
        <Label style={{fontSize:'20px'}} md={3} for="type">League Type:</Label>
        <Col md={3}>
          <Input type="select" name="league_type"  onChange={(e) => { props.setLeagueType(e.target.value) }} defaultValue={props.leagueType}>
            <option value={Constants.LEAGUE_GRAND} >Grand</option>
            <option value={Constants.LEAGUE_SHORT}>Short</option>
            <option value={Constants.PRACTICE_LEAGUE}>Practice</option>
          </Input> 
        </Col>
      </FormGroup>
      <br/>
      
      <FormGroup row>
        <Label style={{fontSize:'20px'}} md={3} for="name">League Name:</Label>
        <Col md={4}>
          <Input type="text" 
            value={props.leagueName}
            onChange={(e) => { props.setLeagueName(e.target.value) }}
          />
        </Col>
      </FormGroup>
      <br/>

      <FormGroup row  style={{whiteSpace:'nowrap'}}>
        <Label style={{fontSize:'20px'}} md={3} for="name">League Join Timings:</Label>
        <Col md={9}>
        <Row>
          <Col md={6}>
            <span >Registration Start Time:
              <Input type="datetime-local"
                 value={props.registrationStartTime}
                 onChange={(e) => { props.setRegistrationStartTime(e.target.value) }}

              />
            </span>
          </Col>
          <Col md={6}>
            <span>Registration End Time
              <Input type="datetime-local"
                value={props.registartionEndTime}
                onChange={(e) => { props.setRegistartionEndTime(e.target.value) }}
              />
            </span>
          </Col>
        </Row>
        </Col>
      </FormGroup>
      <br/>

      <FormGroup row>
        <Label style={{fontSize:'20px'}} md={3} for="name">League Start Dates:</Label>
        <Col md={9}>
        <Row>
        <Col md={6}>
            <span>Start Time
              <Input type="datetime-local"
                value={props.startTime}
                onChange={(e) => { props.setStartTime(e.target.value) }}
              />
            </span>
          </Col>
          <Col md={6}>
            <span >End Time
              <Input type="datetime-local"
                value={props.endTime}
                onChange={(e) => { props.setEndTime(e.target.value) }}
              />
            </span>
          </Col>
        </Row>
      </Col>
    </FormGroup>
    <br/>

    <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">Number Of Players Per Match:</Label>
      <Col md={3}>
        <Input type="number"
              min="2"
              value={props.noOfPlayers}
              onChange={(e) => { props.setNoOfPlayers(e.target.value) }}
        />
      </Col>
    </FormGroup>
    <br/>

    <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">Number Of Participants:</Label>
      <Col md={3}>
        <Input type="number"
              placeholder="Enter Number"
              min="1"
              value={props.noOfParticipant}
              onChange={(e) => { props.setNoOfParticipant(e.target.value); setPrizePOOL(e.target.value * props.amount ) }}
        />
      </Col>
    </FormGroup>
    <br/>

    <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">Entry Amount Per Participants:</Label>
      <Col md={3}>
        <Input type="number"
              placeholder="Enter Amount"
              min="1"
              value={props.amount}
              onChange={(e) => { props.setAmount(e.target.value); setPrizePOOL(props.noOfParticipant * e.target.value)}}
        />
      </Col>
    </FormGroup>
    <br/>

    <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">League Commission:</Label>
      <Col md={3}>
        <Input type="text"
              placeholder="Enter % Commission"
              value={props.commission}
              onChange={(e) => { props.setCommission(e.target.value); }}
        />
      </Col>
    </FormGroup>
    <br/>

    <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">Prize Pool:</Label>
      <Col md={3}>
        <Input type="text"
              placeholder="Auto Calculate"
              value={prizePOOL}
              disabled
        />
      </Col>
    </FormGroup>
    <br/>
    <div className="button-row d-flex mt-4" >
      <Col sm={4}>
        <Button  block onClick={() => props.resetData()} color="danger" >Reset Values</Button>
      </Col>
      <Col sm={4}>
        <Button  block color="success" className="btn btn-primary ml-auto js-btn-next" type="button" title="Next">Save And Next</Button>
      </Col>
      <Col sm={4}>
        <Button  block color="success" onClick={()=>props.displayLeagueList()} type="button" title="Next">League List</Button>
      </Col>
    </div>
    </Col>

  </Row>
  )
}

export default GeneralForm
