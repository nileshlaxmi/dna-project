import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './index.scss';

class ToolTip extends Component {
  componentDidMount() {
    if (this.props.hideTooltip) this.hideTooltipAction();
  }

  hideTooltipAction() {
    this.props.hideTooltip(ReactTooltip);
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const {
      id,
      place,
      className,
      arrowColor = '#000000d1',
      bgColor = '#000000d1',
      textColor = '#fff',
    } = this.props;

    return (
      <ReactTooltip
        id={id}
        clickable={true}
        place={place || 'bottom'}
        className={className}
        effect="solid"
        html={true}
        scrollHide={true}
        arrowColor={arrowColor}
        backgroundColor={bgColor}
        delayShow={0}
        textColor={textColor}
      />
    );
  }
}

export default ToolTip;
