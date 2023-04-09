/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../utils/useFetch"
import Modal from "./Modals/ComponentModal"

export default function TestTable() {
    const [testsList, setTestsList] = useState([])
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

    useEffect(() => {
        getTestsList()
    }, [])

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

    return (
        <>
            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="lg:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                            Tests
                        </h3>
                        <div className="grid grid-cols-2 gap-0" />
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            onClick={startTest}
                        >
                            Start new Test
                            <span className="ml-2">
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </button>
                        <div className="grid grid-cols-2 gap-0" />
                    </div>
                </div>
                <div className="mt-5 lg:col-span-2 lg:mt-0 lg:w-full">
                    <div className="shadow min-w-full sm:overflow-x-auto sm:rounded-md">
                        <div className="overflow-x-auto">
                            <table className="table-auto overflow-scroll min-w-full ">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th
                                            aria-label="Checkbox"
                                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                                        />
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            ID
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Test Group
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Test Distance
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Owner
                                        </th>
                                        <th
                                            aria-label="Buttons"
                                            className="text-sm font-medium text-gray-900 px-1 py-4 text-left"
                                        />
                                    </tr>
                                </thead>
                                <tbody>
                                    {testsList &&
                                        testsList.map((item) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="bg-white border-b odd:bg-gray-100"
                                                >
                                                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                        <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            checked={checkTestGroup === item.id}
                                                            onChange={toggleSelected(item.id)}
                                                        />
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`review/${item.id}`}>
                                                            {item.id}
                                                        </Link>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`review/${item.id}`}>
                                                            {item.test_group_name}
                                                        </Link>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`review/${item.id}`}>
                                                            {item.real_test_distance}
                                                        </Link>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={`review/${item.id}`}>
                                                            {item.user}
                                                        </Link>
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-1 py-4 whitespace-nowrap">
                                                        {item.comments && (
                                                            <button
                                                                type="button"
                                                                className="mx-2"
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
                        <div className="mt-5 md:col-span-2 md:mt-1">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="bg-gray-50 px-1 py-3 text-left sm:px-3">
                                    {previousURL != null ? (
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                            onClick={previousPage}
                                        >
                                            Previous
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                            disabled
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {nextURL != null ? (
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                            onClick={nextPage}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                            disabled
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
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
