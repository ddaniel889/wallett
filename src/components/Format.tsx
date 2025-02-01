import React from 'react';


export default function Format({ amount, currency }) {
  const formatMoney = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className='my-4'>
      <p className="font-bold text-sm mb-2 text-sky-900">{formatMoney(amount, currency)}</p>
    </div>
  );
}
