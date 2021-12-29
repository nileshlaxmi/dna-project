import { isMobile } from '../../../utils/responsive';

const styles = {
  root: {
    width: '100%',
    // padding: "1px 1px"
    background: 'transparent',
  },
  tableCellRoot: {
    padding: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '400 !important',
    maxWidth: isMobile() ? '100vw' : '10vw',
    fontFamily: "'Telus-Web-Lt', sans-serif",
    borderBottom: '1px solid gainsboro',
    letterSpacing: '-0.6px',
  },
  extraSmallContainer: {
    maxHeight: '320px !important',
  },
  smallContainer: {
    maxHeight:(props = {}) => {
      const { heightOffset = '290' } = props;
        return `calc(100vh - ${heightOffset}px)`;
    }
  },
  mediumContainer: {
    maxHeight: 460,
  },
  largeContainer: {
    maxHeight: 530,
  },
  head: {
    minWidth: '150px',
    padding: '10px 8px 10px',
    fontWeight: '600 !important',
    // background: "#FFFFFF",
    // boxShadow: "4px 4px 10px -2px rgba(84, 89, 95, 0.24)"
  },
  tableRoot: {
    minWidth: (props = {}) => {
      const { collapsibleTableWidth = '' } = props;
      if (collapsibleTableWidth) return collapsibleTableWidth;
    },
    borderCollapse: 'separate',
    // tableLayout: "fixed"
  },
  tableHeader: {
    border: '1px solid whitesmoke',
  },
  headIcon: {
    cursor: 'pointer',
  },
  inactiveColumn: {
    opacity: 0.5,
  },
  activeColumn: {
    opacity: 1,
  },
  rowRoot: {
    boxShadow: '1px 2px 10px rgba(84, 89, 95, 0.24)',
  },
  disableIcon: {
    // pointerEvents: 'none',
    opacity: 0.5,
  },
  customScrollbar: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '6px',
      background: '#f5f5f5',
      borderRadius: '50px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '50px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      background: '#f5f5f5',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#979797',
    },
  },
};

export default styles;
