/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"

export default function TestGroupSelect({ handleSelectChange, groupID }) {
    let api = useFetch()

    const [testGroups, setTestGroups] = useState([])

    let getTestGroup = async () => {
        let { response, data } = await api("/api/tests/groups?size=10000")

        if (response.status === 200) {
            setTestGroups(data.results)
        }
    }

    useEffect(() => {
        getTestGroup()
    }, [])

    return (
        <label
            htmlFor="testGroup"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Test Group
            <div className="mt-1">
                <select
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="testGroup"
                    label="Test Group"
                    onChange={handleSelectChange}
                    value={groupID}
                    required
                >
                    {testGroups &&
                        testGroups.map((item) => {
                            return <option value={item.id}>{item.test_name}</option>
                        })}
                </select>
            </div>
        </label>
    )
}

TestGroupSelect.propTypes = {
    handleSelectChange: PropTypes.func.isRequired,
    groupID: PropTypes.number
}

TestGroupSelect.defaultProps = {
    groupID: null
}
