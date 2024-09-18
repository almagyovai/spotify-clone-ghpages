import React, { useEffect, useState, useRef } from 'react';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

const PlayerControls = ({ player }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (player) {
      const handlePlayerStateChange = (state) => {
        if (state) {
          setIsPlaying(!state.paused);
          setDuration(state.duration || 0);
          setCurrentTime(state.position || 0);
        }
      };

      player.addListener('player_state_changed', handlePlayerStateChange);

      return () => {
        player.removeListener('player_state_changed', handlePlayerStateChange);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [player]);

  const handlePlayPause = () => {
    if (player) {
      player.getCurrentState()
        .then(state => {
          if (state) {
            if (state.paused) {
              player.resume().catch(error => console.error('Error resuming playback:', error));
              setIsPlaying(true);
            } else {
              player.pause().catch(error => console.error('Error pausing playback:', error));
              setIsPlaying(false);
            }
          }
        })
        .catch(error => console.error('Error toggling play/pause:', error));
    }
  };

  const handleSeek = (position) => {
    if (player) {
      player.seek(position).catch(error => console.error('Error seeking track:', error));
    }
  };

  useEffect(() => {
    if (player && isPlaying) {
      intervalRef.current = setInterval(() => {
        player.getCurrentState()
          .then(state => {
            if (state) {
              setCurrentTime(state.position);
            }
          })
          .catch(error => console.error('Error fetching current state:', error));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, player]);

  return (
    <div className="player-controls">
      <button onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <IoMdPause /> : <IoMdPlay />}
      </button>
      <div className="time-info">
        <span>{Math.floor(currentTime / 1000)}s / {Math.floor(duration / 1000)}s</span>
      </div>
    </div>
  );
};

export default PlayerControls;
