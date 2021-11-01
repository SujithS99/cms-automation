import React, {useState} from 'react'
import { useHistory,useParams } from 'react-router-dom';
import { Table , Container, Button} from 'reactstrap';
import Constants from '../../lib/constant';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import decryptResponse from '../../lib/decryptResponse';

function PlayerTransaction(props) {
  const [transactionData, setTransactionData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);

  let history = useHistory();
  let {id} = useParams();

   // api call to get user transaction 
   const getTransactionList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    const params = {player_user_id:id};
    let res = await apiClient('/admin/user/transaction', 'POST', props.accessToken, params);

    if (res.responseCode === Response.STATUS_OK) {   
      res = decryptResponse(res.responseData);
     
      setTransactionData(res.user_transaction_list);
      if (res.user_transaction_list.length === 0) setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
    setInProgress(false);
    setLoading(false);
  }


  return (
   
    <Container >
      <div className="d-flex flex-column align-items-center" style={{width:'70%',margin :'0 auto'}}>
      <h3 style={{marginTop:"50px"}}>Player's Transaction</h3>
     
      <Table responsive hover bordered>
        <thead>
          <tr className="text-capitalize align-middle text-center">
            <th>Debit/Credit</th>
            <th>Transactions Name</th>
            <th>Amount</th>
          </tr>
        </thead>
     
      {transactionData.length !== 0 && 
        <tbody>
        {transactionData.map(({transaction_type,transaction_name, amount}, i) => (
          <tr key={i} className="text-capitalize align-middle text-center">
            <td>{transaction_type }</td>
            <td>{transaction_name}</td>
            <td>{amount}</td>
          </tr>
        ))}
        </tbody>
      }
      </Table>

      {loading && <h1 className='text-center'>Loading...</h1>}
      {error && <h1 className="text-center">Error. Try Refreshing.</h1>}
      {!error && transactionData.length === 0 && ((!inProgress && getTransactionList(true) && false) || (!loading && (!loadMoreData ? <h1 className='text-center'>No Data found</h1> : <h1 className='text-center'>Loading...</h1>)))}

      </div>
      <div style={{marginTop:'45vh'}}>
        <Button style={{float:'left'}} color="primary" size="lg" onClick={()=> history.goBack()}>Back</Button>
      </div>
      </Container>

  )
}

export default PlayerTransaction
