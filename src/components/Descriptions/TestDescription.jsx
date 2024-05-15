import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import StyleContex from "../../context/StyleContex"

export default function TestDescription({ testData }) {
    const { descriptionStyle } = useContext(StyleContex)
    useEffect(() => {}, [testData])

    return (
        <div>
            <dl>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Test ID</dt>
                        <dd className="mt-1 text-sm  sm:mt-0">{testData.id}</dd>
                    </div>
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Created</dt>
                        <dd className="mt-1 text-sm  sm:mt-0">{testData.created}</dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className=" px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Username</dt>
                        <dd className="mt-1 text-sm  sm:mt-0">{testData.user}</dd>
                    </div>
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Test Distance</dt>
                        <dd className="mt-1 text-sm  sm:mt-0">
                            {testData.real_test_distance}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Initiator Device</dt>
                        <dd className="mt-1 text-sm sm:mt-0">
                            {testData.initiator_device_name}
                        </dd>
                    </div>
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Responder Device</dt>
                        <dd className="mt-1 text-sm sm:mt-0">
                            {testData.responder_device_name}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="px-4 py-5 sm:col-span-4 sm:px-6">
                        <dt className="text-sm font-medium">Kommentar</dt>
                        <dd className="mt-1 text-sm sm:mt-0">{testData.comments}</dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="px-4 py-5 sm:col-span-2 sm:px-6">
                        <dt className="text-sm font-medium">Test Gruppe</dt>
                        <dd className="mt-1 text-sm sm:col-span-4 sm:mt-0">
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
