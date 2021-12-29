import React from 'react';
import Countdown from 'react-countdown';
import CustomPopUp from 'components/common/CustomPopUp';
import { CONSTANTS, SESSION_TIMEOUT_NEXT } from 'constants/index';
import RenderBtn from 'components/common/elements/renderBtn';
import './style.scss';
import sessionTimeoutWarning from 'assets/images/sessionTimeoutWarning.svg';
import withError from 'utils/errorHoc';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) return <strong>{'0m : 0s'}.</strong>;
  else return <strong>{`${minutes}m : ${seconds}s`}.</strong>;
};

const Timer = () => {
  return (
    <Countdown date={Date.now() + SESSION_TIMEOUT_NEXT} renderer={renderer} />
  );
};

const SessionWarning = ({ isPopupOpen, closeSessionPopUp, onLogout }) => {
  return (
    <div className="session-warning">
      <CustomPopUp isPopupOpen={isPopupOpen} closeIconNotReq={true} containerClassname={'small-popup'}>
        <div className="session-warning__body">
          <div className="session-warning__body--image-box">
            <div className="session-warning__body--image-box--img">
              <img src={sessionTimeoutWarning} alt="warning" />
            </div>
            <div className="session-warning__body--image-box--text">
              <div className="session-warning__body--image-box--text--title">
                {CONSTANTS.sessionTimeOutHeader}
              </div>
              <div className="session-warning__body--image-box--text--subtitle">
                {CONSTANTS.sessionTimeOutLogout}
                <Timer />
              </div>
              <div className="session-warning__body--image-box--text--subtitle">
                {CONSTANTS.sessionTimeOutSigned}
              </div>
            </div>
          </div>
          <div className="session-warning__body--btn-box">
            <RenderBtn
              type="submit"
              id="session-warning-submit"
              label={CONSTANTS.stayConnected}
              onClick={closeSessionPopUp}
            />
            <RenderBtn
              type="cancel"
              label={CONSTANTS.signMeOut}
              onClick={onLogout}
            />
          </div>
        </div>
      </CustomPopUp>
    </div>
  );
};

export default withError(SessionWarning);
