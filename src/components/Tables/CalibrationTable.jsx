/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import InfoModal from "../Modals/InfoModal"
import useFetch from "../../utils/useFetch"
import StyleContex from "../../context/StyleContex"

export default function CalibrationTable({ handleSelectID }) {
    const { tableStyle, buttonStyle, pageMenuStyle } = useContext(StyleContex)
    const [calibrationList, setCalibrationList] = useState([])
    const [checkCalibration, setCheckCalibration] = useState(0)
    const [baseURL] = useState("/api/calibration/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState("")
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()

    let getCalibrations = async (url = baseURL) => {
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
            setCalibrationList(data.results)
        }
    }

    useEffect(() => {
        getCalibrations()
    }, [])

    let deleteCalibration = async (caliID) => {
        let { response } = await api(`/api/calibration/${caliID}/`, "DELETE")

        if (response.status === 204) {
            getCalibrations()
        }
    }

    let nextPage = () => {
        getCalibrations(nextURL)
    }

    let previousPage = () => {
        getCalibrations(previousURL)
    }

    let toggleSelected = (id) => {
        return () => {
            if (checkCalibration === id) {
                setCheckCalibration(0)
                handleSelectID(0)
            } else {
                setCheckCalibration(id)
                handleSelectID(id)
            }
        }
    }

    let handleDeleteClick = (caliID) => {
        deleteCalibration(caliID)
    }

    return (
        <>
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
                                <th className={tableStyle.th}>Created</th>
                                <th className={tableStyle.th}>Calibration Type</th>
                                <th className={tableStyle.th}>
                                    Measurement Type
                                </th>
                                <th className={tableStyle.th}>
                                    iterations
                                </th>
                                <th
                                    aria-label="Button"
                                    className={tableStyle.th}
                                />
                            </tr>

                        </thead>
                        <tbody>
                            {calibrationList &&
                                calibrationList.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className={tableStyle.tr}
                                        >
                                            <td className={tableStyle.td}>
                                                <input
                                                    type="checkbox"
                                                    id={item.id}
                                                    checked={checkCalibration === item.id}
                                                    onChange={toggleSelected(item.id)}
                                                />
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.id}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.created}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.calibration_type}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.measurement_type}
                                            </td>
                                            <td className={tableStyle.td}>
                                                {item.iterations}
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


CalibrationTable.propTypes = {
    handleSelectID: PropTypes.func.isRequired,

}
