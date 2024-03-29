import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../utils/useFetch"
import ScatterChartTest from "./Charts/ScatterChartTest"
import TestDescription from "./Descriptions/TestDescription"
import DistanceTable from "./Tables/DistanceTable"

export default function TestDataReview() {
    let params = useParams()
    let api = useFetch()
    const [distanceData, setDistanceData] = useState([])
    const [scatterData, setScatterData] = useState([])
    const [testData, setTestData] = useState({})
    const [baseTestURL] = useState(`/api/tests/${params.testID}`)
    const [baseDistanceURL] = useState(`/api/measurement-list?test=${params.testID}&size=1000`)
    const [yaxisDomain, setYAxisDomain] = useState(null)

    let getDistanceList = async (url = baseDistanceURL) => {
        let { response, data } = await api(url)
        let distancePoints = 0
        if (response.status === 200) {
            setDistanceData(data.results)
            setScatterData(
                data.results.map((data) => {
                    distancePoints += 1
                    if (data.error_distance == null) {
                        setYAxisDomain([-1, 1])
                        return { x: data.distance, y: 0, dataPoints: distancePoints }
                    }
                    setYAxisDomain(null)
                    return { x: data.distance, y: data.error_distance, dataPoints: distancePoints }
                })
            )
        }
    }

    let getTestsList = async (url = baseTestURL) => {
        let { response, data } = await api(url)

        if (response.status === 200) {
            setTestData(data)
        }
    }

    useEffect(() => {
        getTestsList()
        getDistanceList()
    }, [])

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Test Information
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <TestDescription testData={testData} />
                    </div>
                </div>
            </div>
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Distance Measurements
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <ScatterChartTest
                            distanceData={scatterData}
                            testDistance={testData.real_test_distance}
                            yaxisDomain={yaxisDomain}
                        />
                    </div>
                </div>
            </div>
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Distance Table
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <DistanceTable
                            headers={["#", "Distance", "Error", "RSSI", "FPI", "NLOS"]}
                            distanceData={distanceData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
