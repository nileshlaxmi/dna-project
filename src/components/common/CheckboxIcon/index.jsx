import React from "react";
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import "./index.scss";
import variable from '../../../assets/scss/variable.scss';

const StyledButtonBase = withStyles({
  root: {
    padding: "0 10px 0 0",
    marginTop: "-2px",
  },
})(props => <ButtonBase disableRipple={true} {...props} />);

const StyledIconButton = withStyles({
  root: {
    padding: "0",
  },
})(props => <IconButton disableRipple={true}  {...props} />);

const StyledCheckBoxIcon = withStyles({
  root: {
    color: (props) => props.checked_color || variable.checkboxGreen
  },
})(props => <CheckBoxIcon {...props} />);

const StyledCheckBoxOutlinedIcon = withStyles({
  root: {
    color: (props) => props.checked_color || variable.checkboxGreen,
    opacity: (props) => !props.disabled ? 0.6 : 0.3,
  },
})(props => <CheckBoxOutlinedIcon {...props} />);

const StyledCheckBoxOutlineBlankIcon = withStyles({
  root: {
    backgroundColor: "transparent",
    background: variable.black,
    opacity: "0.45",
  },
})(props => <CheckBoxOutlineBlankIcon {...props} />);

const CheckboxIcon = props => {
  const { checked, checked_color, onClick, outlined, disabled } = props;
  let CheckBox = StyledCheckBoxOutlineBlankIcon;
  if (checked) {
    if (outlined) {
      CheckBox = StyledCheckBoxOutlinedIcon
    } else {
      CheckBox = StyledCheckBoxIcon
    }
  }
  return (
    <StyledButtonBase disabled={!checked} onClick={() => checked && onClick()}>
      <StyledIconButton>
        <CheckBox {...props} />
      </StyledIconButton>
    </StyledButtonBase>
  )
};

export default CheckboxIcon;
