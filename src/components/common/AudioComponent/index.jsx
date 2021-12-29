import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

const AudioComponent = ({
  url,
  onPlay,
  showJumpControls,
  customAdditionalControls,
  customVolumeControls,
  customIcons,
  autoPlay
}) => {
  return (
    <AudioPlayer
      autoPlay
      src={url}
      onPlay={evt => onPlay && onPlay(evt)}
      showJumpControls={showJumpControls}
      customAdditionalControls={customAdditionalControls}
      customVolumeControls={customVolumeControls}
      customIcons={customIcons}
      autoPlay={autoPlay}
    />
  );
};

export default AudioComponent;
