import React, { Component } from "react";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "1" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="range"
          id="volume"
          className="control-volume"
          min="0"
          max="2"
          value={this.state.value}
          onChange={this.handleChange}
          list="gainVals"
          step="0.01"
          data-action="volume"
        />
        <datalist id="gainVals">
          <option value="0" label="min" />
          <option value="1" label="unity" />
          <option value="2" label="max" />
        </datalist>
      </div>
    );
  }
}

export default Volume;
