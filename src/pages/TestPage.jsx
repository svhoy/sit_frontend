import React, { useState } from "react"
import TestSettingsAddForm from "../components/TestSettingsAddForm"
import DistanceTestsSettingsTable from "../components/DistanceTestsSettingsTable"

export default function TestPage() {
    const [testState, setTestState] = useState(null)

    let handleTestState = (state) => {
        setTestState(state)
    }

    if (testState === null) {
        return (
            <>
                <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
                    Distanz Tests
                </h2>
                <div>
                    <DistanceTestsSettingsTable handleTestState={handleTestState} />
                </div>
            </>
        )
    }

    if (testState === "add") {
        return (
            <>
                <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
                    Distanz Tests
                </h2>
                <div className="my-5">
                    <TestSettingsAddForm handleTestState={handleTestState} />
                </div>
            </>
        )
    }

    return (
        <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
            Distanz Tests
        </h2>
    )
}
