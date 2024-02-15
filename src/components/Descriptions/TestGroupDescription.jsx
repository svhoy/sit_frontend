import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function TestGroupDescription({ testGroup, showTestGroupName }) {
    useEffect(() => {}, [testGroup])

    return (
        <div>
            <dl>
                {showTestGroupName ? (
                    testGroup.test_name && (
                        <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                            <div className="bg-white py-5 sm:col-span-4 ">
                                <dt className="text-sm font-medium text-gray-500">Test Group</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                    {testGroup.test_name}
                                </dd>
                            </div>
                        </div>
                    )
                ) : (
                    <div />
                )}
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white py-5 sm:col-span-4 ">
                        <dt className="text-sm font-medium text-gray-500">Test Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testGroup.test_type}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white py-5 sm:col-span-4 ">
                        <dt className="text-sm font-medium text-gray-500">Test Measurement Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testGroup.test_measurement_type}
                        </dd>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                    <div className="bg-white py-5 sm:col-span-3 ">
                        <dt className="text-sm font-medium text-gray-500">Test Distance</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testGroup.test_distance}
                        </dd>
                    </div>
                    <div className="bg-white py-5 sm:col-span-1 ">
                        <dt className="text-sm font-medium text-gray-500">Unit</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                            {testGroup.test_unit}
                        </dd>
                    </div>
                </div>
                {(testGroup.test_min_measurements || testGroup.test_max_measurements) && (
                    <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                        <div className="bg-white py-5 sm:col-span-2 ">
                            <dt className="text-sm font-medium text-gray-500">Min. Measurements</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                                {testGroup.test_min_measurements}
                            </dd>
                        </div>
                        <div className="bg-white py-5 sm:col-span-2 ">
                            <dt className="text-sm font-medium text-gray-500">Max. Measurements</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
                                {testGroup.test_max_measurements}
                            </dd>
                        </div>
                    </div>
                )}
            </dl>
        </div>
    )
}

TestGroupDescription.propTypes = {
    testGroup: PropTypes.shape({
        id: PropTypes.number,
        test_name: PropTypes.string,
        test_type: PropTypes.string,
        test_distance: PropTypes.number,
        test_unit: PropTypes.string,
        test_measurement_type: PropTypes.string,
        test_min_measurements: PropTypes.number,
        test_max_measurements: PropTypes.number
    }).isRequired,
    showTestGroupName: PropTypes.bool
}

TestGroupDescription.defaultProps = {
    showTestGroupName: true
}
