import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../utils/useFetch"
import ScatterChartTest from "./Charts/ScatterChartTest"
import TestDescription from "./Descriptions/TestDescription"
import DistanceTable from "./Tables/DistanceTable"
import StyleContex from "../context/StyleContex"

export default function TestDataReview() {
    let params = useParams()
    let api = useFetch()
    const { containerStyle, headerStyle } = useContext(StyleContex)
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
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Test Information
                </h3>
            </div>
            <div className={containerStyle.right}>
                <div className={containerStyle.rightContainer}>
                    <TestDescription testData={testData} />
                </div>
            </div>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Distance Measurements
                </h3>
            </div>
            <div className={containerStyle.right}>
                <div className={containerStyle.rightContainer}>
                    <ScatterChartTest
                        distanceData={scatterData}
                        testDistance={testData.real_test_distance}
                        yaxisDomain={yaxisDomain}
                    />
                </div>
            </div>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Distance Table
                </h3>
            </div>
            <div className={containerStyle.right}>
                <DistanceTable
                    headers={["#", "Distance", "Error", "RSSI", "FPI", "NLOS"]}
                    distanceData={distanceData}
                />
            </div>
        </div>
    )
}
