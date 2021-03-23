import React, { Component } from 'react';
import Button from './components/Button';
import AlbumCover from './components/AlbumCover';
import TrackPlayer from './components/TrackPlayer';

class App extends Component {
  state = {
    currentTime: 0,
    currentDuration: 0,
    paused: true,
    muted: false,
    volume: 1,
    volumeInterval: 0.2,
    playlist: [
      { title: 'Bomba Estereo - To My Love',
        albumArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Amanecer_album_cover.jpg/220px-Amanecer_album_cover.jpg',
        src: 'https://d2tml28x3t0b85.cloudfront.net/tracks/stream_files/000/696/722/original/Bomba%20Est%C3%A9reo%20-%20To%20My%20Love%20%28Moombahton%20Bootleg%29.mp3?1514668785'
      },
      { title: 'Alex Skrindo - Me & You',
        albumArt: 'http://k003.kiwi6.com/hotlink/ifpd9xk6n4/2.jpg',
        src: 'https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3'
      },
      { title: 'Kaaze - Electro Boy',
        albumArt: 'http://k003.kiwi6.com/hotlink/36u2tfrwiu/3.jpg',
        src: 'http://k003.kiwi6.com/hotlink/gt2rduy0mo/3.mp3'
      },
      { title: 'Jordan Schor - Home',
        src: 'http://k003.kiwi6.com/hotlink/gt2rduy0mo/3.mp3',
        albumArt: 'src="http://k003.kiwi6.com/hotlink/l633hnztuz/4.jpg'
      },
      { title: 'Martin Garrix - Proxy',
        albumArt: 'http://k003.kiwi6.com/hotlink/ifpd9xk6n4/2.jpg',
        src: 'http://k003.kiwi6.com/hotlink/3j1d3r8a4t/5.mp3'
      }
    ],
    currentTrack: {
      title: 'Bomba Estereo - To My Love',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Amanecer_album_cover.jpg/220px-Amanecer_album_cover.jpg',
      src: 'https://d2tml28x3t0b85.cloudfront.net/tracks/stream_files/000/696/722/original/Bomba%20Est%C3%A9reo%20-%20To%20My%20Love%20%28Moombahton%20Bootleg%29.mp3?1514668785'
    },
  }

  interval = null;

  componentDidMount() {
    this.setState({ currentTrack: this.state.playlist.find(track => track)})
    this.player = document.createElement('audio');
    this.player.src = this.state.currentTrack.src;
    this.player.load();
    if (this.state.paused) this.player.pause();
    else this.player.play();
    this.player.volume = this.state.volume;
    this.player.muted = this.state.muted;

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 39: // arrow right
          this.player.currentTime += 1;
          break;
        case 37: // arrow left
          this.player.currentTime -= 1;
          break;
        case 38: // arrow up
          this.volumeUp();
          break;
        case 40: // arrow down
          this.volumeDown();
          break;
        case 32: { //spacebar
          if(e.target.tagName !== 'INPUT') {
            e.preventDefault();
            if (this.player.paused) {
              this.play();
            } else {
              this.pause();
            }
          }
          break;
        }
        case 77: // M key
          this.toggleMuted();
          break;
        default:
          break;
      }
    });
    
    this.player.addEventListener('loadedmetadata', () => {
      this.setState({
        currentTime: this.player.currentTime,
        currentDuration: this.player.duration,
      });
    });
    
    this.player.addEventListener('play', () => this.play());
    
    this.player.addEventListener('pause', () => this.pause());
    
    this.player.addEventListener('volumechange', (e) => {
      this.setState({ volume: e.target.volume });
    });
    
    this.player.addEventListener('ended', () => this.nextTrack());
  }

  componentWillUnmount() {
    this.player.removeEventListener('play');
    this.player.removeEventListener('pause');
    this.player.removeEventListener('volumechange');
    this.player.removeEventListener('ended');
    this.player.removeEventListener('loadedmetadata');
    document.removeEventListener('keydown')
  }

  refreshCurrentTime = () => {
    this.setState({
      currentTime: this.player.currentTime
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const newTrack = {
      src: this.srcInput.value,
      title: this.titleInput.value
    };
    if (
      newTrack.src.length > 0 &&
      newTrack.title.length > 0
    ) {
      e.currentTarget.reset();
      this.setCurrentTrack(newTrack);
      this.setState(state => ({
        playlist: [
          newTrack,
          ...state.playlist.filter(track =>
            track.src !== newTrack.src
          )
        ]
      }));
    }
  }
  
  play = () => {
    this.setState({
      paused: false
    }, () => {
      this.player.play();
      this.interval = setInterval(
        this.refreshCurrentTime,
        100
      );
    });
  }
  
  pause = () => {
    this.setState({
      paused: true
    }, () => {
      this.player.pause();
      clearInterval(this.interval);
    });
  }
  
  togglePlayPause = () => {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  
  toggleMuted = () => {
    this.setState(state => ({
      muted: !state.muted
    }), () => {
      this.player.muted = this.state.muted;
    });
  }
  
  volumeUp = () => {
    const volume = this.state.volume;
    const volumeInterval = this.state.volumeInterval;
    if (volume < 1) {
      let nextVolume = 1;
      if(volume + volumeInterval <= 1) {
        nextVolume = volume + volumeInterval;
      }
      this.setState({
        volume: nextVolume
      }, () => {
        this.player.volume = this.state.volume;
      })
    }
  }
  
  volumeDown = () => {
    const volume = this.state.volume;
    const volumeInterval = this.state.volumeInterval;
    if (volume > 0) {
      let nextVolume = 0;
      if(volume - volumeInterval >= 0) {
        nextVolume = volume - volumeInterval;
      }
      this.setState({
        volume: nextVolume
      }, () => {
        
        this.player.volume = this.state.volume;
      })
    }
  }
  
  setCurrentTrack = (track) => {
    if (track.src === this.state.currentTrack.src) {
      if (this.state.paused){
        this.play();
      } else {
        this.pause();
      }
    }
    else {
      this.setState({
        currentTrack: track
      }, () => {
        this.player.src = this.state.currentTrack.src;
        this.player.load();
        this.play()
      });
    }
  }
  
  nextTrack = () => {
    const index = this.state.playlist
      .map(track => track.src)
      .indexOf(this.state.currentTrack.src);
    if (index < this.state.playlist.length - 1) {
      this.setCurrentTrack(
        this.state.playlist[index + 1]
      );
    } else {
      this.setCurrentTrack(
        this.state.playlist[0]
      );
    }
  }
  
  prevTrack = () => {
    const index = this.state.playlist
      .map(track => track.src)
      .indexOf(this.state.currentTrack.src);
    if (index > 0) {
      this.setCurrentTrack(
        this.state.playlist[index - 1]
      );
    } else {
      this.setCurrentTrack(
        this.state.playlist[this.state.playlist.length - 1]
      );
    }
  }
  
  render() {
    const { currentTrack, currentDuration, playlist, paused,  currentTime,  } = this.state;
    const isPlayin = !paused;
    return (
      <section>
        <div className="player">
          { isPlayin && <TrackPlayer
            title={currentTrack.title}
            currentTime={currentTime}
            currentDuration={currentDuration}
            />
          }
          <div className="player__content">
            <AlbumCover active={isPlayin} imageSrc={currentTrack.albumArt}></AlbumCover>
            <div className='controls'>
              <Button
                onClick={this.prevTrack}
                icon='skip_previous'
                title='Previous track'
                />
              { isPlayin && 
                <Button
                  onClick={ () => this.player.currentTime -= 10}
                  icon='replay_10'
                  title='Go 10 seconds back'
                />
              }
              <Button
                circle={true}
                icon={paused ? 'play_arrow' : 'pause'}
                onClick={this.togglePlayPause}
                size='md-36'
                title={paused ? 'Play' : 'Pause'}
              />
              {
                isPlayin && 
                <Button
                  onClick={ () => this.player.currentTime += 10}
                  icon='forward_10'
                  title='Skip 10 seconds'
                />
              }
              <Button
                onClick={this.nextTrack}
                icon='skip_next'
                title='Next track'
              />
            </div>
          </div>
          <ul className='playlist'>
          {this.state.playlist.map((track, i) => (
            <li
              key={i}
              onClick={() => this.setCurrentTrack(track)}
              className={
                this.state.currentTrack.src === track.src
                ? 'current' : ''
              }
              title={
                this.state.currentTrack.src === track.src &&
                isPlayin
                  ? 'Pause this track'
                  : 'Play this track'
              }
            >
              <Button
                className={'play-pause-button'}
                icon={
                  this.state.currentTrack.src === track.src &&
                  isPlayin
                    ? 'pause'
                    : 'play_arrow'
                }
                onClick={this.togglePlayPause}
                title={
                  currentTrack.src === track.src &&
                  isPlayin
                    ? 'Pause this track'
                    : 'Play this track'
                }
              />
              {track.title}
            </li>
          ))}
        </ul>
        </div>
      </section>
    )
  }
}


export default App;