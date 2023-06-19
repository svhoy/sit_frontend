/* eslint-disable operator-linebreak */
import React from "react"
import { Link } from "react-router-dom"
import DeviceTable from "./Tables/DeviceTable"

export default function DeviceOverview() {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Devices
                    </h3>
                    <div className="grid grid-cols-2 gap-0">
                        <Link to="/devices/ble/add">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            >
                                Add Device
                            </button>
                        </Link>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-0" />

                    <div className="grid grid-cols-2 gap-0" />
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0 md:w-full">
                <DeviceTable />
            </div>
        </div>
    )
}
