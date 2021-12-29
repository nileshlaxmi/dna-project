import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './index.scss';
import closeIcon from 'assets/images/close.svg';

class CustomPopUp extends Component {
  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }
  componentWillUnmount() {
    let popupOpen = document.getElementsByClassName('popup-content');
    // if (popupOpen && popupOpen.length === 1) {
    if (popupOpen?.length) {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }
  render() {
    const props = this.props;
    return (
      <div className={`popup-container ${props.containerClassname}`}>
        <Popup
          open={props.isPopupOpen}
          modal
          onClose={() => props.popupClosed()}
          closeOnDocumentClick={false}
          overlayStyle={{ zIndex: props.zIndex || '999' }}
        >
          {close => (
            <div className="popup-width">
              <div className="popup-header">
                {props.popupTitle && (
                  <div className="title">
                    <h4
                      title={props.popupTitle}
                      className={props.customClass ? props.customClass : ''}
                    >
                      {props.popupTitle}
                    </h4>
                    {props.popupSubTitle && (
                      <h3 className="subtitle">{props.popupSubTitle}</h3>
                    )}
                  </div>
                )}
                {props.headerButton && (
                  <div className="header-btn d-inline-block">
                    {props.headerButton}
                  </div>
                )}
              </div>
              {!props.closeIconNotReq && (
                <div
                  className="popup-close"
                  data-testid="closelargepopup"
                  onClick={close}
                >
                  <img src={closeIcon} alt="close popup" />
                </div>
              )}
              <div className="popup-body">{props.children}</div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default CustomPopUp;
