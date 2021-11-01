import React from 'react'

function Welcome(props) {
  var welcomescreen=document.getElementsByClassName('welcome')[0];

  var pp = [];

  const StartGame = () => {
    let totalplayer = 0;
    console.log("game started");
    
    if(props.playerGreen==""){
      props.setGreenPawns('');
      props.setDiceGreen('')
      totalplayer-=1;
      // playername[2].innerHTML="";
      // mplayername[1].innerHTML="";
    } else {
        // playername[2].innerHTML=props.playerRed;
        // mplayername[1].innerHTML=props.playerRed;
        pp.push('g');
    }   
    
    if(props.playerRed==""){
        props.setRedPawns('');
        props.setDiceRed('')
        totalplayer-=1;
        // playername[0].innerHTML="";
        // mplayername[0].innerHTML="";
    }else{
        // playername[0].innerHTML=ri.value;
        // mplayername[0].innerHTML=ri.value;
        pp.push('r');
    }
    
    if(props.playerYellow==""){
      props.setYellowPawns('');
        props.setDiceYellow('')
        totalplayer-=1;
        // playername[3].innerHTML="";
        // mplayername[3].innerHTML="";
    }else{
        // playername[3].innerHTML=yi.value;
        // mplayername[3].innerHTML=yi.value;
        pp.push('y');
    }  
    
    if(props.playerBlue==""){
      props.setBluePawns('');
        props.setDiceBlue('')
        totalplayer-=1;
        // playername[1].innerHTML="";
        // mplayername[2].innerHTML="";
    }else{
        // playername[1].innerHTML=bi.value;
        // mplayername[2].innerHTML=bi.value;
      pp.push('b');
    }

    if(pp[0]=='r'){
       props.setDiceRed('r-dice')
    }

    if(pp[0]=='g'){
      props.setDiceGreen('g-dice')
    }

    if(pp[0]=='y'){
      props.setDiceYellow('y-dice')
    }

    if(pp[0]=='b'){
      props.setDiceBlue('b-dice')

    }

    if(pp.length<2){
        alert('Please Enter Atleast 2 Players !');
        return 0;
    }else{
        welcomescreen.remove();    
    }
    props.setpp(pp)
  }
  return (
    <div className="welcome">
        <div className="setting">
            <div className="logo">
                <img src="icon.png" className="logo" />
            </div> 
            
            <div className="name">
                <input type="text" className="ri" placeholder="Red player name..." onChange={(e)=>props.setPlayerRed(e.target.value)} />
                <input type="text" className="gi" placeholder="Green player name..." onChange={(e)=>props.setPlayerGreen(e.target.value)} />
                <input type="text" className="yi" placeholder="Yellow player name..." onChange={(e)=>props.setPlayerYellow(e.target.value)} />
                <input type="text" className="bi" placeholder="Blue player name..." onChange={(e)=>props.setPlayerBlue(e.target.value)} /><br />
                <button className="play" onClick={()=>StartGame()}>Play</button><br />
                <span className="note">if only two players playing enter only two names</span>
            </div>
        </div>
    </div>
  )
}

export default Welcome
