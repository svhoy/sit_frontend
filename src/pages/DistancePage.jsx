import React from "react"
import DistancesTable from "../components/DistancesTable"

export default function DistancePage() {
    return (
        <>
            <h2 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-l md:text-xl lg:text-2xl">
                Distances
            </h2>
            <DistancesTable />
        </>
    )
}
