import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import classNames from 'classnames';

export default function Dot({ type }) {
  let colorClass = '';
  switch (type) {
    case 'very-high':
      colorClass = 'text-[#ED4C5C]';
      break;
    case 'high':
      colorClass = 'text-[#FFCE31]';
      break;
    case 'medium':
      colorClass = 'text-[#00A790]';
      break;
    case 'low':
      colorClass = 'text-[#43C4E3]';
      break;
    default:
      colorClass = 'text-[#B01AFF]';
      break;
  }
  return (
    <div className={classNames(colorClass, 'text-lg')}>
      <GoPrimitiveDot />
    </div>
  );
}
