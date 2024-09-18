import React, { useState } from 'react';

const SeekBar = ({ duration, currentTime, onSeek }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipValue, setTooltipValue] = useState(currentTime);

  // Format time from milliseconds to minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle changes to the seek bar input
  const handleSeekChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTooltipValue(newValue);
    onSeek(newValue);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Ensure duration and currentTime are valid numbers
  const validDuration = Math.max(0, duration);
  const validCurrentTime = Math.max(0, Math.min(currentTime, validDuration));

  return (
    <div className="seek-bar">
      <input
        type="range"
        min={0}
        max={validDuration}
        value={validCurrentTime}
        onChange={handleSeekChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ width: '100%' }}
        aria-valuemin={0}
        aria-valuemax={validDuration}
        aria-valuenow={validCurrentTime}
        aria-label="Seek bar"
      />
      {isDragging && (
        <div className="tooltip" style={{ left: `${(validCurrentTime / validDuration) * 100}%` }}>
          {formatTime(tooltipValue)}
        </div>
      )}
      <div className="time-info">
        {formatTime(validCurrentTime)} / {formatTime(validDuration)}
      </div>
    </div>
  );
};

export default SeekBar;
