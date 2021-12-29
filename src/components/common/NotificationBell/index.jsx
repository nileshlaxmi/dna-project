import React, { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import BellIcon from "assets/images/bellIcon.svg";
import NoNotifications from "assets/images/noNotifications.svg";
import "./index.scss";
import Notification from "./Notification";

const NotificationBell = ({
  notificationsList,
  isFetching,
  markAsRead,
}) => {
  const useStyles = makeStyles(() => ({
    paper: {
     // width: isMobile() ? "calc(100% - 4rem)" : (isTablet() || (isChromeOS() && !isLandscape()) )? "50%" : "25%",
      width:      "calc(100% - 4rem)",
      overflowY:  "hidden",
      marginTop:  "3.25rem",
      marginLeft: "2rem",
      maxWidth:   "24rem",
      display:    "flex",
      flexDirection: "column",
      maxHeight: "22rem",
    },
  }));

  const classes = useStyles();

  const [anchorEl, setanchorEl] = useState(null);
  const [selectedNotification, setselectedNotification] = useState({});
  const activeCount = (notificationsList.list && notificationsList.count) || 0;
  const notificationsCount = (notificationsList.list && notificationsList.list.length) || 0;

  const bellClickHandler = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const readNotification = (notification) => {
    setselectedNotification(notification);
    markAsRead(notification);
  };

  const Notifications = (
    (notificationsList && notificationsList.list) ||
    []
  ).map((notification, i) => {
    const showSpinner = isFetching && notification.uid === selectedNotification.uid;
    const isLast = notificationsList.list[i + 1] ? false : true;
    return (
      <Notification
        notification={notification}
        key={notification.uid}
        readNotification={readNotification}
        showSpinner={showSpinner}
        isLast={isLast}
      />
    );
  });

  return (
    <div className="notification">
      <div
        className={
          anchorEl ? "notification__circle" : "notification__circle-clear"
        }
        onClick={(e) => {
          bellClickHandler(e);
        }}
      >
        <img
          className="notification__bell"
          alt="logo"
          src={BellIcon}
        />
        {activeCount > 0 && (
          <span className="notification__dot">
            <div className="notification__num">{activeCount}</div>
          </span>
        )}
      </div>
      {anchorEl && <div className="notification__triangle"></div>}
      <Popover
        id="simple-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        disableScrollLock={true}
        classes={{
          paper: classes.paper,
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div className="notification__header">Notifications</div>
        <div className="notification__list">
          {notificationsCount === 0 ? (
            <div className="notification__empty-container">
              <img className="notification__empty" src={NoNotifications} />
            </div>
          ) : (
            Notifications
          )}
        </div>
      </Popover>
    </div>
  );
};

export default NotificationBell;
