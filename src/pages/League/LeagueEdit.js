import React,{useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Container} from 'reactstrap';
import '../../styles/LeagueForm.css'
import ConfirmationModal from './ConfirmationModal';
import GeneralForm from './GeneralForm';
import LeagueCreateConfirmPopup from './LeagueCreateConfirmPopup';
import PrizeDistributionTable from './PrizeDistributionTable';
import apiClient from '../../lib/apiClient';
import Response from '../../lib/Response';
import Constants from '../../lib/constant';
import SecondsTodateTime from '../../lib/SecondsTodateTime';

const containerStyle = {
  height: '90vh',
  overflowY: 'auto'
}

function LeagueEdit(props) {
  let history = useHistory();
  let {state}  = useLocation();
  
  const {league_type,end_time,entry_amount,league_commission,league_id,max_participant,max_player,name,participant_count, prize_pool,prize_scheme,registration_end_time, registration_start_time,start_time,status} = state;  

  const [step, setStep] = useState(0);
  const [createConfirmationPopup, setCreateConfirmationPopup] = useState(false)
  const [confirmation, setConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);

  const [leagueType, setLeagueType] = useState(league_type)
  const [leagueName, setLeagueName] = useState(name)
  const [startTime, setStartTime] = useState(SecondsTodateTime(start_time,'timelocal'))
  const [endTime, setEndTime] = useState(SecondsTodateTime(end_time,'timelocal'))
  const [registartionEndTime, setRegistartionEndTime] = useState(SecondsTodateTime(registration_end_time,'timelocal'))
  const [registrationStartTime, setRegistrationStartTime] = useState(SecondsTodateTime(registration_start_time,'timelocal'))
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [noOfPlayers, setNoOfPlayers] = useState(max_player)
  const [noOfParticipant, setNoOfParticipant] = useState(max_participant)
  const [amount, setAmount] = useState(entry_amount)
  const [commission, setCommission] = useState(league_commission)
  const [noOfWinners, setNoOfWinners] = useState('')
  const [prizePool, setPrizePool] = useState(prize_pool)
  const [prizeData, setPrizeData] = useState(prize_scheme)
  const [errorMessage, setErrorMessage] = useState("");
  const [isEdit, setIsEdit] = useState({});
  const [type, setType] = useState(Constants.LEAGUE_EDIT)

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

  useEffect(() => {
    let prizeScheme = prizeData;

    prizeScheme.forEach((element,index) => {
      let newItem = prizeData[index];

      let amt = (element.percentage * prizePool / 100);
      newItem.amount = amt;
      prizeScheme[index] = newItem;
      setPrizeData([...prizeScheme]);
    });
  }, [prizePool])

  const displayLeagueList = () => {
    // let path = `/league_list`;
    // restProps.setRouteBreadCrumbs([{route: '/grade_list', title: 'Grade List'}, {route: path, 'title': subject_name}]);
    history.push(`/league_list`);
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
  updateData.type = type;
  updateData.league_id = league_id;


  let res = await apiClient('/admin/league', 'POST', props.accessToken, updateData);
 
  if (res.responseCode === Response.STATUS_OK) {
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

// useEffect(() => {
//   props.setRouteBreadCrumbs([{route: '/league_settings', title: 'League Settings'}]);
// }, [])

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
                          type={type}        
                        />
                        
                      </div>
                    }
                                            
                 {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
              </form>
            </div>
        </div>
   
                    
      {/* confirmation popup */}
      {createConfirmationPopup && 
      <LeagueCreateConfirmPopup
      isOpen={createConfirmationPopup}
      toggle={()=> setCreateConfirmationPopup(false)}
      createLeague = {()=>{createLeague()}}
      />}

      {/* after successful creation of league */}
      {confirmation && 
      <ConfirmationModal
        isOpen={confirmation}
        responseMessage={responseMessage}
        toggle={() => { setConfirmation(false); displayLeagueList(); }}
      />}
     
    </Container>
  )
}

export default LeagueEdit
