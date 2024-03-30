/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPlay } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../utils/useFetch"
import StyleContex from "../context/StyleContex"

export default function TestGroupsTable() {
    const { containerStyle, headerStyle, buttonStyle, tableStyle, pageMenuStyle } = useContext(StyleContex)
    const [testGroupList, setTestGroupList] = useState([])
    const [baseURL] = useState("/api/tests/groups")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    const [checkTest, setCheckTest] = useState(null)
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()
    let navigate = useNavigate()

    let getTestGroupList = async (url = baseURL) => {
        let { response, data } = await api(url)

        if (response.status === 200) {
            if (data.next) {
                let nextPage = data.next.match(rexPage)
                setNextURL(baseURL + nextPage)
            } else {
                setNextURL(null)
            }
            if (data.previous) {
                if (rexPage.test(data.previous)) {
                    let previousPage = data.previous.match(rexPage)
                    setPreviousURL(baseURL + previousPage)
                } else {
                    setPreviousURL(baseURL)
                }
            } else {
                setPreviousURL(null)
            }
            setTestGroupList(data.results)
        }
    }

    useEffect(() => {
        getTestGroupList()
    }, [])

    let deleteDistance = async (id) => {
        let { response } = await api(`/api/tests/groups/${id}/`, "DELETE")

        if (response.status === 204) {
            getTestGroupList()
        }
    }

    let nextPage = () => {
        getTestGroupList(nextURL)
    }

    let previousPage = () => {
        getTestGroupList(previousURL)
    }

    let startTest = () => {
        navigate(`/tests/new/${checkTest}`)
    }

    let toggleSelected = (id) => {
        return () => {
            if (checkTest === id) {
                setCheckTest(null)
            } else {
                setCheckTest(id)
            }
        }
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }
    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    Test Groups
                </h3>
                <div className={containerStyle.leftComponent}>
                    <Link to="/tests/groups/add">
                        <button
                            type="button"
                            className={buttonStyle.activ}
                        >
                            Add Test Group
                        </button>
                    </Link>
                </div>
                <div className={containerStyle.leftComponent} />
                {checkTest != null ? (
                    <button
                        type="button"
                        className={buttonStyle.activ}
                        onClick={startTest}
                    >
                        Start Test
                        <span className={buttonStyle.icon}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        className={buttonStyle.inactiv}
                        disabled
                    >
                        Start Test
                        <span className={buttonStyle.icon}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    </button>
                )}
            </div>
            <div className={containerStyle.right}>
                <div className={tableStyle.container}>
                    <div className={tableStyle.overflow}>
                        <table className={tableStyle.table}>
                            <thead className={tableStyle.head}>
                                <tr>
                                    <th
                                        aria-label="Checkbox"
                                        className={tableStyle.th}
                                    />
                                    <th className={tableStyle.th}>ID</th>
                                    <th className={tableStyle.th}>
                                        Test Name
                                    </th>
                                    <th className={tableStyle.th}>
                                        Test Typ
                                    </th>
                                    <th className={tableStyle.th}>
                                        Distanz
                                    </th>
                                    <th className={tableStyle.th}>
                                        Einheit
                                    </th>
                                    <th className={tableStyle.th}>
                                        Minimum Messungen
                                    </th>
                                    <th className={tableStyle.th}>
                                        Maximum Messungen
                                    </th>
                                    <th className={tableStyle.th}>
                                        Owner
                                    </th>
                                    <th
                                        aria-label="Buttons"
                                        className={tableStyle.th}
                                    />
                                </tr>
                            </thead>
                            <tbody>
                                {testGroupList &&
                                    testGroupList.map((item) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className={tableStyle.tr}
                                            >
                                                <td className={tableStyle.td}>
                                                    <input
                                                        type="checkbox"
                                                        id={item.id}
                                                        checked={checkTest === item.id}
                                                        onChange={toggleSelected(item.id)}
                                                    />
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.id}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_name}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_type}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_distance}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_unit}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_min_measurements}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.test_max_measurements}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    {item.user}
                                                </td>
                                                <td className={tableStyle.td}>
                                                    <button
                                                        type="button"
                                                        className="mx-2"
                                                        onClick={() => {
                                                            return handleDeleteClick(item.id)
                                                        }}
                                                        title="Löschen"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <div className={pageMenuStyle.container}>
                        {previousURL != null ? (
                            <button
                                type="button"
                                className={buttonStyle.activ}
                                onClick={previousPage}
                            >
                                Previous
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
                                disabled
                            >
                                Previous
                            </button>
                        )}
                        {nextURL != null ? (
                            <button
                                type="button"
                                className={buttonStyle.activ}
                                onClick={nextPage}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
                                disabled
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div >
        </div >
    )
}
