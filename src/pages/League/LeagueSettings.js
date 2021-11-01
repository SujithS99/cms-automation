import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Container} from 'reactstrap';
import '../../styles/LeagueForm.css'
import ConfirmationModal from './ConfirmationModal';
import GeneralForm from './GeneralForm';
import LeagueCreateConfirmPopup from './LeagueCreateConfirmPopup';
import PrizeDistributionTable from './PrizeDistributionTable';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import Constants from '../../lib/constant';
import decryptResponse from '../../lib/decryptResponse';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function LeagueSettings(props) {
  const [step, setStep] = useState(0);
  const [createConfirmationPopup, setCreateConfirmationPopup] = useState(false)
  const [confirmation, setConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [leagueType, setLeagueType] = useState(Constants.LEAGUE_GRAND)
  const [leagueName, setLeagueName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [registartionEndTime, setRegistartionEndTime] = useState('')
  const [registrationStartTime, setRegistrationStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [noOfPlayers, setNoOfPlayers] = useState(2)
  const [noOfParticipant, setNoOfParticipant] = useState('')
  const [amount, setAmount] = useState('')
  const [commission, setCommission] = useState('')
  const [noOfWinners, setNoOfWinners] = useState('')
  const [prizePool, setPrizePool] = useState(0)
  const [prizeData, setPrizeData] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const [isEdit, setIsEdit] = useState({})

  //function to reset the data field 
  const resetData = () => {
    if (leagueType !== '') setLeagueType('')
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

  //prize distribution data
  let item = [{
    min_rank:1,
    max_rank:1,
    percentage:50,
    amount:(50*prizePool /100)
  },{
    min_rank:2,
    max_rank:2,
    percentage:20,
    amount:(20*prizePool /100)
  },{
    min_rank:3,
    max_rank:3,
    percentage:10,
    amount:(10*prizePool /100)
  },{
    min_rank:4,
    max_rank:7,
    percentage:8,
    amount:(8*prizePool /100)
  },{
    min_rank:8,
    max_rank:10,
    percentage:5,
    amount:(5*prizePool /100)
  }];


  useEffect(() => {
  setPrizeData(item)
  }, [prizePool])



  let history = useHistory();
  const displayLeagueList = () => {
    let path = `/league_list`;
    history.push(path);
  }

  //PREV/NEXT BTNS CLICK
  const handleformClick = (e) => {
    const eventTarget = e.target;

    //check if we clicked on `PREV` or NEXT` buttons
    if (!(eventTarget.classList.contains(`${'js-btn-prev'}`) || eventTarget.classList.contains(`${'js-btn-next'}`))) {
        return;
    }

    //find active panel
    let activePanelNum = step;
    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${'js-btn-prev'}`)) {
        activePanelNum--;
    } else {
        activePanelNum++;
    }
    
    setStep(activePanelNum);
}

const onSubmit = (e) => {
  e.preventDefault();
  setCreateConfirmationPopup(true);
}

//api call to create league 
const createLeague = async() => {
  let updateData = {};
  setIsEdit({})

  if (typeof leagueType !== "undefined") updateData.league_type  = leagueType;
  if (typeof leagueName !== "undefined" && leagueName.trim() !== "") updateData.name = leagueName;
  if (typeof noOfPlayers !== "undefined" ) updateData.max_player = noOfPlayers;
  if (typeof noOfParticipant !== "undefined") updateData.max_participant  = noOfParticipant;
  if (typeof registartionEndTime !== "undefined" && registartionEndTime.trim() !== "") updateData.registration_end_time  = ((Date.parse(registartionEndTime)) / 1000) ;
  if (typeof startTime !== "undefined" && startTime.trim() !== "") updateData.start_time  = ((Date.parse(startTime)) / 1000) ;
  if (typeof registrationStartTime !== "undefined" && registrationStartTime.trim() !== "") updateData.registration_start_time  = ((Date.parse(registrationStartTime)) / 1000);
  if (typeof endTime !== "undefined" && endTime.trim() !== "") updateData.end_time   = ((Date.parse(endTime)) / 1000) ;
  if (typeof amount !== "undefined") updateData.entry_amount   = amount;
  if (typeof commission !== "undefined") updateData.league_commission = commission;
  if (typeof prizeData !== "undefined") updateData.prize_scheme = JSON.stringify(prizeData);
  if (typeof noOfWinners !== "undefined") updateData.winner_count   = noOfWinners;

  updateData.decrypt = Constants.DECRYPT;
  updateData.type = Constants.LEAGUE_CREATE;

  let res = await apiClient('/admin/league', 'POST', props.accessToken, updateData);
 
  if (res.responseCode === Response.STATUS_OK) {
    res= decryptResponse(res.responseData);
    confirmationModal('League Created');
  } else if (res.responseCode === Response.TOKEN_EXPIRED) {
    props.resetAccessToken();
  } else {
    setErrorMessage(res.responseMessage)
  }
}

const confirmationModal = (message) => {
  setResponseMessage(message);
  setConfirmation(true);
}

useEffect(() => {
  props.setRouteBreadCrumbs([{route: '/league_settings', title: 'League Settings'}]);
}, [])

  //on Change names, store it in object data
  const handleChange = (evt, type,index) => {
    let editData = prizeData;
    let newItem = prizeData[index];
   
    if(type === 1) {
      let rank = evt.target.value.split('-')
      newItem.min_rank = rank[0];
      newItem.max_rank = (rank.length === 1)?rank[0] : rank[1]
    }
    else if(type === 2)  {
      newItem.percentage = evt.target.value;
      newItem.amount = ((prizePool*evt.target.value) / 100);
    }
    else  newItem.amount = evt.target.value;
  
    editData[index] = newItem;
    setPrizeData([...editData]);
  }


  return (
    <Container style={containerStyle} fluid={true}>
       <div className="d-flex flex-column align-items-center">
          <header className="header">
            <h1 className="header__title">League Settings</h1>
          </header>
        </div>

          {/* form panels */}
          <div className="row">
            <div className="col-12 col-lg-8 m-auto">
              <form onClick={(e) => { handleformClick(e) }} id="myform">
                  {step === 0 && 
                    <div>
                       <div className="d-flex flex-column align-items-center">
                        <h3 className="header__title">(General)</h3><br/>
                       </div>
                    
                      <GeneralForm
                          leagueType={leagueType}  
                          setLeagueType={(type)=> {setLeagueType(type)}} 
                          leagueName={leagueName}
                          setLeagueName={(name)=>{setLeagueName(name)}} 
                          startTime={startTime}
                          setStartTime={(time)=>{setStartTime(time)}}
                          endTime={endTime}
                          setEndTime={(time)=>{setEndTime(time)}}
                          registartionEndTime={registartionEndTime}
                          setRegistartionEndTime={(time)=>{setRegistartionEndTime(time)}}
                          registrationStartTime={registrationStartTime}
                          setRegistrationStartTime={(time)=>{setRegistrationStartTime(time)}}
                          startDate={startDate}
                          setStartDate={(date)=>{setStartDate(date)}}
                          endDate={endDate}
                          setEndDate={(date)=>{setEndDate(date)}}
                          noOfPlayers={noOfPlayers}
                          setNoOfPlayers={(num)=>{setNoOfPlayers(num)}}
                          noOfParticipant={noOfParticipant}
                          setNoOfParticipant={(num)=>{setNoOfParticipant(num)}}
                          amount={amount}
                          setAmount={(num)=>{setAmount(num)}}
                          commission={commission}
                          setCommission={(num)=>{setCommission(num)}}
                          prizePool={prizePool}
                          setPrizePool={(prize)=>{setPrizePool(prize)}}
                          resetData={()=>{resetData()}}
                          displayLeagueList ={()=> {displayLeagueList()}}
                                    
                      />
                    </div>
                   }
                    {step === 1 && 
                      <div>
                        <div className="d-flex flex-column align-items-center">
                          <h3 className="header__title">(Prize Distribution)</h3><br/>
                       </div>
                        <PrizeDistributionTable
                          noOfWinners={noOfWinners}
                          setNoOfWinners = {(val)=>setNoOfWinners(val)}
                          prizeData={prizeData}  
                          setPrizeData={(obj)=> {setPrizeData([...prizeData, obj])}}   
                          setIsEdit={setIsEdit}
                          isEdit = {isEdit}
                          handleChange = {handleChange} 
                          onSubmit={(e)=> {onSubmit(e)}} 
                          prizePool={prizePool}           
                        />
                        
                      </div>
                    }
                                            
                 {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
              </form>
            </div>
        </div>
   
                    
      {/* confirmation popup */}
      <LeagueCreateConfirmPopup
      isOpen={createConfirmationPopup}
      toggle={()=> setCreateConfirmationPopup(false)}
      createLeague = {()=>{createLeague()}}
      />

      {/* after successful creation of league */}
      <ConfirmationModal
        isOpen={confirmation}
        responseMessage={responseMessage}
        toggle={() => { setConfirmation(false); setStep(0) }}
      />
     
    </Container>
  )
}

export default LeagueSettings
