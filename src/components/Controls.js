import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 1,
      pan: 0,
      aria: false
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
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.audioElement = document.querySelector("audio");
    this.track = this.audioCtx.createMediaElementSource(this.audioElement);

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = this.state.volume;

    this.pannerOptions = { pan: 0 };
    this.panner = new StereoPannerNode(this.audioCtx, this.pannerOptions);

    this.track
      .connect(this.gainNode)
      .connect(this.panner)
      .connect(this.audioCtx.destination);
  }

  componentDidUpdate() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
      this.audioElement.pause();
    }
    this.state.playing ? this.audioElement.play() : this.audioElement.pause();
    this.gainNode.gain.value = this.state.volume;
    this.panner.pan.value = this.state.pan;
  }

  render() {
    return (
      <>
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
          className="control-panner"
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
      </>
    );
  }
}

export default Controls;
