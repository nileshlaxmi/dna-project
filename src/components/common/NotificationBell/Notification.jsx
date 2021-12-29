import React from "react";
import "./index.scss";
import moment from "moment";
import TimeIcon from "assets/images/time-icon.svg";
import AlertIcon from "assets/images/alert.svg";
import InfoIcon from "assets/images/info-icon-dark.svg";
import TickIcon from "assets/images/tick.svg";
import TickIconDark from "assets/images/tick-icon-dark.svg";

const Notification = ({ notification, readNotification, showSpinner, isLast }) => {
  
  const checkNotificationTime = (notification) => {
    var createdTime = moment(notification.created);
    var now = moment();
    var duration = moment.duration(now.diff(createdTime));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) % 60;

    return hours + " h and " + minutes + " min";
  };

  return notification.active ? (
    <div className={`notification__container ${!isLast ? "underline" : ""}`}>
      <div className="notification__content">
        <div className="notification__icon">
          <img
            src={notification.alert ? AlertIcon : InfoIcon}
          />
        </div>
        <div className="notification__text-active">
          {notification.notification}
        </div>
      </div>
      <div className="notification__action">
        <img className="notification__clock" src={TimeIcon} />
        <span className="notification__time">
          {checkNotificationTime(notification)}
        </span>
        {showSpinner ? (
          <div>
            <div className="fa fa-spinner fa-spin notification__spinner"></div>
          </div>
        ) : (
          <img
            title="mark as read"
            className="notification__tick hand"
            src={TickIcon}
            onClick={() => readNotification(notification)}
          />
        )}
      </div>
    </div>
  ) : (
    <div className={`notification__container ${!isLast ? "underline" : ""}`}>
      <div className="notification__content">
        <div className="notification__icon">
          <img
            src={notification.alert ? AlertIcon : InfoIcon}
          />
        </div>
        <div className="notification__text-inactive">
          {notification.notification}
        </div>
      </div>
      <div className="notification__action">
        <img className="notification__clock" src={TimeIcon} />
        <span className="notification__time">
          {checkNotificationTime(notification)}
        </span>
        <img
          className="notification__tick"
          src={TickIconDark}
        />
      </div>
    </div>
  );
};

export default Notification;
