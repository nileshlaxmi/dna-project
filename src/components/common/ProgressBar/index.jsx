import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColoredLinearProgress = (LinearProgress, barColor) => {
  return(withStyles(() => {
    return {
      root: {
        height: 6,
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: '#D8D8D8',
      },
      bar: {
        borderRadius: 5,
      },
      barColorPrimary: {
        backgroundColor: barColor,
      }
    };
  })(LinearProgress))
}

export default function ProgressBar({ value, barColor }) {
  const EnhancedLinearProgress = ColoredLinearProgress(LinearProgress,barColor)
  return (
    <EnhancedLinearProgress variant="determinate" value={value || 0} />
  );
}
