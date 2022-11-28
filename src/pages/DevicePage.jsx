import React from 'react';
import Devices from '../components/Devices';


export default function DevicePage() {
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Devices
      </h2>
      <Devices />
    </>
  );
}