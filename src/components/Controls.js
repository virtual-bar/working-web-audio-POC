import React, { setState, useState, useEffect } from "react";
import { render } from 'react-dom';
import Draggable from 'react-draggable';

import {
  RAudioContext,
  RPanner,
  RGain,
  RMediaElementSource,
  RPipeline
} from 'r-audio';

const Controls = ({audioElement}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);


  const changeVolume = e => {
    const {
      target: { value }
    } = e; //look in target, grab value key to use as const
    setVolume(value);
  };

  const togglePlaying = () => {
    setPlaying(!playing);
    audioElement.paused ? audioElement.play() : audioElement.pause();
  };

  const handleDrag = ({ pageX, pageY}) => {
    console.log((pageX / window.innerWidth - 0.5), (pageY / window.innerHeight - 0.5));
    setPositionX((pageX / window.innerWidth - 0.5)*8);
    setPositionY((pageY / window.innerHeight - 0.5)*8);
  };

  // Panning Slider functionality
  const changePan = ({ target: { value } }) => setPan(value); //^^ they're the same

  return(
    <>
    <header className="controls-pane">
    <RAudioContext>
      <RPipeline>
        <RMediaElementSource element={audioElement} paused={true}/>
        <RPanner 
          panningModel='HRTF'
          distanceModel='inverse'
          refDistance={1}
          maxDistance={5}
          rolloffFactor={1}
          coneInnerAngle={360}
          coneOuterAngle={0}
          oneOuterGain={0}
          orientationX={1}
          orientationY={0}
          orientationZ={0}
          positionX={positionX}
          positionY={positionY}
        />
      </RPipeline>
    </RAudioContext>
    <button
        data-playing={playing}
        className="control-play"
        role="switch"
        onClick={togglePlaying}
      >
      { playing ? 'Playing' : 'Paused' }
    </button>
    </header>
    <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        scale={1}
        onDrag={handleDrag}
    >
    <div className='listener handle'></div>
    </Draggable>
    </>
  );
};

export default Controls;
