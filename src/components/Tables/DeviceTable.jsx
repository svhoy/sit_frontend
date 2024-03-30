/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import InfoModal from "../Modals/InfoModal"
import useFetch from "../../utils/useFetch"
import StyleContex from "../../context/StyleContex"

export default function DeviceTable() {
    const { tableStyle, buttonStyle, pageMenuStyle } = useContext(StyleContex)
    const [deviceList, setDeviceList] = useState([])
    const [baseURL] = useState("/api/device/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState("")
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()

    let getDevices = async (url = baseURL) => {
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
            setDeviceList(data.results)
        }
    }

    useEffect(() => {
        getDevices()
    }, [])

    let deleteDistance = async (settingId) => {
        let { response } = await api(`/api/device/${settingId}/`, "DELETE")

        if (response.status === 204) {
            getDevices()
        }
    }

    let nextPage = () => {
        getDevices(nextURL)
    }

    let previousPage = () => {
        getDevices(previousURL)
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }

    return (
        <>
            <div className={tableStyle.container}>
                <div className={tableStyle.overflow}>
                    <table className={tableStyle.table}>
                        <thead className={tableStyle.head}>
                            <th className={tableStyle.th}>ID</th>
                            <th className={tableStyle.th}>Created</th>
                            <th className={tableStyle.th}>
                                Device Name
                            </th>
                            <th className={tableStyle.th}>
                                Device ID
                            </th>
                            <th
                                aria-label="Button"
                                className={tableStyle.th}
                            />
                        </thead>
                        <tbody>
                            {deviceList &&
                                deviceList.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className={tableStyle.tr}
                                        >
                                            <td className={tableStyle.td}>
                                                {item.id}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.created}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.device_name}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.device_id}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.comments && (
                                                    <button
                                                        type="button"
                                                        className={tableStyle.editButton}
                                                        onClick={() => {
                                                            setShowModal(true)
                                                            setModalTitle(
                                                                `${item.device_name} - ${item.device_id}`
                                                            )
                                                            setModalContent(item.comments)
                                                        }}
                                                        title="Comment"
                                                    >
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </button>
                                                )}
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
