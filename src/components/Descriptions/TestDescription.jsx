import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function TestDescription({ testData }) {
    useEffect(() => {}, [testData])

    return (
        <div>
            <dl>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Test ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{testData.id}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{testData.created}</dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{testData.user}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Test Distance</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testData.real_test_distance}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Initiator Device</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testData.initiator_device_name}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Responder Device</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testData.responder_device_name}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white px-4 py-5 sm:col-span-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Kommentar</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{testData.comments}</dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Test Gruppe</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                            {testData.test_group_name}
                        </dd>
                    </div>
                </div>
            </dl>
        </div>
    )
}

TestDescription.propTypes = {
    testData: PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.string,
        created: PropTypes.string,
        real_test_distance: PropTypes.number,
        initiator_device_name: PropTypes.string,
        responder_device_name: PropTypes.string,
        comments: PropTypes.string,
        test_group: PropTypes.number,
        test_group_name: PropTypes.string
    }).isRequired
}
