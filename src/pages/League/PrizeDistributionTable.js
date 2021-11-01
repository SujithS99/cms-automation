import React, {useState} from 'react'
import { FaPen } from 'react-icons/fa'
import { Row, Button ,Col, FormGroup,Label,Input, Table} from 'reactstrap'
import Constants from '../../lib/constant'

function PrizeDistributionTable({prizeData,setPrizeData, isEdit, setIsEdit, handleChange,...props}) {
  const [populateRow, setPopulateRow] = useState([])


  const handleAdd = (e) => {
    e.preventDefault();
    let length = prizeData.length + populateRow.length;
    let minRank =  ((length*2) + 1);
    let maxRank =  ((length*2) + 4);

    let item = {
      min_rank:minRank,
      max_rank:maxRank,
      percentage:3,
      amount:(3*props.prizePool /(100))
    };

    populateRow.push( item);

    setPopulateRow(populateRow)
    setPrizeData(item)
  }


  return (
    <Row>
      <Col md="12">
      <FormGroup row >
      <Label style={{fontSize:'20px'}} md={3} for="type">Number Of Winners:</Label>
      <Col md={3}>
        <Input type="number"
              placeholder="Enter Number"
              min="1"
              value={props.noOfWinners}
              onChange={(e) => { props.setNoOfWinners(e.target.value) }}
        />
      </Col>
    </FormGroup>
    <br/>
    <div className="d-flex flex-column align-items-center">
      <h3 className="header__title">Prize Distribution Scheme Editor</h3><br/>
      <Table bordered hover responsive>
        <thead>
          <tr className="text-capitalize align-middle text-center">
            <th>Player's Rank</th>
            <th>%Ratio of Rewards</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {prizeData.map(({min_rank, max_rank, percentage, amount}, i) => 
            <tr className="text-capitalize align-middle text-center" key={i}>
              <td>
              {isEdit[i] && 
                <Input type="text" 
                        value={min_rank===max_rank ? min_rank : min_rank+'-'+ max_rank} name='rank'
                        onChange={(e)=> handleChange(e,1,i)} 
                        onMouseOut={(e)=> { setIsEdit({})}}
                />
              }
              {!isEdit[i] && 
                <span>
                  {min_rank}{min_rank===max_rank ? '' : '-'+ max_rank} <FaPen onClick={()=>setIsEdit({...isEdit, [i]:true})} />
                </span>

              }
                </td>
              <td>
              {isEdit[i] && 
                <Input type="text" 
                        value={percentage} name='percentage'
                        onChange={(e)=> handleChange(e,2,i)} 
                        onMouseOut={(e)=> { setIsEdit({})}}
                />
              }
              {!isEdit[i] && 
                <span>
                {percentage+'%'} <FaPen onClick={()=>setIsEdit({...isEdit, [i]:true})} />
                </span>
              }
                </td>
              <td>{amount}</td>
            </tr>
          )}

        </tbody>
      </Table>
    </div>
      <br/>
       <div className="button-row d-flex mt-4" >
         <Col sm={4}>
          <Button  block color="danger" onClick={()=> setIsEdit({})} className="btn btn-primary js-btn-prev" type="button" title="Prev">Back</Button>
         </Col>
         <Col sm={4}>
          <Button block color="success"  onClick={handleAdd} type="button" >Add Row</Button>
         </Col>
         <Col md={4}>
          <Button block color="success" className="btn btn-success" type="button" title="Send" onClick={(e)=> {props.onSubmit(e)}}>{props.type === Constants.LEAGUE_EDIT ? 'Update League' : 'Create League'}</Button>
          </Col>
        </div>
      </Col>
    </Row>
  )
}

export default PrizeDistributionTable
