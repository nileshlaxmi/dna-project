import React from "react";
import { Player } from "video-react";
import withError from "utils/errorHoc";
import { withRouter } from "react-router-dom";
import "./index.scss";
import videoIcon from "assets/images/bg-video.jpg";

const ViewVideo = ({ signedURL }) => {
	return (
		<div className="view-image-container">
			<div className="image-wrapper" onContextMenu={(e) => e.preventDefault()}>
				<Player
					playsInline
					poster={videoIcon}
					// src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
					src={signedURL}
				/>
			</div>
		</div>
	);
};

export default withError(withRouter(ViewVideo));
