import React from 'react';
import StaicDistanceTestSettingsAddForm from '../components/StaticDistanceTestSettingsAddForm';

export default function StaticDistancePage() {
  return (
    <>
      <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
        Statischer Distanz Test
      </h2>
      <StaicDistanceTestSettingsAddForm />
    </>
  );
}
