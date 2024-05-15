import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../../utils/useFetch"

export default function AddBleDeviceForm() {
    const [addDeviceForm, setAddDeviceForm] = useState({
        deviceName: "",
        deviceId: "",
        deviceComment: ""
    })

    useEffect(() => {}, [])

    const api = useFetch()
    const navigate = useNavigate()

    let sendDeviceAdd = async (addForm) => {
        let { response } = await api("/api/device/", "POST", JSON.stringify(addForm))
        console.log("Test:", response.status)
        if (response.status === 201) {
            navigate("/devices/", { replace: true })
        }
    }

    let goBack = () => {
        navigate(-1)
    }

    let handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("id")
        let fieldValue = null
        if (event.target.value !== "") {
            fieldValue = event.target.value
        }
        const newFormData = { ...addDeviceForm }
        newFormData[fieldName] = fieldValue

        setAddDeviceForm(newFormData)
    }

    let handleAddFormSubmit = (event) => {
        event.preventDefault()

        let addForm = {
            device_name: addDeviceForm.deviceName,
            device_id: addDeviceForm.deviceId,
            comments: addDeviceForm.deviceComment
        }
        sendDeviceAdd(addForm)
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Add Bluetooth Device
                    </h3>
                    <div className="grid grid-cols-2 gap-0">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            onClick={goBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <form
                className="mt-5 md:col-span-2 md:mt-0 md:w-full"
                onSubmit={handleAddFormSubmit}
            >
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="bg-gray-50 dark:bg-neutral-700 px-1 py-3 text-right sm:px-3">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            >
                                Add Device
                            </button>
                        </div>
                        <div className="mt-2 mb-4 px-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="deviceName"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Device Name
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 dark:text-neutral-300 dark:bg-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            type="text"
                                            id="deviceName"
                                            label="Device Name"
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="col-span-6">
                                <label
                                    htmlFor="deviceId"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Device ID
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 dark:text-neutral-300 dark:bg-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            type="text"
                                            id="deviceId"
                                            label="Device ID"
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="deviceComment"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Comment
                                    <div className="mt-1">
                                        <textarea
                                            className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-700 dark:text-neutral-300 dark:bg-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="deviceComment"
                                            label="Device Comment"
                                            rows={6}
                                            maxLength="300"
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
