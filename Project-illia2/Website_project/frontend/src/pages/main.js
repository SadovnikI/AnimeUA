import React from 'react';
import ResponsivePlayer from '../video/ResponsivePlayer';
import { FaColumns } from 'react-icons/fa';

const Services = () => {
  return (
    <div
      style={{
        display: 'flex',
        direction:FaColumns,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
     
      <ResponsivePlayer />
    </div>
  );
};

export default Services;