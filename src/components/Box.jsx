import React from 'react';

export default function Box(props) {
  const { value, onBoxClick, x, y } = props;

  return (
    <button className='box' key={`${x}${y}`} onClick={onBoxClick}>
      {value}
    </button>
  );
}
