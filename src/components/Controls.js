import React, { setState, useState, useEffect } from "react";
import { render } from 'react-dom';

import {
  RAudioContext,
  RStereoPanner,
  RGain,
  RMediaElementSource,
  RPipeline
} from 'r-audio';

const Controls = ({audioElement}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);

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

  // Panning Slider functionality
  const changePan = ({ target: { value } }) => setPan(value); //^^ they're the same

  return(
    <>
    <RAudioContext>
      <RPipeline>
        <RMediaElementSource element={audioElement} paused={true}/>
        <RGain gain={volume} />
        <RStereoPanner pan={pan} />
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
    <input
      type="range"
      id="volume"
      className="control-volume"
      min="0"
      max="2"
      value={volume}
      onChange={changeVolume}
      list="gainVals"
      step="0.01"
    />
    <datalist id="gainVals">
      <option value="1" label="unity" />
    </datalist>

    <input
      type="range"
      id="panner"
      className="control-panner"
      min="-1"
      max="1"
      value={pan}
      onChange={changePan}
      list="panVals"
      step="0.01"
    />
    <datalist id="panVals">
      <option value="0" label="unity" />
    </datalist>
    </>
  );
};

export default Controls;
