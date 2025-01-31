
import React from 'react';


export default function Button ({ label, onClick,className })  {
  return (
    <button className={className} onClick={onClick} >
      {label}
    </button>
  );
};


