import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: "false",
      volume: "1",
      pan: "0",
      aria: "false"
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changePan = this.changePan.bind(this);
  }

  togglePlay(event) {
    this.setState({ playing: !this.state.playing });
    this.setState({ aria: !this.state.aria });
    //console.log(this.state.playing);
  }

  changeVolume(event) {
    this.setState({ volume: event.target.value });
    //console.log(this.state.volume);
  }

  changePan(event) {
    this.setState({ pan: event.target.value });
    //console.log(this.state.pan);
  }

  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const audioElement = document.querySelector("audio");
    const track = audioCtx.createMediaElementSource(audioElement);

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = this.state.volume;

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    audioElement.play();
    track.connect(gainNode).connect(audioCtx.destination);
  }

  /*componentDidUpdate() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const audioElement = document.querySelector("audio");
    const track = audioElement;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = this.state.volume;

    this.state.playing ? audioElement.play() : audioElement.pause();
  }*/

  render() {
    return (
      <div>
        <audio
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
          crossOrigin="anonymous"
        ></audio>
        <button
          data-playing={this.state.playing}
          className="control-play"
          role="switch"
          aria-checked={this.state.aria}
          onClick={this.togglePlay}
        >
          Play
        </button>

        <input
          type="range"
          id="volume"
          className="control-volume"
          min="0"
          max="2"
          value={this.state.volume}
          onChange={this.changeVolume}
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
          className="control-pan"
          min="-1"
          max="1"
          value={this.state.pan}
          onChange={this.changePan}
          list="panVals"
          step="0.01"
        />
        <datalist id="panVals">
          <option value="-1" label="left" />
          <option value="0" label="unity" />
          <option value="1" label="right" />
        </datalist>
      </div>
    );
  }
}

export default Controls;
