import React from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Videos() {
  return (
    <div className="video-container">
      <img
        className="full-width-image"
        src="https://res.cloudinary.com/dmfzplfra/image/upload/v1711538599/VENICE/Portada/Design_9_ochsp0.png"
        alt=""
      />
      <div className="video-group">
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1711328297/VENICE/VIDEOS/nike_tgxmuk.mp4"
        />
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1711290729/VENICE/VIDEOS/Designer_1_koaqbc.mp4"
        />
      </div>
      <div className="video-group">
        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1711342558/VENICE/VIDEOS/HOLLISTER_gx0nbk.mp4"
        />

        <Player
          className="video-element"
          playsInline
          hideControls={true}
          autoPlay
          muted
          fluid
          src="https://res.cloudinary.com/dmfzplfra/video/upload/v1711328296/VENICE/VIDEOS/levis_f8yulu.mp4"
        />
      </div>
    </div>
  );
}
