import React,{useState} from 'react'

function Dice(props) {
  const [redDiceVal, setRedDiceVal] = useState(0) ;
  const [blueDiceVal, setBlueDiceVal] = useState('0') ; 
  const [greenDiceVal, setGreenDiceVal] = useState('0') ; 
  const [yellowDiceVal, setYellowDiceVal] = useState('0') ;

  const dice = (e, val) => {
    // dicesound.play();
    var num = Math.floor((Math.random() * 6) + 1);
    props.setPmove(num);
    if(val === 0) setRedDiceVal(num);
    if(val === 1) setGreenDiceVal(num);
    if(val === 2) setYellowDiceVal(num);
    if(val === 3) setBlueDiceVal(num);

    // e.innerHTML = num;
    props.moves[val] = num;
    // props.setMoves(props.moves[val])
    // props.moves[val]=num;
    props.motionOn(val);
    props.diceRotation(val);  
       
}
  return (
   <div>
       {(props.playerRed ||  props.playerBlue )&&
        <div className="diceboard">
        
        <div className="info">
          <span className="playername">
            {props.playerRed}
          </span>
          {props.playerRed && 
            <div className={props.diceRed} onClick={(e)=>dice(e,0)} >
            {props.diceRed ? redDiceVal : ''}
            </div>
          }
        </div>

      
        <div className="info">
        {props.playerBlue && 
          <div className={props.diceBlue} onClick={(e)=>dice(e,3)}>
              {props.diceBlue ? blueDiceVal : ''}
          </div>
        }
          <span className="playername">
            {props.playerBlue}
          </span>
        </div>
      
    </div>
      }

    {(props.playerGreen ||  props.playerYellow) &&
        <div className="diceboard">
     
        <div className="info">
           <span className="playername">
            {props.playerGreen}
          </span>
          {props.playerGreen && 
          <div className={props.diceGreen} onClick={(e)=>dice(e,1)}>
              {props.diceGreen ? greenDiceVal : ''}
          </div>}
        </div>
     
        <div className="info">
        {props.playerYellow && 
          <div className={props.diceYellow} onClick={(e)=>dice(e,2)}>
              {props.diceYellow ? yellowDiceVal : ''}
          </div>}
          <span className="playername">
            {props.playerYellow}
          </span>
        </div>
   
      </div>
      }

  </div>
  )
}

export default Dice
