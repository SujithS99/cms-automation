import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Container, Col, Row } from 'reactstrap'
import ConfirmationModal from './ConfirmationModal';
import DeleteLeague from './DeleteLeague';
import LeagueSearch from './LeagueSearch'
import LeagueTable from './LeagueTable';
import LeagueTablePagination from './LeagueTablePagination';
import Constants from '../../lib/constant';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import decryptResponse from '../../lib/decryptResponse';

const leagueTable ={
  'position': 'relative', 'height':'40vh', 'overflowY':'auto'
}

function LeagueList(props) {
  const [leagueData, setLeagueData] = useState([]);
  const [leagueType, setLeagueType] = useState(Constants.LEAGUE_GRAND)
  const [leagueName, setLeagueName] = useState('')
  const [confirmation, setConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false)
  const [LeagueId, setLeagueId] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [index, setIndex] = useState(0);
  const [limit] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  React.useEffect(() => {
    setLoadMoreData(true)
    searchLeagueList()
  }, [pageNumber])
  
  const searchLeagueList = async() => {
    setError(false)
    setInProgress(true);
    let params = { league_type:leagueType, limit:limit, page:pageNumber+1};
    if(typeof leagueName !== "undefined" && leagueName.trim() !== "") params.league_name = leagueName;

    let res = await apiClient('/admin/leagueList', 'POST', props.accessToken, params);
    if (res.responseCode === Response.STATUS_OK) { 
      res = decryptResponse(res.responseData);
      setLeagueData(res.league_list);
      setIndex(res.league_count);
      if (res.league_list.length === 0)  setLoadMoreData(false);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }

    setInProgress(false);
    setLoading(false);
  }

  let history = useHistory()


  const EditModalForStarted = () => {
    setResponseMessage('Ongoing league cannot be Edited');
    setConfirmation(true);
  }

  const DeleteModalForStarted = () => {
    setResponseMessage('Ongoing league cannot be Deleted');
    setConfirmation(true);
  }

  const HandleEdit = (data) => {
    history.push('/league_edit', data);
  }

  const HandleDelete = (id) => {
   setLeagueId(id)
   setDeletePopup(true);
  }

  return (
    <Container>
      <h1 className="text-center">League List</h1>
      <div className='mt-4'>
        <LeagueSearch
          searchLeagueList={() => searchLeagueList()}
          leagueType={leagueType}  
          setLeagueType={(type)=> {setLeagueType(type)}} 
          leagueName={leagueName}
          setLeagueName={(name)=>{setLeagueName(name)}} 
        />
       
        {loading && <h1 className='text-center'>Loading...</h1>}
        {error && <h1 className="text-center">Error. Try Refreshing.</h1>}
        {(!error && leagueData.length === 0 && !loadMoreData) ? <h1 className='text-center'>No Data Found</h1> : ''}

    </div>

      <div className='mt-4 mb-4' style={leagueTable}>
        {leagueData.length !== 0 && 
           <LeagueTable
           league_type={leagueType}
           data={leagueData}
           EditModalForStarted ={()=> EditModalForStarted()}
           HandleEdit = {(data)=> HandleEdit(data)}
           DeleteModalForStarted ={()=> DeleteModalForStarted()}
           HandleDelete ={(id)=> HandleDelete(id)}

        />
        }
      
      </div>
     
      <Row>
        <Col md={3} />
        <Col md={6} style={{margin:'0 auto', alignItems:'center'}}>
          <LeagueTablePagination
            currentPage = {pageNumber}
            pagesCount = {(Math.ceil(index/limit))}
            handleClick = {(i) => {setPageNumber(i); }}
          />
        </Col>
        <Col md={3} />
      </Row>
   
      <Row>
        <Col md={5} />
        <Col md={3} style={{margin:'0 auto', alignItems:'center'}}>
          <Button  color="danger" onClick={()=>history.goBack()} >Back</Button>
        </Col>
        <Col md={3} />
      </Row>
     

        {confirmation && 
          <ConfirmationModal
            isOpen={confirmation}
            responseMessage={responseMessage}
            toggle={() => { setConfirmation(false); }}
          />
        }
      
      {deletePopup && 
        <DeleteLeague
          isOpen={deletePopup}
          toggle={() => { setDeletePopup(false); }}
          refresh={()=>{setDeletePopup(false);searchLeagueList();}}
          resetAccessToken={props.resetAccessToken}
          LeagueId={LeagueId}
          accessToken={props.accessToken}
        />
      }


    </Container>
  )
}

export default LeagueList
