import React from 'react';

export default function Input  ({ type, value, onChange,id,className,name }) {
  return (
    <div>
      <input
        name={name}
        className={className}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


