import React, { Component } from "react";

function Audio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const audioElement = document.querySelector("audio");

  this.state.value === "true" ? audioElement.play() : audioElement.pause();
}

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "false" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.state.value === "false"
      ? this.setState({ value: "true" })
      : this.setState({ value: "false" });
    // console.log(this.state);
  }

  render() {
    Audio();
    return (
      <div>
        <audio
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
          crossOrigin="anonymous"
        ></audio>
        <button
          data-playing={this.state.value}
          className="control-play"
          role="switch"
          aria-checked="false"
          onClick={this.handleChange}
        >
          Play
        </button>
      </div>
    );
  }
}

export default Play;
