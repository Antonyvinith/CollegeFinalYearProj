import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const AnalyticsIcon = ({ size = 24, color = 'currentColor' }) => {
  return (
    <FaChartBar
      size={size}
      color={color}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
};

export default AnalyticsIcon;