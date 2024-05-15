import React, { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../utils/useFetch"
import AuthContext from "../context/AuthContext"
import StaticSelect from "./Selects/StaticSelect"
import StyleContex from "../context/StyleContex"

export default function TestGroupAddForm() {
    const { user } = useContext(AuthContext)
    const { containerStyle, headerStyle, buttonStyle, formStyle } = useContext(StyleContex)
    const [addTestGroupForm, setAddTestGroupForm] = useState({
        owner: 0,
        testName: "",
        testType: "Static Distance",
        testMeasurementType: "",
        testDistance: null,
        testUnit: null,
        testMinMeasurements: null,
        testMaxMeasurements: null
    })
    const [measurementTypeOptions] = useState([
        ["SS-TWR", "ss_twr"],
        ["DS-TWR", "ds_3_twr"]
    ])
    let api = useFetch()
    const navigate = useNavigate()

    useEffect(() => {}, [])

    let handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("id")
        let fieldValue = null
        if (event.target.value !== "") {
            fieldValue = event.target.value
        }
        const newFormData = { ...addTestGroupForm }
        newFormData[fieldName] = fieldValue

        setAddTestGroupForm(newFormData)
    }
    let handleMeasurementTypeChange = (value) => {
        const newFormData = { ...addTestGroupForm }
        newFormData.testMeasurementType = value

        setAddTestGroupForm(newFormData)
    }

    let handleTestTypeChange = (value) => {
        const newFormData = { ...addTestGroupForm }
        newFormData.testType = value
        setAddTestGroupForm(newFormData)
    }

    let sendTestAdd = async (addForm) => {
        let { response } = await api("/api/tests/groups", "POST", JSON.stringify(addForm))
        console.log("Test:", response.status)
        if (response.status === 201) {
            navigate("/tests/groups", { replace: true })
        }
    }

    let handleAddFormSubmit = (event) => {
        event.preventDefault()

        let addForm = {
            owner: user.user_id,
            test_name: addTestGroupForm.testName,
            test_type: addTestGroupForm.testType,
            test_distance: addTestGroupForm.testDistance,
            test_unit: "m",
            test_measurement_type: addTestGroupForm.testMeasurementType,
            test_min_measurements: addTestGroupForm.testMinMeasurements,
            test_max_measurements: addTestGroupForm.testMaxMeasurements
        }
        sendTestAdd(addForm)
    }

    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Add Test Group
                </h3>
                <Link
                    to="/tests/groups"
                    replace
                >
                    <button
                        type="button"
                        className={buttonStyle.activ}
                    >
                        Back
                    </button>
                </Link>
            </div>
            <form
                className={formStyle.form}
                onSubmit={handleAddFormSubmit}
            >
                <div className={formStyle.header}>
                    <button
                        type="submit"
                        className={buttonStyle.activ}
                    >
                        Add
                    </button>
                </div>
                <div className={formStyle.container}>
                    <div className={formStyle.fullComponent}>
                        <label
                            htmlFor="testName"
                            className={formStyle.label}
                        >
                            Test Group Name
                            <input
                                className={formStyle.input}
                                type="text"
                                id="testName"
                                label="Test Name"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                    <div className={formStyle.fullComponent}>
                        <StaticSelect
                            label="Measurement Type"
                            handleSelectedValue={handleMeasurementTypeChange}
                            options={measurementTypeOptions}
                        />
                    </div>
                    <div className={formStyle.fullComponent}>
                        <StaticSelect
                            label="Test Type"
                            handleSelectedValue={handleTestTypeChange}
                            options={["Static Distance"]}
                        />
                    </div>
                    <div className="col-span-5">
                        <label
                            htmlFor="testDistance"
                            className={formStyle.label}
                        >
                            Real Distance
                            <input
                                className={formStyle.input}
                                type="number"
                                id="testDistance"
                                label="Test reale distance"
                                min="0"
                                step="0.001"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label
                            htmlFor="testUnit"
                            className={formStyle.label}
                        >
                            Unit
                            <input
                                className={formStyle.input}
                                type="text"
                                id="testUnit"
                                label="Test Einheit"
                                value="m"
                                onChange={handleEditFormChange}
                                readOnly
                            />
                        </label>
                    </div>
                    <div className={formStyle.fullSMhalf}>
                        <label
                            htmlFor="testMinMeasurements"
                            className={formStyle.label}
                        >
                            Min. Measurements
                            <input
                                className={formStyle.input}
                                type="number"
                                id="testMinMeasurements"
                                label="Test Measurements"
                                min="0"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                    <div className={formStyle.fullSMhalf}>
                        <label
                            htmlFor="testMaxMeasurements"
                            className={formStyle.label}
                        >
                            Max Measurements
                            <input
                                className={formStyle.input}
                                type="number"
                                id="testMaxMeasurements"
                                label="Test Max Measurements"
                                min="0"
                                onChange={handleEditFormChange}
                            />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
