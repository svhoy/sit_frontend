import React from 'react';
import BleDevices from '../components/BleDevices';


export default function BleDevicePage() {
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Bluetooth Connect Devices
      </h2>
      <BleDevices />
    </>
  );
}