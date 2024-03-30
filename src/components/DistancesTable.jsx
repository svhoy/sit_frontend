/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../utils/useFetch"
import StyleContex from "../context/StyleContex"

export default function DistancesTable() {
    const { containerStyle, tableStyle, headerStyle, pageMenuStyle, buttonStyle } = useContext(StyleContex)
    const [distanceMeasurementsList, setdistanceMeasurementsList] = useState([])
    const [baseURL] = useState("/api/measurement-list/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()

    let getDistanceMeasurements = async (url = baseURL) => {
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
            setdistanceMeasurementsList(data.results)
        }
    }

    useEffect(() => {
        getDistanceMeasurements()
    }, [])

    let deleteDistance = async (settingId) => {
        let { response } = await api(`/api/measurement-list/${settingId}/`, "DELETE")

        if (response.status === 204) {
            getDistanceMeasurements()
        }
    }

    let nextPage = () => {
        getDistanceMeasurements(nextURL)
    }

    let previousPage = () => {
        getDistanceMeasurements(previousURL)
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }

    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <div className={containerStyle.leftComponent}>
                    <h3 className={headerStyle.h3}>Distance Measurements</h3>
                </div>
            </div>
            <div className={containerStyle.right}>
                <div className={tableStyle.container}>
                    <div className={tableStyle.overflow}>
                        <table className={tableStyle.table}>
                            <thead className={tableStyle.head}>
                                <th className={tableStyle.th}>ID</th>
                                <th className={tableStyle.th}>Created</th>
                                <th className={tableStyle.th}>Distance</th>
                                <th
                                    aria-label="Button"
                                    className={tableStyle.th}
                                />
                            </thead>
                            <tbody>
                                {distanceMeasurementsList &&
                                    distanceMeasurementsList.map((item) => {
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
                                                    {item.distance}
                                                </td>
                                                <td className={tableStyle.td}>
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
                            >
                                Previous
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
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
    )
}
