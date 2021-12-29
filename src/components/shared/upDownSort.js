import React from 'react';
import { Up, Down } from '../../utils/icons';

const UpDownSort = ({
  isModified,
  name = '',
  isUp = true,
  onToggle = () => {},
}) => (
  <div>
    {name}
    {isModified ? (
      <>
        {!isUp ? (
          <Up className="text-success" onClick={() => onToggle('desc')} />
        ) : (
          <Down className="text-success" onClick={() => onToggle('asc')} />
        )}
      </>
    ) : (
      <>
        <Up onClick={() => onToggle('asc')} />
        <Down onClick={() => onToggle('desc')} />
      </>
    )}
  </div>
);

export default UpDownSort;
