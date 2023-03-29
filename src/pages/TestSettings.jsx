import React, { useState } from 'react';
import TestSettingsAddForm from '../components/TestSettingsAddForm';
import DistanceTestsTable from '../components/DistanceTestsTable';

export default function TestSettings() {
  const [testState, setTestState] = useState(null)

  let handleTestState = (state) => {
    setTestState(state)
  }
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Distanz Tests
      </h2>
      {(testState === null)  &&
        <div>
          <DistanceTestsTable
            handleTestState={handleTestState}/>
        </div>
      }
      { (testState === "add") && 
        <div className='my-5'>
          <TestSettingsAddForm
            handleTestState={handleTestState}
          />
        </div>
      }
     </>
  );
}
