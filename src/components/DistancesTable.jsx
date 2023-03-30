import React, { useState, useEffect } from 'react'
import useFetch from '../utils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function DistancesTable() {
  const [distanceMeasurementsList, setdistanceMeasurementsList] = useState([])
  const [baseURL] = useState('/api/measurement-list/')
  const [nextURL, setNextURL] = useState(null)
  const [previousURL, setPreviousURL] = useState(null)
  var rexPage = new RegExp('\\?page\=\\d{1,}')

  let api = useFetch()

  useEffect(() => {
    getDistanceMeasurements();
  }, []);

  let getDistanceMeasurements = async(url = baseURL) => {
    let {response, data} = await api(url)
    if (response.status === 200) {
        if(data.next) {
            let nextPage = data.next.match(rexPage)
            setNextURL(baseURL + nextPage)
        } else {
            setNextURL(null)
        }
        if(data.previous) {
            if(rexPage.test(data.previous)) {
                let previousPage = data.previous.match(rexPage)
                setPreviousURL(baseURL + previousPage)

            } else {
                setPreviousURL(baseURL)
            }
        } else {
            setPreviousURL(null)
        }
        setdistanceMeasurementsList(data.results)
    }
  }

  let deleteDistance = async(settingId) => {
    let {response, data} = await api('/api/measurement-list/' + settingId + '/', 'DELETE')

    if (response.status === 204) {
        getDistanceMeasurements()
    }
  }

  let nextPage = () => {
    getDistanceMeasurements(nextURL)
  }

  let previousPage = () => {
    getDistanceMeasurements(previousURL)
  }

  let handleDeleteClick = (settingId) => { 
    deleteDistance(settingId)
  }

  return (
    <>
    <table className="table-auto max-w-full ">
        <thead className="bg-white border-b">
            <tr>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID
                </th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Created
                </th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Distance
                </th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                </th>
            </tr>
        </thead>
        <tbody>
            {distanceMeasurementsList && distanceMeasurementsList.map((item) => (
                <tr key={item.id} className="bg-white border-b odd:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.created}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.distance}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button type="button" className="mx-2" onClick={()=> handleDeleteClick(item.id)} title="Löschen">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <div className="mt-5 md:col-span-2 md:mt-1">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-gray-50 px-1 py-3 text-left sm:px-3">
                {(previousURL != null) ? (
                    <button
                        type='button' 
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                        onClick={previousPage}
                    >
                        Previous
                    </button>
                ):(
                    <button
                        type='button' 
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                        disabled
                    >
                        Previous
                    </button>
                )}
                {(nextURL != null) ? (
                    <button
                        type='button' 
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                        onClick={nextPage}
                    >
                        Next
                    </button>
                ):(
                    <button
                        type='button' 
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                        disabled
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    </div>
    </>
  );
}
