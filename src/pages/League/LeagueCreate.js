import React,{useState} from 'react'
import { Container, Button, Row, Col,Form,FormGroup, Label ,Input} from 'reactstrap';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function LeagueSettings(props) {
  const [leagueType, setLeagueType] = useState(2)
  const [leagueName, setLeagueName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [registartionEndTime, setRegistartionEndTime] = useState('')
  const [registrationStartTime, setRegistrationStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [noOfPlayers, setNoOfPlayers] = useState(2)
  const [noOfParticipant, setNoOfParticipant] = useState()
  const [amount, setAmount] = useState()
  const [commission, setCommission] = useState()
  const [prizePool, setPrizePool] = useState()

  //function to reset the data field 
  const resetData = () => {
    if(leagueType !== '') setLeagueType('')
    if (leagueName !== '') setLeagueName('');
    if (startTime !== '') setStartTime('');
    if (endTime !== '') setEndTime('');
    if (registartionEndTime !== '') setRegistartionEndTime('');
    if (registrationStartTime !== '') setRegistrationStartTime('');
    if (startDate !== '') setStartDate('');
    if (endDate !== '') setEndDate('');
    if (noOfPlayers !== '') setNoOfPlayers('');
    if (noOfParticipant !== '') setNoOfParticipant('');
    if (amount !== '') setAmount('');
    if (commission !== '') setCommission('');
    if (prizePool !== '') setPrizePool('');
  } 

  return (
    <Container style={containerStyle} fluid={true}>
    <div className="d-flex flex-column align-items-center">
      <h1>League Settings</h1>
      <h3>(General)</h3><br/>
    </div>

    <Form>
      <Row>
        <Col md="12">
          <FormGroup row >
            <Label style={{fontSize:'20px'}} md={3} for="type">League Type:</Label>
            <Col md={3}>
              <Input type="select" name="league_type"  onChange={(e) => { setLeagueType(e.target.value) }} defaultValue={leagueType}>
                <option value={1} >Grand</option>
                <option value={2}>Short</option>
                <option value={3}>Practice</option>
              </Input> 
            </Col>
          </FormGroup>
          <br/>
          
          <FormGroup row>
            <Label style={{fontSize:'20px'}} md={3} for="name">League Name:</Label>
            <Col md={4}>
              <Input type="text" 
                value={leagueName}
                onChange={(e) => { setLeagueName(e.target.value) }}
              />
            </Col>
          </FormGroup>
          <br/>

          <FormGroup row>
            <Label style={{fontSize:'20px'}} md={3} for="name">League Timings:</Label>
            <Col md={9}>
            <Row>
              <Col md={3}>
                <span>Start Time
                  <Input type="time"
                    value={startTime}
                    onChange={(e) => { setStartTime(e.target.value) }}
                  />
                </span>
              </Col>
              <Col md={3}>
                <span>End Time
                  <Input type="time"
                    value={endTime}
                    onChange={(e) => { setEndTime(e.target.value) }}
                  />
                </span>
              </Col>
              <Col md={3}>
                <span>League Join registartionEndTime
                  <Input type="time"
                    value={registartionEndTime}
                    onChange={(e) => { setRegistartionEndTime(e.target.value) }}
                  />
                </span>
              </Col>
              <Col md={3}>
                <span>Registration Start Time:
                  <Input type="time"
                     value={registrationStartTime}
                     onChange={(e) => { setRegistrationStartTime(e.target.value) }}

                  />
                </span>
              </Col>
             
            </Row>
            </Col>
          </FormGroup>
          <br/>

          <FormGroup row>
            <Label style={{fontSize:'20px'}} md={3} for="name">League Dates:</Label>
            <Col md={9}>
            <Row>
              <Col md={3}>
                <span>Start Date
                  <Input type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value) }}
                  />
                </span>
              </Col>
              <Col md={3}>
                <span>End Date
                  <Input type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value) }}
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
                  min="1"
                  value={noOfPlayers}
                  onChange={(e) => { setNoOfPlayers(e.target.value) }}
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
                  value={noOfParticipant}
                  onChange={(e) => { setNoOfParticipant(e.target.value) }}
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
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value) }}
            />
          </Col>
        </FormGroup>
        <br/>

        <FormGroup row >
          <Label style={{fontSize:'20px'}} md={3} for="type">League Commission:</Label>
          <Col md={3}>
            <Input type="text"
                  placeholder="Enter % Commission"
                  value={commission}
                  onChange={(e) => { setCommission(e.target.value) }}
            />
          </Col>
        </FormGroup>
        <br/>

        <FormGroup row >
          <Label style={{fontSize:'20px'}} md={3} for="type">Prize Pool:</Label>
          <Col md={3}>
            <Input type="text"
                  placeholder="Auto Calculate"
                  value={prizePool}
                  onChange={(e) => { setPrizePool(e.target.value) }}
            />
          </Col>
        </FormGroup>
        <br/>
        </Col>
      </Row>
      <FormGroup style={{marginLeft:'10%'}}>
          <Button  onClick={() => resetData()} size="lg" color="danger" >Reset Values</Button> &emsp;&emsp;
          <Button  size="lg" color="success"  type="submit"  >Save And Next</Button>&emsp;&emsp;
          <Button  size="lg" color="primary"  type="save" >League List </Button>
        </FormGroup>
            
        {/* {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>} */}

    </Form>
     
  </Container>
  )
}

export default LeagueSettings


