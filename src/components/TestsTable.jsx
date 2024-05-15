/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faTrashCan,
    faPlay,
    faCircleInfo,
    faObjectUngroup
} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../utils/useFetch"
import InfoModal from "./Modals/InfoModal"
import TestGroupDescription from "./Descriptions/TestGroupDescription"
import StyleContex from "../context/StyleContex"

export default function TestTable() {
    const { headerStyle, buttonStyle, tableStyle, pageMenuStyle, containerStyle } = useContext(StyleContex)
    const [testsList, setTestsList] = useState([])
    const [testGroupInfo, setTestGroupInfo] = useState(null)
    const [baseURL] = useState("/api/tests/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    const [checkTestGroup, setCheckTestGroup] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState("")
    let rexPage = /\?page=\d{1,}/
    let navigate = useNavigate()
    let api = useFetch()

    let getTestsList = async (url = baseURL) => {
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
            setTestsList(data.results)
        }
    }

    let getTestGroupInfo = async (groupID, url = baseURL) => {
        let { response, data } = await api(`${url}groups/${groupID}`)
        console.log(data)
        if (response.status === 200) {
            setTestGroupInfo(data)
        }
    }

    useEffect(() => {
        getTestsList()
    }, [])

    useEffect(() => {
        if (testGroupInfo !== null) {
            setShowModal(true)
            setModalTitle(`${testGroupInfo.test_name}`)
            setModalContent(
                <TestGroupDescription
                    testGroup={testGroupInfo}
                    showTestGroupName={false}
                />
            )
        }
    }, [testGroupInfo])

    let deleteDistance = async (id) => {
        let { response } = await api(`/api/tests/${id}/`, "DELETE")

        if (response.status === 204) {
            getTestsList()
        }
    }

    let nextPage = () => {
        getTestsList(nextURL)
    }

    let previousPage = () => {
        getTestsList(previousURL)
    }

    let startTest = () => {
        navigate(`new/${checkTestGroup}`)
    }

    let toggleSelected = (id) => {
        return () => {
            if (checkTestGroup === id) {
                setCheckTestGroup(0)
            } else {
                setCheckTestGroup(id)
            }
        }
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }

    let handleGroupDescriptonModal = (groupID) => {
        getTestGroupInfo(groupID)
    }

    return (
        <>
            <div className={containerStyle.component}>
                <div className={containerStyle.left}>
                    <h3 className={headerStyle.h3}>
                        Tests
                    </h3>
                    <div className={containerStyle.leftComponent}>
                        <button
                            type="button"
                            className={buttonStyle.activ}
                            onClick={startTest}
                        >
                            Start new Test
                            <span className={buttonStyle.icon}>
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </button>
                    </div>
                </div>
                <div className={containerStyle.right}>
                    <div className={tableStyle.container}>
                        <div className={tableStyle.overflow}>
                            <table className={tableStyle.table}>
                                <thead className={tableStyle.thead}>
                                    <tr>
                                        <th
                                            aria-label="Checkbox"
                                            className={tableStyle.th}
                                        />
                                        <th className={tableStyle.th}>
                                            ID
                                        </th>
                                        <th className={tableStyle.th}>
                                            Test Group
                                        </th>
                                        <th className={tableStyle.th}>
                                            Test Distance
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
                                    {testsList &&
                                        testsList.map((item) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className={tableStyle.tr}
                                                >
                                                    <td className={tableStyle.td}>
                                                        <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            checked={checkTestGroup === item.id}
                                                            onChange={toggleSelected(item.id)}
                                                        />
                                                    </td>
                                                    <td className={tableStyle.td}>
                                                        <Link to={`review/${item.id}`}>
                                                            {item.id}
                                                        </Link>
                                                    </td>
                                                    <td className={tableStyle.td}>
                                                        <Link to={`review/${item.id}`}>
                                                            {item.test_group_name}
                                                        </Link>
                                                    </td>
                                                    <td className={tableStyle.td}>
                                                        <Link to={`review/${item.id}`}>
                                                            {item.real_test_distance}
                                                        </Link>
                                                    </td>
                                                    <td className={tableStyle.td}>
                                                        <Link to={`review/${item.id}`}>
                                                            {item.user}
                                                        </Link>
                                                    </td>
                                                    <td className={tableStyle.td}>
                                                        {item.comments && (
                                                            <button
                                                                type="button"
                                                                className={tableStyle.editButton}
                                                                onClick={() => {
                                                                    setShowModal(true)
                                                                    setModalTitle(
                                                                        `${item.test_group_name} - ${item.id}`
                                                                    )
                                                                    setModalContent(item.comments)
                                                                }}
                                                                title="Comment"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faCircleInfo}
                                                                />
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className={tableStyle.editButton}
                                                            onClick={() => {
                                                                handleGroupDescriptonModal(
                                                                    item.test_group
                                                                )
                                                            }}
                                                            title="Test Group"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faObjectUngroup}
                                                            />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={tableStyle.editButton}
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
                </div>
            </div>
            <InfoModal
                onClose={() => {
                    return setShowModal(false)
                }}
                show={showModal}
                header={modalTitle}
                content={modalContent}
            />
        </>
    )
}
