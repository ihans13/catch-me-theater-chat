import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    facingMode: 'user',
};

const WebcamCapture = () => {
    const webcamRef = useRef(null);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
    );
};

export default WebcamCapture;