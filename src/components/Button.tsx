
import React from 'react';


export default function Button ({ label, onClick, disabled,className })  {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};


