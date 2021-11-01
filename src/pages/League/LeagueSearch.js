import React from 'react'
import { FormGroup, Form,Input, Col,Label, Button } from 'reactstrap'

function LeagueSearch(props) {
 
  return (
    <Form >
      <FormGroup row>
          <Label style={{fontSize:'20px'}} md={3} for="name">Search League:</Label>
          <Col md={4}>
            <Input type="text" 
              value={props.leagueName}
              placeholder="Enter League Name"
              onChange={(e) => { props.setLeagueName(e.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label style={{fontSize:'20px'}} md={3} for="type">Type of League:</Label>
          <Col md={4}>
            <Input type="select" name="league_type"  onChange={(e) => { props.setLeagueType(e.target.value) }} defaultValue={props.leagueType}>
              <option value={1} >Grand</option>
              <option value={2}>Short</option>
            </Input> 
          </Col>
          <Col md={3}>
            <Button block color="success" type="button" onClick={()=> props.searchLeagueList()} >Search</Button>
          </Col>
        </FormGroup>

     
      
     
      <br/>
        </Form>   
  )
}

export default LeagueSearch
