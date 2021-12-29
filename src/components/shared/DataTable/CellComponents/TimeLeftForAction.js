
import { countBy, isArray } from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useRef, useState } from 'react';

const EXP_TIME = 20;
const TimeLeftForAction = ({ row, handleActions, rowIndex }) => {
    const id = `timer_${rowIndex}`;
    let timeLapes = moment().diff(row.created, 'seconds')
    let timeRemaining = EXP_TIME - timeLapes
    useEffect(() => {
        const intervalRef = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(intervalRef)
                handleActions('time_up', row)
            }
            let minute = Math.floor(timeRemaining / 60)
            let second = Math.floor(timeRemaining % 60)
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = `${minute <= 0 ? 0 : minute} : ${second <= 0 ? 0 : second} mins`;
            }
            timeRemaining = timeRemaining - 1;
        }, 1000);
    }, [])
    return (
        <div className="likely_cause capitalize">
            <span id={id}></span>
        </div>
    );
};

export default TimeLeftForAction;