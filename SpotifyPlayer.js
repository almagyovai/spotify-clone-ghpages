import React, { useEffect, useState } from 'react';
import SeekBar from '../Components/Seekbar';
import PlayerControls from '../Components/PlayPauseButton';
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';

const SpotifyPlayer = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [deviceId, setDeviceId] = useState(null);

  // Reverting back to the previous initialization code
  useEffect(() => {
    const initializePlayer = () => {
      if (window.Spotify) {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => cb(token),
          volume: 0.5
        });

        spotifyPlayer.addListener('ready', ({ device_id }) => {
          console.log('Player is ready with Device ID:', device_id);
          setDeviceId(device_id);
          setPlayer(spotifyPlayer);
        });

        spotifyPlayer.addListener('player_state_changed', state => {
          console.log('Player state changed:', state);
          if (state) {
            setPlaying(!state.paused);
            setTrack(state.track_window.current_track);
            setDuration(state.duration);
            setCurrentTime(state.position);
          }
        });

        spotifyPlayer.connect().then(success => {
          if (success) {
            console.log('Player connected successfully');
          } else {
            console.error('Failed to connect player');
          }
        });

        setPlayer(spotifyPlayer);
      } else {
        console.error('Spotify object is not available');
      }
    };

    initializePlayer();

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  const handlePlayPause = () => {
    if (player) {
      player.getCurrentState().then(state => {
        if (state && state.paused) {
          player.resume();
        } else {
          player.pause();
        }
      });
    }
  };

  const handleNext = () => {
    if (player) {
      player.nextTrack();
    }
  };

  const handlePrevious = () => {
    if (player) {
      player.previousTrack();
    }
  };

  const handleSeek = (position) => {
    if (player) {
      player.seek(position);
    }
  };

  return (
    <div className="spotify-player">
      <h2>Spotify Player</h2>
      <SeekBar duration={duration} currentTime={currentTime} onSeek={handleSeek} />
      <div className="controls">
        <button onClick={handlePrevious}><IoPlaySkipBackSharp /></button>
        <PlayerControls onPlayPause={handlePlayPause} isPlaying={playing} />
        <button onClick={handleNext}><IoPlaySkipForwardSharp /></button>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
