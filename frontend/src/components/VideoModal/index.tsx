import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';

import './style.scss';

const playButton =
  'http://localhost:8080/wp-content/uploads/2019/08/play-button.jpg';

interface Props {
  videoId: string;
  videoName: string;
  placeholderImage: string;
}

const VideoModal: React.SFC<Props> = ({
  videoId,
  videoName,
  placeholderImage,
}) => {
  const [videoState, changeVideoState] = useState('CLOSED');

  const toggleModal = () => {
    return changeVideoState(videoState === 'CLOSED' ? 'OPEN' : 'CLOSED');
  };

  return (
    <div className="video-modal">
      <ModalVideo
        channel="vimeo"
        isOpen={videoState === 'OPEN'}
        videoId={videoId}
        onClose={toggleModal}
      />

      <div className="video-thumb" onClick={toggleModal}>
        <img
          className="background"
          style={{ position: 'absolute' }}
          src={placeholderImage}
          alt={videoName}
        />
        <div className="overlay">
          <img src={playButton} alt="play" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
