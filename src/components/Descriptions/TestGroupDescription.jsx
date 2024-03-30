import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import StyleContex from "../../context/StyleContex"

export default function TestGroupDescription({ testGroup, showTestGroupName }) {
    const { descriptionStyle } = useContext(StyleContex)
    useEffect(() => {}, [testGroup])

    return (
        <div className={descriptionStyle.container}>
            <dl className={descriptionStyle.dl}>
                {showTestGroupName ? (
                    testGroup.test_name && (
                        <div className={descriptionStyle.infoConatinerFull}>
                            <dt className={descriptionStyle.dt}>Test Group</dt>
                            <dd className={descriptionStyle.dd}>
                                {testGroup.test_name}
                            </dd>
                        </div>
                    )
                ) : (
                    null
                )}
                <div className={descriptionStyle.infoConatinerFull}>
                    <dt className={descriptionStyle.dt}>Test Type</dt>
                    <dd className={descriptionStyle.dd}>
                        {testGroup.test_type}
                    </dd>
                </div>
                <div className={descriptionStyle.infoContainerFull}>
                    <dt className={descriptionStyle.dt}>Test Measurement Type</dt>
                    <dd className={descriptionStyle.dd}>
                        {testGroup.test_measurement_type}
                    </dd>
                </div>
                <div className={descriptionStyle.infoContainerHalf}>
                    <dt className={descriptionStyle.dt}>Test Distance</dt>
                    <dd className={descriptionStyle.dd}>
                        {testGroup.test_distance}
                    </dd>
                </div>
                <div className={descriptionStyle.infoContainerHalf}>
                    <dt className={descriptionStyle.dt}>Unit</dt>
                    <dd className={descriptionStyle.dd}>
                        {testGroup.test_unit}
                    </dd>
                </div>
                {
                    (testGroup.test_min_measurements || testGroup.test_max_measurements) && (
                        <>
                            <div className={descriptionStyle.infoContainerHalf}>
                                <dt className={descriptionStyle.dt}>Min. Measurements</dt>
                                <dd className={descriptionStyle.dd}>
                                    {testGroup.test_min_measurements}
                                </dd>
                            </div>
                            <div className={descriptionStyle.infoContainerHalf}>
                                <dt className={descriptionStyle.dt}>Max. Measurements</dt>
                                <dd className="mt-1 text-sm sm:col-span-4 sm:mt-0">
                                    {testGroup.test_max_measurements}
                                </dd>
                            </div>
                        </>
                    )
                }
            </dl>
        </div >
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
