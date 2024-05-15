/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../utils/useFetch"
import AuthContext from "../context/AuthContext"
import StyleContex from "../context/StyleContex"
import WebSocketContex from "../context/WebSocketContex"
import TestGroupDescription from "./Descriptions/TestGroupDescription"
import TestGroupSelect from "./Selects/TestGroupSelect"
import DeviceInformation from "./Informations/DeviceInformation"
import DeviceSelect from "./Selects/DeviceSelect"
import LineDivider from "./Dividers/LineDivider"
import AntennaDelaySelect from "./Selects/AntennaDelaySelect"

export default function TestStartForm() {
    const { user } = useContext(AuthContext)
    const { headerStyle, buttonStyle, containerStyle, formStyle } = useContext(StyleContex)
    const { isServerReady, isGatewayReady, uwbList } = useContext(WebSocketContex)
    const [initiatorDevice, setInitinatorDevice] = useState("")
    const [responderDevice, setResponderDevice] = useState("")
    const [testGroupID, setTestGroupID] = useState(0)
    const [addTestForm, setAddTestForm] = useState({
        owner: 0,
        realTestDistance: 0,
        antennaDelayInitiator: 0,
        antennaDelayResponder: 0,
        testComment: ""
    })
    const [testGroup, setTestGroup] = useState({})
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
        if (testGroupID !== 0) {
            getTestGroup()
        }
    }, [testGroupID])

    useEffect(() => {
        console.log(groupID)
        if (groupID instanceof String) {
            setTestGroupID(parseInt(groupID, 10))
        }
    }, [])

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
            navigate(`/tests/running/${data.id}`)
        }
    }

    let handleAddFormSubmit = (event) => {
        event.preventDefault()
        if (initiatorDevice !== "" && responderDevice !== "") {
            let addForm = {
                owner: user.user_id,
                test_group: testGroupID,
                real_test_distance: addTestForm.realTestDistance,
                initiator_device: initiatorDevice[0],
                responder_device: responderDevice[0],
                antenna_delay_initator: addTestForm.antennaDelayInitiator,
                antenna_delay_responder: addTestForm.antennaDelayResponder,
                comments: addTestForm.testComment
            }
            console.log(addForm)
            sendTestAdd(addForm)
        } else {
            console.error("Kein Device Verbunden, bitte erst UWB Device verbinden")
        }
    }

    const handleInitiatorValue = (selectedDeviceID) => {
        console.log(selectedDeviceID)
        setInitinatorDevice(selectedDeviceID)
    }
    const handleResponderValue = (selectedDeviceID) => {
        setResponderDevice(selectedDeviceID)
    }

    const handleInitatorDelay = (selectedDelayID) => {
        addTestForm.antennaDelayInitiator = parseInt(selectedDelayID);
    }

    const handleResponderDelay = (selectedDelayID) => {
        console.log("Test: ", selectedDelayID)
        addTestForm.antennaDelayResponder = parseInt(selectedDelayID)
    }

    let handleSelectValue = (groupID) => {
        setTestGroupID(groupID)
    }

    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Start New Test
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
                    {uwbList
                        && uwbList.map((item) => {
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
            <form
                className={formStyle.form}
                onSubmit={handleAddFormSubmit}
            >
                <div className={formStyle.header}>
                    {isServerReady
                        && isGatewayReady
                        && initiatorDevice !== ""
                        && responderDevice !== "" ? (
                        <button
                            type="submit"
                            className={buttonStyle.activ}
                        >
                            Start Test
                            <span className={buttonStyle.icon}>
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={buttonStyle.inactiv}
                            disabled
                        >
                            Start Test
                            <span className={buttonStyle.icon}>
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </button>
                    )}
                </div>
                <div className={formStyle.container}>
                    <div className={formStyle.fullComponent}>
                        <h4 className={headerStyle.h4}>
                            Test Group
                        </h4>
                    </div>
                    <div className={formStyle.fullComponent}>
                        <TestGroupSelect
                            handleSelectValue={handleSelectValue}
                            groupID={testGroupID}
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <TestGroupDescription
                            testGroup={testGroup}
                            showTestGroupName={false}
                        />
                    </div>

                    <LineDivider />
                    <div className={formStyle.fullComponent}>
                        <h4 className={headerStyle.h4}>
                            Test Description
                        </h4>
                    </div>
                    <div className={formStyle.fullComponent}>
                        <DeviceSelect
                            handleSelectedValue={handleInitiatorValue}
                            lableName="Initiator"
                            uwbList={uwbList}
                            couldEmpty
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <DeviceSelect
                            handleSelectedValue={handleResponderValue}
                            lableName="Responder"
                            uwbList={uwbList}
                            couldEmpty
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <label
                            htmlFor="realTestDistance"
                            className={formStyle.label}
                        >
                            Measured test distance
                            <input
                                className={formStyle.input}
                                type="number"
                                id="realTestDistance"
                                label="Test reale distance"
                                min="0"
                                step="0.001"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                    <div className={formStyle.fullComponent}>
                        <AntennaDelaySelect
                            handleSelectedValue={handleInitatorDelay}
                            lableName="Initiator Delay"
                            id={initiatorDevice[0]}
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <AntennaDelaySelect
                            handleSelectedValue={handleResponderDelay}
                            lableName="Responder Delay"
                            id={responderDevice[0]}
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <label
                            htmlFor="testComment"
                            className={formStyle.label}
                        >
                            Test Comment
                            <textarea
                                className={formStyle.textArea}
                                id="testComment"
                                label="Test Comment"
                                rows={6}
                                maxLength="300"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
