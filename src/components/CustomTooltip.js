import React from 'react';

const formatter = number => {
  const numFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  });
  return numFormat.format(number);
};

const CustomTooltip = ({ active, payload: data, label }) => {
  if (active) {
    const { payload } = data[0];
    const { name, category, value } = payload;
    return (
      <ul className="tooltip-list">
        <li className="tooltip-item">{`${name}`}</li>
        <li className="tooltip-item">{`Genre: ${category}`}</li>
        <li className="tooltip-item">{`Gross: ${formatter(value)}`}</li>
      </ul>
    );
  }

  return null;
};

export default CustomTooltip;
