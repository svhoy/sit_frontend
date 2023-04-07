import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../utils/useFetch"
import AuthContext from "../context/AuthContext"
import DistanceMeasurements from "./BleDevices/DistanceMeasurements"
import WebSocketContex from "../context/WebSoketContex"
import TestGroupDescription from "./Descriptions/TestGroupDescription"
import TestGroupSelect from "./Selects/TestGroupSelect"

export default function TestStartForm() {
    const { user } = useContext(AuthContext)
    const { isUWBReady } = useContext(WebSocketContex)
    const [startTest, setStartTest] = useState(false)
    const [testID, setTestID] = useState(null)
    const [testGroupID, setTestGroupID] = useState(0)
    const [addTestForm, setAddTestForm] = useState({
        owner: 0,
        testGroupId: 0,
        realTestDistacnce: 0,
        testComment: ""
    })
    const [testGroup, setTestGroup] = useState([])
    let api = useFetch()
    let navigate = useNavigate()
    let { groupID } = useParams()

    let getTestGroup = async () => {
        let { response, data } = await api(`/api/tests/groups/${testGroupID}`)

        if (response.status === 200) {
            setTestGroup(data)
        }
    }

    useEffect(() => {
        if (testGroupID !== "0") {
            getTestGroup()
            const newFormData = { ...addTestForm }
            newFormData.testGroupId = testGroupID
            setAddTestForm(newFormData)
        }
    }, [testGroupID])

    useEffect(() => {
        setTestGroupID(groupID)
    }, [groupID])

    let handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("id")
        let fieldValue = null
        if (event.target.value !== "") {
            fieldValue = event.target.value
        }
        const newFormData = { ...addTestForm }
        newFormData[fieldName] = fieldValue

        setAddTestForm(newFormData)
    }

    let sendTestAdd = async (addForm) => {
        let { response, data } = await api("/api/tests/", "POST", JSON.stringify(addForm))
        console.log(response)
        if (response.status === 201) {
            setStartTest(true)
            setTestID(data.id)
        }
    }

    useEffect(() => {}, [startTest])

    let handleAddFormSubmit = (event) => {
        event.preventDefault()
        if (isUWBReady === true) {
            let addForm = {
                owner: user.user_id,
                test_group: addTestForm.testGroupId,
                real_test_distance: addTestForm.realTestDistacnce,
                test_comment: addTestForm.testComment
            }
            sendTestAdd(addForm)
        } else {
            console.error("Kein Device Verbunden, bitte erst UWB Device verbinden")
        }
    }

    let handleSelectChange = (event) => {
        event.preventDefault()
        groupID = event.target.value
        setTestGroupID(groupID)
    }

    return (
        <>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                            Start New Test
                        </h3>
                        <div className="grid grid-cols-2 gap-0">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={() => {
                                    navigate(-1, { replace: true })
                                }}
                            >
                                Back
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-0" />
                        <div className="grid grid-cols-2 gap-0" />
                    </div>
                </div>
                <form
                    className="mt-5 md:col-span-2 md:mt-0 md:w-full"
                    onSubmit={handleAddFormSubmit}
                >
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            >
                                Start Test
                                <span className="ml-2">
                                    <FontAwesomeIcon icon={faPlay} />
                                </span>
                            </button>
                        </div>
                        <div className="w-full mt-2 mb-4 px-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 sm:px-6">
                            <div className="sm:col-span-6">
                                <TestGroupSelect
                                    handleSelectChange={handleSelectChange}
                                    groupID={testGroupID}
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <TestGroupDescription testGroup={testGroup} />
                            </div>

                            <div className="col-span-6 border-b border-gray-900/10 pb-1" />
                            <div className="sm:col-span-6">
                                <div className="font-bold leading-tight text-gray-900 mt-1 text-m md:text-l lg:text-xl">
                                    Test Description
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="realTestDistance"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Real test distance
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            type="number"
                                            id="realTestDistance"
                                            label="Test reale distance"
                                            min="0"
                                            step="0.001"
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="testComment"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Test Comment
                                    <div className="mt-1">
                                        <textarea
                                            className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="testComment"
                                            label="Test Comment"
                                            rows={6}
                                            maxLength="300"
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {startTest === true ? (
                <DistanceMeasurements
                    testID={testID}
                    testDistance={testGroup.test_distance}
                    minMeasurements={testGroup.test_min_measurements}
                    maxMeasurements={testGroup.test_max_measurements}
                />
            ) : (
                <div />
            )}
        </>
    )
}
