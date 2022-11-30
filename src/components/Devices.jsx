import React from 'react'
import ProvisioningDevices from './Devices/ProvisioningDevices';
import ScanningDevices from './Devices/ScanningDevices';

export default function Devices() {
    
    return (
    <>  
        <div className='md:grid md:grid-cols-1 md:gap-10'>
            <div>
                <ScanningDevices />
            </div>
            <div>
                <ProvisioningDevices />
            </div>
        </div>
        
    </>
  );
}
