import React, { useState, useEffect } from "react";

/////////////////////////////////////////////////////////////////////
// POC for client-side single-source audio control using Web-Audio
// API.
//
// Brandon Whittle, Christian Fuller
// Bring Your Own Bar (BYOB)
// 2020
/////////////////////////////////////////////////////////////////////

// Custom hook to setup audio states
const useAudio = ({ initialGain, initialPan }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const [audioCtx] = useState(new AudioContext());
  const [gainNode] = useState(audioCtx.createGain());
  const [panner] = useState(new StereoPannerNode(audioCtx, { pan: initialPan }));

  gainNode.gain.value = initialGain;

  return { audioCtx, gainNode, panner };
};

const Controles = () => {
  // () => "anonymous function; unnamed" i.e. onClick = () => {}
  // Get ready for hooks
  // Hooks are basically functions, powerful bc pattern

  // Setting states for user controls
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);

  // Initialization of audio states
  const { audioCtx, gainNode, panner } = useAudio({ initialGain: 1, initialPan: 0 }); //can pass initials here if desired

  // Play/Pause Button functionality
  const togglePlaying = () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    setPlaying(!playing);
  };

  // Volume Slider functionality
  const changeVolume = e => {
    const {
      target: { value }
    } = e; //look in target, grab value key to use as const
    setVolume(value);
  };

  // Panning Slider functionality
  const changePan = ({ target: { value } }) => setPan(value); //^^ they're the same

  // SGetter for use in useEffect()
  const getAudioElement = () => document.querySelector("audio");

  // Post-Render One-Time Setup
  useEffect(() => {
    const audioElement = getAudioElement();
    const track = audioCtx.createMediaElementSource(audioElement);

    track
      .connect(gainNode)
      .connect(panner)
      .connect(audioCtx.destination);
  }, []); // Do not run again

  // Post-Render On-Change settings
  useEffect(() => {
    const audioElement = getAudioElement();

    playing ? audioElement.play() : audioElement.pause();
    gainNode.gain.value = volume;
    panner.pan.value = pan;
  }, [playing, volume, pan]); // Run only when these values change

  // Good ol' JSX
  return (
    <>
      <audio
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
        crossOrigin="anonymous"
      ></audio>
      <button
        data-playing={playing}
        className="control-play"
        role="switch"
        onClick={togglePlaying}
      >
        Play
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

export default Controles;
