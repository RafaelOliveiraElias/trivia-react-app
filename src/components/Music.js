import React, { Component } from 'react';
import music from './music.mp3';

class Music extends Component {
  state = {
    play: true,
  }

  audio = new Audio(music)

  componentDidMount() {
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.setState({ play: false }));
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  }

  render() {
    const { audio } = this.props;
    if (audio) {
      this.audio.pause();
    }
    return (
      <div>
        <button
          type="button"
          onClick={ this.togglePlay }
        >
          {this.state.play ? 'Pause' : 'Play'}

        </button>
      </div>
    );
  }
}

export default Music;
