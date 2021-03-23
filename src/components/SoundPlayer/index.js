// import React, { useContext, useState, useEffect, Component } from 'react';
// import Button from './../Button';
// import AlbumCover from './../AlbumCover';
// import TrackPlayer from './../TrackPlayer';
// import { AppContext } from '../../application/provider';


// export function SoundPlayer (props) {
//   const [state, setState] = useContext(AppContext);


//   refreshCurrentTime = () => {
//     setState({
//       currentTime: state.player.currentTime
//     });
//   }
  
//   play = () => {
//     setState({
//       paused: false
//     }, () => {
//       state.player.play();
//       state.interval = setInterval(
//         state.refreshCurrentTime,
//         100
//       );
//     });
//   }
  
//   pause = () => {
//     setState({
//       paused: true
//     }, () => {
//       state.player.pause();
//       clearInterval(this.interval);
//     });
//   }
  
//   togglePlayPause = () => {
//     if (state.paused) {
//       state.play();
//     } else {
//       state.pause();
//     }
//   }
  
//   toggleMuted = () => {
//     setState(state => ({
//       muted: !state.muted
//     }), () => {
//       state.player.muted = state.muted;
//     });
//   }
  
//   volumeUp = () => {
//     const volume = state.volume;
//     const volumeInterval = state.volumeInterval;
//     if (volume < 1) {
//       let nextVolume = 1;
//       if(volume + volumeInterval <= 1) {
//         nextVolume = volume + volumeInterval;
//       }
//       setState({
//         volume: nextVolume
//       }, () => {
//         this.player.volume = state.volume;
//       })
//     }
//   }
  
//   volumeDown = () => {
//     const volume = state.volume;
//     const volumeInterval = state.volumeInterval;
//     if (volume > 0) {
//       let nextVolume = 0;
//       if(volume - volumeInterval >= 0) {
//         nextVolume = volume - volumeInterval;
//       }
//       setState({
//         volume: nextVolume
//       }, () => {
        
//         state.player.volume = state.volume;
//       })
//     }
//   }
  
//   setCurrentTrack = (track) => {
//     if (track.src === state.currentTrack.src) {
//       if (state.paused){
//         play();
//       } else {
//         pause();
//       }
//     }
//     else {
//       this.setState({
//         currentTrack: track
//       }, () => {
//         this.player.src = state.currentTrack.src;
//         this.player.load();
//         this.play()
//       });
//     }
//   }
  
//   nextTrack = () => {
//     const index = state.playlist
//       .map(track => track.src)
//       .indexOf(state.currentTrack.src);
//     if (index < state.playlist.length - 1) {
//       setCurrentTrack(
//         state.playlist[index + 1]
//       );
//     } else {
//       setCurrentTrack(
//         state.playlist[0]
//       );
//     }
//   }
  

//   useEffect(() => {
//     state.player = document.createElement('audio');
//     state.player.src = state.state.currentTrack.src;
//     state.player.load();
//     if (state.state.paused) state.player.pause();
//     else state.player.play();
//     state.player.volume = state.state.volume;
//     state.player.muted = state.state.muted;
    

//     state.player.addEventListener('loadedmetadata', () => {
//       setState({
//         currentTime: state.player.currentTime,
//         currentDuration: state.player.duration,
//       });
//     });
    
//     state.player.addEventListener('play', () => this.play());
    
//     state.player.addEventListener('pause', () => this.pause());
    
//     state.player.addEventListener('volumechange', (e) => {
//       setState({volume: e.target.volume});
//     });
    
//     state.player.addEventListener('ended', () => this.nextTrack());

//     return () => {
//       state.player.removeEventListener('play');
//       state.player.removeEventListener('pause');
//       state.player.removeEventListener('volumechange');
//       state.player.removeEventListener('ended');
//       state.player.removeEventListener('loadedmetadata');
//       document.removeEventListener('keydown')
//     }
//   }, [])
// }

// export default SoundPlayer;