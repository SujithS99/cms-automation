import React from 'react'

function AudioComponent() {
  return (
    <div>
      <audio id="diceSound">
        <source src="dice.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="killedSound">
        <source src="killed.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="winSound">
        <source src="win.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="inoutSound">
        <source src="inout.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="stepSound">
        <source src="step.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioComponent
