import React, {useState} from 'react'
import Board from './Board'
import '../styles/main.css'
import Dice from './Dice'
import PawnMove from './PawnMove';
import AudioComponent from './AudioComponent';
import Welcome from './Welcome';
import 'animate.css/animate.css'

function LudoBoard() {
  const [playerRed, setPlayerRed] = useState('');
  const [playerBlue, setPlayerBlue] = useState('');
  const [playerGreen, setPlayerGreen] = useState('');
  const [playerYellow, setPlayerYellow] = useState('');

  const [pp, setpp] = useState([]);
  const [winpos, setWinpos] = useState([]);
  const [pmove, setPmove] = useState('');
  const [moves, setMoves] = useState([0,0,0,0]);
  const [rstate, setRstate] = useState([0,0,0,0])
  const [gstate, setGstate] = useState([0,0,0,0])
  const [ystate, setYstate] = useState([0,0,0,0])
  const [bstate, setBstate] = useState([0,0,0,0])

  const [diceRed, setDiceRed] = useState('');
  const [diceBlue, setDiceBlue] = useState('');
  const [diceGreen, setDiceGreen] = useState('');
  const [diceYellow, setDiceYellow] = useState('')

  const [redPawns, setRedPawns] = useState('r');
  const [bluePawns, setBluePawns] = useState('b');
  const [greenPawns, setGreenPawns] = useState('g');
  const [yellowPawns, setYellowPawns] = useState('y');
  const [step, setStep] = useState('astep')

  const [animatedRedPawn, setAnimateRedPawn] = useState('');
  const [animatedGreenPawn, setAnimateGreenPawn] = useState('');
  const [animatedYellowPawn, setAnimateYellowPawn] = useState('');
  const [animatedBluePawn, setAnimateBluePawn] = useState('');


  const motionOn = (pno) => {

    if(pno==0){
      setAnimateRedPawn("animate__animated animate__tada");
      setAnimateBluePawn('')
      setAnimateYellowPawn('')
      setAnimateGreenPawn('')
     }else if(pno==1){
      setAnimateGreenPawn("animate__animated animate__tada")
      setAnimateBluePawn('')
      setAnimateYellowPawn('')
      setAnimateRedPawn('')
    }else if(pno==2){
      setAnimateYellowPawn("animate__animated animate__tada")
      setAnimateRedPawn('')
      setAnimateBluePawn('')
      setAnimateGreenPawn('')
    }else if(pno==3){
      setAnimateBluePawn("animate__animated animate__tada")
      setAnimateRedPawn('')
      setAnimateYellowPawn('')
      setAnimateGreenPawn('')
    }else{
    //  for(i=0;i<r.length;i++){ 
    // } 
      setAnimateRedPawn('')
      setAnimateBluePawn('')
      setAnimateYellowPawn('')
      setAnimateGreenPawn('')
    }
  }


  const diceRotation = (pno) => {
    
    if(pno===0){
      if(pp[0].includes('r')){
        if(winpos.includes('r')){
            diceRotation(1);
            return 0;
        }   

        setTimeout(function(){
          if(pmove===6 || pmove===7){
            return 0;
          }
          
          if(rstate.includes(1) && moves[0]>0){   
          }else{
            setDiceRed('');
            if(pp[0].includes('g')){
              setDiceGreen('g-dice')   
            }else if(pp[0].includes('y')){
              setDiceYellow('y-dice') 
            }else if(pp[0].includes('b')){
              setDiceBlue('b-dice')
            }    
          }    
        },800); 
      }else{
        setPmove(7);
        diceRotation(1);
      }
    }

    if(pno===1){
      if(pp[0].includes('g')){
        if(winpos.includes('g')){
            diceRotation(2);
            return 0;
        }   

        setTimeout(function(){
          if(pmove===6 || pmove===7){
            return 0;
          }
          
          if(gstate.includes(1) && moves[1]>0){   
          }else{
           
            setDiceGreen('');
            if(pp[0].includes('y')){
              setDiceYellow('y-dice')   
            }else if(pp[0].includes('b')){
              setDiceBlue('b-dice') 
            }else if(pp[0].includes('r')){
              setDiceRed('r-dice')
            }    
          }    
        },800); 
      }else{
        setPmove(7);
        diceRotation(2);
      }
    }

    if(pno===2){
      if(pp[0].includes('y')){
        if(winpos.includes('y')){
            diceRotation(3);
            return 0;
        }   

        setTimeout(function(){
          if(pmove===6 || pmove===7){
            return 0;
          }
          
          if(ystate.includes(1) && moves[2]>0){   
          }else{
            setDiceYellow('');
            if(pp[0].includes('b')){
              setDiceBlue('b-dice')   
            }else if(pp[0].includes('r')){
              setDiceRed('r-dice') 
            }else if(pp[0].includes('g')){
              setDiceGreen('g-dice')
            }    
          }    
        },800); 
      }else{
        setPmove(7);
        diceRotation(3);
      }
    }

    if(pno===3){
      if(pp[0].includes('b')){
        if(winpos.includes('b')){
            diceRotation(0);
            return 0;
        }   

        setTimeout(function(){
          if(pmove===6 || pmove===7){
            return 0;
          }
          
          if(bstate.includes(1) && moves[3]>0){   
          }else{
            setDiceBlue('');
            if(pp[0].includes('r')){
              setDiceRed('r-dice')   
            }else if(pp[0].includes('g')){
              setDiceGreen('g-dice') 
            }else if(pp[0].includes('y')){
              setDiceYellow('y-dice')
            }    
          }    
        },800); 
      }else{
        setPmove(7)
        diceRotation(0);
      }
    }


  }

  return (
    <div className="mainframe">
      <AudioComponent />
      <Welcome 
        pp = {pp}
        setpp = {(obj) => setpp([...pp, obj])}
        playerRed={playerRed}
        playerBlue={playerBlue}
        playerGreen={playerGreen}
        playerYellow={playerYellow}
        setPlayerRed = {(name)=>setPlayerRed(name)}
        setPlayerBlue = {(name)=>setPlayerBlue(name)}
        setPlayerGreen = {(name)=>setPlayerGreen(name)}
        setPlayerYellow = {(name)=>setPlayerYellow(name)}
        diceRed = {diceRed}
        diceBlue = {diceBlue}
        diceGreen = {diceGreen}
        diceYellow = {diceYellow}
        setDiceRed = {(name)=>setDiceRed(name)}
        setDiceBlue = {(name)=>setDiceBlue(name)}
        setDiceGreen = {(name)=>setDiceGreen(name)}
        setDiceYellow = {(name)=>setDiceYellow(name)}
        setRedPawns={(name)=>setRedPawns(name)}
        setBluePawns={(name)=>setBluePawns(name)}
        setGreenPawns={(name)=>setGreenPawns(name)}
        setYellowPawns={(name)=>setYellowPawns(name)}
      />

      <Dice 
        diceRed = {diceRed}
        diceBlue = {diceBlue}
        playerRed={playerRed}
        playerBlue ={playerBlue}
        motionOn = {motionOn}
        setPmove={(val)=>setPmove(val)}
        moves={moves}
        setMoves = {(obj) => setMoves([...moves, obj])}
        diceRotation={diceRotation}
      />

      <PawnMove
        diceRed = {diceRed}
        diceBlue = {diceBlue}
        playerRed={playerRed}
        playerBlue ={playerBlue}
      />

      <Board
        motionOn = {motionOn}
        diceRotation={diceRotation}

        moves={moves}
        setMoves = {(obj) => setMoves([...moves, obj])}
        gstate={gstate}
        setGstate = {(obj) => setGstate([...gstate, obj])}

        redPawns={redPawns}
        bluePawns={bluePawns}
        greenPawns={greenPawns}
        yellowPawns={yellowPawns}
        step={step}

        animatedRedPawn={animatedRedPawn}
        animatedGreenPawn={animatedGreenPawn}
        animatedYellowPawn={animatedYellowPawn}
        animatedBluePawn={animatedBluePawn}
      />
       
      <Dice
        diceGreen = {diceGreen}
        diceYellow = {diceYellow}
        playerGreen ={playerGreen}
        playerYellow={playerYellow}
        motionOn = {motionOn}
        setPmove={(val)=>setPmove(val)}
        moves={moves}
        setMoves = {(obj) => setMoves([...moves, obj])}
        diceRotation={diceRotation}
        

       />

      <PawnMove
        diceGreen = {diceGreen}
        diceYellow = {diceYellow}
        playerGreen={playerGreen}
        playerYellow ={playerYellow}
      />
    </div>
  )
}

export default LudoBoard
