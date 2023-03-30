import React from 'react';
import UwbSettingsTable from '../components/UwbSettingsTable';

export default function SettingsPage() {
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Settings
      </h2>

      <h3 className="font-bold leading-tight text-gray-900 text-l md:text-l lg:text-xl">
        UWB Device Settings
      </h3>
      <div className='mt-5'> 
        <UwbSettingsTable />
      </div>
      
    </>
  );
}
