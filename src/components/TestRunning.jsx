/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../utils/useFetch"
import DistanceMeasurements from "./BleDevices/DistanceMeasurements"
import StyleContex from "../context/StyleContex"
import WebSocketContex from "../context/WebSocketContex"
import TestGroupDescription from "./Descriptions/TestGroupDescription"
import DeviceInformation from "./Informations/DeviceInformation"

export default function TestStartForm() {
    const { containerStyle, headerStyle, formStyle, buttonStyle } = useContext(StyleContex)
    const { isServerReady, isGatewayReady, uwbList } = useContext(WebSocketContex)
    const [testIDstate, setTestID] = useState(0)
    const [testGroupID, setTestGroupID] = useState(0)
    const [testInfo, setTestInfo] = useState([])
    const [testGroup, setTestGroup] = useState([])
    let api = useFetch()
    let navigate = useNavigate()
    let { testID } = useParams()

    let getTestGroup = async () => {
        let { response, data } = await api(`/api/tests/groups/${testGroupID}`)

        if (response.status === 200) {
            setTestGroup(data)
        }
    }

    let getTest = async () => {
        let { response, data } = await api(`/api/tests/${testIDstate}`)

        if (response.status === 200) {
            setTestInfo(data)
            setTestGroupID(data.test_group)
            console.log(data)
        }
    }

    useEffect(() => {
        if (testGroupID !== "0") {
            getTestGroup()
        }
    }, [testGroupID])

    useEffect(() => {
        if (testIDstate !== "0") {
            getTest()
        }
    }, [testIDstate])

    useEffect(() => {
        setTestID(testID)
    }, [testID])

    return (
        <>
            <div className={containerStyle.component}>
                <div className={containerStyle.left}>
                    <h3 className={headerStyle.h3}>
                        Start Test {testID}
                    </h3>
                    <div className={containerStyle.leftComponent}>
                        <button
                            type="button"
                            className={buttonStyle.activ}
                            onClick={() => {
                                navigate(-1, { replace: true })
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <div className={containerStyle.leftComponent}>
                        <DeviceInformation
                            deviceName="Server"
                            deviceStatus={isServerReady}
                        />
                    </div>
                    <div className={containerStyle.leftComponent}>
                        <DeviceInformation
                            deviceName="Gateway"
                            deviceStatus={isGatewayReady}
                        />
                    </div>
                    <div className={containerStyle.leftComponent}>
                        {uwbList &&
                            uwbList.map((item) => {
                                return (
                                    <DeviceInformation
                                        deviceName={item}
                                        deviceStatus
                                        key={item}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div className={formStyle.form}>
                    <div className={formStyle.header} />
                    <div className="w-full mt-2 mb-4 px-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 sm:px-6">
                        <div className={formStyle.fullComponent}>
                            <TestGroupDescription testGroup={testGroup} />
                        </div>
                        <div className="col-span-6 border-b border-gray-900/10 pb-1" />
                        <div className="sm:col-span-6">
                            <div className="font-bold leading-tight mt-1 text-m md:text-l lg:text-xl">
                                Test Description
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="realTestDistance"
                                className="block text-sm font-medium leading-6"
                            >
                                Real test distance
                                <div className="mt-1">
                                    <input
                                        className="block w-full rounded-md border-0 px-2 py-1.5 dark:bg-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="number"
                                        id="realTestDistance"
                                        label="Test reale distance"
                                        min="0"
                                        step="0.001"
                                        value={testInfo.real_test_distance}
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="testComment"
                                className="block text-sm font-medium leading-6"
                            >
                                Test Comment
                                <div className="mt-1">
                                    <textarea
                                        className="block w-full resize-none rounded-md border-0 px-2 py-1.5 dark:bg-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="testComment"
                                        label="Test Comment"
                                        rows={6}
                                        maxLength="300"
                                        value={testInfo.comments}
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <DistanceMeasurements
                    testID={parseInt(testID)}
                    testDistance={testInfo.real_test_distance}
                    minMeasurements={testGroup.test_min_measurements}
                    maxMeasurements={testGroup.test_max_measurements}
                    initiator={testInfo.initiator_device_id}
                    responder={testInfo.responder_device_id}
                    // init_rx_ant_dly={testInfo.antenna_delay_init_rx}
                    // init_tx_ant_dly={testInfo.antenna_delay_init_tx}
                    // resp_rx_ant_dly={testInfo.antenna_delay_resp_rx}
                    // resp_tx_ant_dly={testInfo.antenna_delay_resp_tx}
                    init_rx_ant_dly={2.630913330620677e-07}
                    init_tx_ant_dly={2.630913330620677e-07}
                    resp_rx_ant_dly={2.630913330620677e-07}
                    resp_tx_ant_dly={2.630913330620677e-07}
                    measurementTypePre={testGroup.test_measurement_type}
                    devicePreSelected
                />
            </div>
        </>
    )
}
