import React, {useState} from 'react'
import { MdStars} from 'react-icons/md';

function Board({motionOn,diceRotation, moves, setMoves, gstate, setGstate, ...props}) {
    const [gp, setGp] = useState([-1,-1,-1,-1]);
    const [rp, setRp] = useState([-1,-1,-1,-1])
    const [bp, setBp] = useState([-1,-1,-1,-1])
    const [yp, setYp] = useState([-1,-1,-1,-1])

    const [totalpr, setTotalpr] = useState(4);
    const [totalpg, setTotalpg] = useState(4)
    const [totalpy, setTotalpy] = useState(4)
    const [totalpb, setTotalpb] = useState(4)

    var redpath=[19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,31,32,33,34,35];
    var greenpath=[5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,4,7,10,13,16];
    var bluepath=[66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,53,52,51,50,49,48,56,59,62,65,68,71,70,67,64,61,58,55];
    var yellowpath=[52,51,50,49,48,56,59,62,65,68,71,70,69,66,63,60,57,54,47,46,45,44,43,42,30,18,19,20,21,22,23,15,12,9,6,3,0,1,2,5,8,11,14,17,24,25,26,27,28,29,41,40,39,38,37,36];


  return (
    <div className="ludoboard">
        <div className="red">
            <div className="playerzone">
               
                <div className="player">
                    {props.redPawns &&<span onClick="movered(this,0)" className={`rp r material-icons ${props.animatedRedPawn}`} style={props.animatedRedPawn !=='' ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/> </span>}
                </div>
                <div className="player">
                    {props.redPawns && <span onClick="movered(this,1)" className={`rp r material-icons ${props.animatedRedPawn}`} style={props.animatedRedPawn !=='' ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.redPawns && <span onClick="movered(this,2)" className={`rp r material-icons ${props.animatedRedPawn}`} style={props.animatedRedPawn !=='' ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.redPawns && <span onClick="movered(this,3)" className={`rp r material-icons ${props.animatedRedPawn}`} style={props.animatedRedPawn !=='' ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
            </div>
           
        </div>

        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>

        <div className="green">
        
            <div className="playerzone">
                <div className="player">
                    {props.greenPawns && <span onClick="movegreen(this,0)" className={`rp g material-icons ${props.animatedGreenPawn}`} style={props.animatedGreenPawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.greenPawns && <span onClick="movegreen(this,1)" className={`rp g material-icons ${props.animatedGreenPawn}`} style={props.animatedGreenPawn ? {zIndex:'+99'}:{zIndex:'0'}} ><MdStars/></span>}
                </div>
                <div className="player">
                    {props.greenPawns && <span onClick="movegreen(this,2)" className={`rp g material-icons ${props.animatedGreenPawn}`} style={props.animatedGreenPawn ? {zIndex:'+99'}:{zIndex:'0'}} ><MdStars/></span>}
                </div>
                <div className="player">
                    {props.greenPawns && <span onClick="movegreen(this,3)" className={`rp g material-icons ${props.animatedGreenPawn}`} style={props.animatedGreenPawn ? {zIndex:'+99'}:{zIndex:'0'}} ><MdStars/></span>}
                </div>
            </div>

        </div>
    
        <div className="astep step"></div>
        <div className="astep greensafe"></div>
        <div className="astep gstop"></div>
        <div className="astep step rstop"></div>
        <div className="astep greensafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep greensafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep greensafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep greensafe"></div>
        <div className="astep step"></div>
        
        <div className="astep step"></div>
        <div className="astep rstop"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        
        <div className="centerbox"></div>
        
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step gstop"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
    
        <div className="astep step"></div>
        <div className="astep redsafe"></div>
        <div className="astep redsafe"></div>
        <div className="astep redsafe"></div>
        <div className="astep redsafe"></div>
        <div className="astep redsafe"></div>
        
        <div className="astep yellowsafe"></div>
        <div className="astep yellowsafe"></div>
        <div className="astep yellowsafe"></div>
        <div className="astep yellowsafe"></div>
        <div className="astep yellowsafe"></div>
        <div className="astep step"></div>
        
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step bstop"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep ystop"></div>
        <div className="astep step"></div>
    
        <div className="blue">
        
            <div className="playerzone">
                <div className="player">
                    {props.bluePawns && <span onClick="moveblue(this,0)" className={`rp b b material-icons ${props.animatedBluePawn}`} style={props.animatedBluePawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.bluePawns && <span onClick="moveblue(this,1)" className={`rp b b material-icons ${props.animatedBluePawn}`} style={props.animatedBluePawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.bluePawns && <span onClick="moveblue(this,2)" className={`rp b b material-icons ${props.animatedBluePawn}`} style={props.animatedBluePawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.bluePawns && <span onClick="moveblue(this,3)" className={`rp b b material-icons ${props.animatedBluePawn}`} style={props.animatedBluePawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
            </div>
     
        </div>

        <div className="astep step"></div>
        <div className="astep bluesafe"></div>
        <div className="astep step"></div>
        
        <div className="yellow">
            <div className="playerzone">
                <div className="player">
                    {props.yellowPawns && <span onClick="moveyellow(this,0)" className={`rp y material-icons ${props.animatedYellowPawn}`}  style={props.animatedYellowPawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.yellowPawns && <span onClick="moveyellow(this,1)" className={`rp y material-icons ${props.animatedYellowPawn}`} style={props.animatedYellowPawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.yellowPawns && <span onClick="moveyellow(this,2)" className={`rp y material-icons ${props.animatedYellowPawn}`} style={props.animatedYellowPawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
                <div className="player">
                    {props.yellowPawns && <span onClick="moveyellow(this,3)" className={`rp y material-icons ${props.animatedYellowPawn}`} style={props.animatedYellowPawn ? {zIndex:'+99'}:{zIndex:'0'}}><MdStars/></span>}
                </div>
            </div>

        </div>
    
        <div className="astep step"></div>
        <div className="astep bluesafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep bluesafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep bluesafe"></div>
        <div className="astep step ystop"></div>
        <div className="astep bstop"></div>
        <div className="astep bluesafe"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
        <div className="astep step"></div>
    </div>
  )
}

export default Board
