/* eslint-disable operator-linebreak */
import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"
import StyleContex from "../../context/StyleContex"

export default function TestGroupSelect({ handleSelectValue, groupID }) {
    let api = useFetch()
    const { formStyle } = useContext(StyleContex)
    const [testGroups, setTestGroups] = useState([])
    const [id, setId] = useState(0)
    let getTestGroup = async () => {
        let { response, data } = await api("/api/tests/groups?size=10000")

        if (response.status === 200) {
            setTestGroups(data.results)
        }
    }

    let handleSelectChange = (event) => {
        event.preventDefault()
        let selecedGroupID = parseInt(event.target.value, 10)
        if (selecedGroupID !== 0) {
            handleSelectValue(selecedGroupID)
        }
    }

    useEffect(() => {
        getTestGroup()
        setId(groupID)
        console.log(groupID)
    }, [groupID])

    useEffect(() => {}, [id])

    return (
        <label
            htmlFor="testGroup"
            className={formStyle.label}
        >
            <select
                className={formStyle.select}
                id="testGroup"
                label="Test Group"
                onChange={handleSelectChange}
                value={id}
                required
            >
                {testGroups &&
                    testGroups.map((item) => {
                        return (
                            <option
                                value={item.id}
                                key={item.id}
                            >
                                {item.test_name}
                            </option>
                        )
                    })}
            </select>
        </label>
    )
}

TestGroupSelect.propTypes = {
    handleSelectValue: PropTypes.func.isRequired,
    groupID: PropTypes.number
}

TestGroupSelect.defaultProps = {
    groupID: 0
}
