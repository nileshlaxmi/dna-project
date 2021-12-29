
import { isArray } from 'lodash';
import React, { Fragment, useState } from 'react';


const ShowMore = ({ row, handleActions }) => {
    const [status, setStatus] = useState(false);
    let remainingReasonCount = 0;
    let reasons = [];
    let obj = [];
    if (row.reason) {
        obj = isArray(row.reason) ? row.reason : row.reason.split(' ');
    }
    obj.map((res, i) => {
        if (status || (!status && i === 0)) {
            reasons.push(<div>{res}</div>);
        } else {
            remainingReasonCount++;
        }
    });
    return (
        <div className="likely_cause capitalize">
            {reasons}
            {!!remainingReasonCount && (
                <a className="hand" onClick={() => setStatus(true)}>
                    +{remainingReasonCount} more
                </a>
            )}
        </div>
    );
};

export default ShowMore;