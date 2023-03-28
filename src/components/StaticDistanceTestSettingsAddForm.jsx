import React, { useState, useEffect, useContext } from 'react'
import useFetch from '../utils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../context/AuthContext';

export default function StaicDistanceTestSettingsAddForm() {
  const {user} = useContext(AuthContext);
  const [addTestSettingsForm, setAddTestSettingsForm] = useState({
    "owner": 0,
    "testName": "neu",
    "testType": "Static Distance",
    "testMinMeasurements": null,
    "testMaxMeasurements": null,
  })
  let api = useFetch()

  useEffect(() => {

  }, []);

  let handleEditFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("id")
    const fieldValue = event.target.value; 
    const newFormData = { ...addTestSettingsForm}
    newFormData[fieldName] = fieldValue

    setAddTestSettingsForm(newFormData)
  }

  let sendTestAdd = async(addForm) => {
    let {response, data} = await api('/api/tests/settings-list', 'POST', JSON.stringify(addForm))

    if(response.status === 200) {
      console.log(data)
    }
  }

  let handleAddFormSubmit = (event) => {
    event.preventDefault()
    
    let addForm = {
      'owner': user.user_id,
      'test_name': addTestSettingsForm.testName,
      'test_type': addTestSettingsForm.testType,
      'test_min_measurements': addTestSettingsForm.testMinMeasurements,
      'test_max_measurements': addTestSettingsForm.testMaxMeasurements,
    }
    console.log(addForm)

    sendTestAdd(addForm)
  }

  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                Add Test Settings
            </h3>
            <div className='grid grid-cols-2 gap-0'></div>
            <div className='grid grid-cols-2 gap-0'></div>
            <div className='grid grid-cols-2 gap-0'></div>
          </div>
        </div>
        <form onSubmit={handleAddFormSubmit}>
          <div className="mt-5 md:col-span-2 md:mt-0 md:w-full">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                <button
                    type='submit'
                    
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                >
                    Add
                </button>
              </div>
              <div className="mt-2 mb-4 px-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <div class="sm:col-span-6">
                  <label htmlFor="testName" className="block text-sm font-medium leading-6 text-gray-900">Test Settings Name</label>
                  <div className="mt-1">
                    <input 
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type='text'
                      id="testName"
                      label="Test Name"
                      margin="normal"
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="testType" className="block text-sm font-medium leading-6 text-gray-900">Test Art</label>
                  <div className="mt-1">
                    <select 
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="testType"
                      label="Test Type"
                      margin="normal"
                      onChange={handleEditFormChange}

                    >
                      <option>Static Distance</option>
                    </select>

                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="testMinMeasurements" className="block text-sm font-medium leading-6 text-gray-900">Min. Messungen</label>
                  <div className="mt-1">
                    <input 
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type='number'
                      id="testMinMeasurements"
                      label="Test Measurements"
                      margin="normal"
                      min="0"
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="testMaxMeasurements" className="block text-sm font-medium leading-6 text-gray-900">Max Messungen</label>
                  <div className="mt-1">
                    <input 
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type='number'
                      id="testMaxMeasurements"
                      label="Test Max Measurements"
                      margin="normal"
                      min="0"
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
