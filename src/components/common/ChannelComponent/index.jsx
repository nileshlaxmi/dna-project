import React, { useState } from "react";

const ChannelComponent = ({ row, handleActions }) => {
	const [status, setStatus] = useState(false);
	let remainingChannelCount = 0;
	let channels = [];
	(row.channel || []).map((res, i) => {
		if (status || (!status && i === 0)) {
			channels.push(<div>{res}</div>);
		} else {
			remainingChannelCount++;
		}
	});

	return (
		<div className="likely_cause capitalize">
			{channels}
			{!!remainingChannelCount && (
				<a className="hand" onClick={() => setStatus(true)}>
					+{remainingChannelCount} more
				</a>
			)}
		</div>
	);
};

export default ChannelComponent;
