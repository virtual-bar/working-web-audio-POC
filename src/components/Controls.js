import React, { useState, useEffect } from "react";

const useAudio = ({ initialGain, initialPan }) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const [audioCtx] = useState(new AudioContext());
  const [gainNode] = useState(audioCtx.createGain());
  const [panner] = useState(new StereoPannerNode(audioCtx, { pan: initialPan }));

  //!

  gainNode.gain.value = initialGain;

  return { audioCtx, gainNode, panner };
};

const Controles = () => {
  //console.warn("!!!!!");
  // () => "anonymous function; unnamed" i.e. onClick = () => {}
  //get ready for hooks bitch
  //hooks are basically functions, powerful bc pattern
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);

  const { audioCtx, gainNode, panner } = useAudio({ initialGain: 1, initialPan: 0 }); //can pass initials here if desired

  console.log({ gainNode, panner });

  const togglePlaying = () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    setPlaying(!playing);
  };

  const changeVolume = e => {
    const {
      target: { value }
    } = e; //look in target, grab value key to use as const
    setVolume(value);
  };

  const changePan = ({ target: { value } }) => setPan(value); //^^ they're the same

  const getAudioElement = () => document.querySelector("audio");

  useEffect(() => {
    console.log("Hi, Mom, I'm using an effect!");
    const audioElement = getAudioElement();
    const track = audioCtx.createMediaElementSource(audioElement);
    //console.log({ audioElement, track });
    track
      .connect(gainNode)
      .connect(panner)
      .connect(audioCtx.destination);
  }, []); //! We do not want this to run again

  useEffect(() => {
    const audioElement = getAudioElement();

    playing ? audioElement.play() : audioElement.pause();
    gainNode.gain.value = volume;
    panner.pan.value = pan;
    //console.log(gainNode.gain.value);
    //console.log(panner.pan.value);
  }, [playing, volume, pan]);

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
        <option value="0" label="min" />
        <option value="1" label="unity" />
        <option value="2" label="max" />
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
        <option value="-1" label="left" />
        <option value="0" label="unity" />
        <option value="1" label="right" />
      </datalist>
    </>
  );
};

export default Controles;
