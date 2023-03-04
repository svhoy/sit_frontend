import React from 'react';
import MeshDevices from '../components/MeshDevices';


export default function MeshDevicePage() {
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Mesh Connection Devices
      </h2>
      <MeshDevices />
    </>
  );
}